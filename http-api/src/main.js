import http from "http"
import express from "express"
import {Server as ioServer} from "socket.io"
import { Message } from 'redis-smq';
import {config as smqConfig, queueNames} from "../common/redis-smq-config.js"
import { sendMessage } from '../common/smqSendMessage.js';
import cors from 'cors'

/**
 * Start server
 */

const port = process.env.PORT || 8181

const httpApi = express();

const server = http.createServer(httpApi);

const socket = new ioServer(server);

httpApi.use(express.json());
httpApi.use(cors());

server.listen(port, () => {
    console.log(`http-api listening on :${port}`);
});

/**
 * Define http endpoints
 */

 httpApi.get('/', (req, res) => {
    res.send("ok")
});

httpApi.post('/verifyemail', (req, res) => {

  console.log(req.body)

  const { emailAddress } = req.body;


  // create a message for redis SMQ
  const message = new Message();
  message
    .setBody({emailAddress})
    .setTTL(3600000) // in millis
    .setQueue(queueNames.emailverifyer);

  sendMessage(message, smqConfig)
  
  res.send("ok")
});

/**
 * Define socket events
 */

socket.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});



