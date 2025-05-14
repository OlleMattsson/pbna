import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core/core.cjs';
import { Consumer, QueueManager, Message } from 'redis-smq';
import { sendMessage } from '../common/smqSendMessage.js';
import {config, queueNames} from "../common/redis-smq-config.js"
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';


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
      emailAddress 
    })
    
    
    cb(); // acknowledging the message
};

consumer.consume(queueNames.emailverifyer, messageHandler, (err) => {
  if (err) console.error(err);
});


/**
 * GraphQL
 */


const gqlApi = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://keystone:3000/api/graphql'
})



/**
 * SES
 */
async function sendMail({emailAddress}) {

  const invitationToken = uuidv4()
  const verificationUrl = `http://localhost:5173/createprofile?email=${emailAddress}&invitationToken=${invitationToken}`

    .mutate({
    mutation: gql`
      mutation Mutation($data: UserCreateInput!) {
        createUser(data: $data) {
          id
        }
      }    
    `,
    variables: {
      data: {
        email: emailAddress,
        invitationToken
      }
    }
  })

  const ses = new SESClient();
  const input = {
    Source: "signup@mattssoft.com",
    Destination: {
      ToAddresses: emailAddress
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
          Data: `<a href="${verificationUrl}>Please click here to continue the signup process.</a>. This invitaiton expires in 24 hours.`,
          Charset: "UTF-8",
        },
      },
    },
    ReplyToAddresses: [
      "noreply@mattssoft.com",
    ]
  };
  const command = new SendEmailCommand(input);
  const response = await ses.send(command);
  console.log(response)
}
