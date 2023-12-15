import http from "http"
import express from "express"
import {Server as ioServer} from "socket.io"
import { Message } from 'redis-smq';
import {config as smqConfig, queueNames} from "../common/redis-smq-config.js"
import { sendMessage } from '../common/smqSendMessage.js';
import cors from 'cors'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core/core.cjs';
import { HttpLink } from "@apollo/client/link/http/http.cjs";
import { ApolloLink } from "@apollo/client/link/core/ApolloLink.js"
import util from 'util'
import { keystoneAuth, authenticatedClient } from "./keystoneAuth.js";
import { config } from 'dotenv';

config({ path: './common/.env' });



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

httpApi.post('/createprofile', async (req, res) => {
  const {email, password, invitationToken} = req.body
  const client = authenticatedClient(await keystoneAuth())

  try {
    const response = await client.query({
      query: gql`
        query Query($where: UserWhereUniqueInput!) {
          user(where: $where) {
            invitationToken
          }
        }
      `,
      variables: {
        where: {
          email
        }
      }
    })

    const invitationTokenChallange = response.data.user.invitationToken

    if (invitationToken === invitationTokenChallange) {
      client.mutate({
        mutation: gql`
          mutation Mutation($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
            updateUser(where: $where, data: $data) {
              id
            }
          }        
        `,
        variables: {
          where: {
            email
          },
          data: {
            password,
            // reset the invitation token so that password can only be set once
            invitationToken: "null" 
          }
        }
      }).then(r => {
        res.status(200).send({message: "password set"})
      }).catch(e => {
        console.log(e)
      })

    } else {
      console.log("token fail")
      res.status(401).send({message: 'invitation token mismatch'})
    }

  } catch(e) {
    res.status(404).send({message: "user does not exist"})
  }




  // 2. set the password in keystone
  // 3. send a welcome email to the new user


  //



})


/**
 * Define socket events
 */

socket.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});



