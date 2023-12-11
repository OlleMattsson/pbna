import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core/core.cjs';
import { Consumer, QueueManager, Message } from 'redis-smq';
import { sendMessage } from '../common/smqSendMessage.js';
import {config, queueNames} from "../common/redis-smq-config.js"
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import
import AWS from 'aws-sdk'

console.log(process.env.AWS_ACCESS_KEY_ID)
console.log(process.env.AWS_SECRET_ACCESS_KEY)
console.log(process.env.AWS_PROFILE)

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack); // credentials not loaded
  else console.log("Access Key:", AWS.config.credentials.accessKeyId);
})


/**
 * REDIS
*/

QueueManager.createInstance(config, (err, queueManager) => {
  if (err) console.log(err);
  else queueManager.queue.create(queueNames.emailverifyer, false, (err) => console.log(err));
})

const consumer = new Consumer(config);

consumer.run((err, status) => {
  if (err) console.error(err);
  if (status) console.log(`${queueNames.emailverifyer} queue ready`);
});

const messageHandler = async (msg, cb) => {
    const msgBody = msg.getBody();
    const {emailAddress} = msgBody;
    

    
    await sendMail({ 
      ToAddresses: [emailAddress] 
    })
    
    
    cb(); // acknowledging the message
};

consumer.consume(queueNames.emailverifyer, messageHandler, (err) => {
  if (err) console.error(err);
});


/**
 * GraphQL
 */

/*
const gqlApi = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://keystone:3000/api/graphql'
})
*/


/**
 * SES
 */
async function sendMail({ToAddresses}) {

  // TODO: create unique token and store it in graphql for later

  const client = new SESClient();
  const input = {
    Source: "signup@mattssoft.com",
    Destination: {
      ToAddresses
    },
    Message: { 
      Subject: { 
        Data: "Begin PBNA Signup", 
        Charset: "UTF-8",
      },
      Body: { 
        Text: {
          Data: "Plain Text Data",
          Charset: "UTF-8",
        },
        Html: {
          Data: '<a href="www.ollemattsson.com">Please click here to continue the signup process.</a>',
          Charset: "UTF-8",
        },
      },
    },
    ReplyToAddresses: [
      "noreply@mattssoft.com",
    ]
  };
  const command = new SendEmailCommand(input);
  const response = await client.send(command);
  console.log(response)
}
