/*

1. Listen for event
2. Fetch OCR data through GQL (or receive as event param)
3. Run inference
4. Write results back to Attachment.inferredData through the GQL API
*/

import {fileURLToPath} from "url";
import path from "path";
import {LlamaModel, LlamaContext, LlamaChatSession, EmptyChatPromptWrapper, LlamaChatPromptWrapper, LlamaGrammar} from "node-llama-cpp";
import { Consumer } from 'redis-smq';
import {config} from "./common/redis-smq-config.js"
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core/core.cjs';


/**
 * REDIS
 */

const queueName = "llama-data-extraction"

const consumer = new Consumer(config);

const messageHandler = async (msg, cb) => {
    console.log(msg)
    const payload = msg.getBody();
    await runDataExtraction(payload)
    cb(); // acknowledging the message
};


consumer.consume(queueName, messageHandler, (err) => {
    if (err) console.error(err);
});

consumer.run((err, status) => {
    if (err) console.error(err);
    if (status) console.log(`${queueName} service at your service`);
});


/**
 * GraphQL
 */

const gqlApi = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/api/graphql'
})

const UPDATE_EXTRACTED_DATA = gql`
mutation Mutation($where: AttachmentWhereUniqueInput!, $data: AttachmentUpdateInput!) {
    updateAttachment(where: $where, data: $data) {
      inferredData
      id
    }
  }
`;

async function runDataExtraction(_data) {

    const {ocrData, attachmentId} = _data

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const model = new LlamaModel({
        modelPath: path.join(__dirname, "models", "llama-2-13b.Q5_K_M.gguf"),
        useMlock: true
    });
    const context = new LlamaContext({
        model,
        batchSize: 1024,
        contextSize: 1024,
        threads: 6    
    });
    const session = new LlamaChatSession({
        context,
        promptWrapper: new LlamaChatPromptWrapper()
        //systemPrompt: "Below is an instruction that describes a task. Write a response that appropriately completes the request."
    });
    
    const grammar = await LlamaGrammar.getFor("json");
    
    const task = 
    `Extract the date, description (max 20 words), total amount, amount without vat and the vat of the following transaction. Data is in Finnish. Your response must be in JSON format. Transaction data:`  
    
    const prompt = `${task} ${ocrData}`
    
    console.log(prompt);
    
    const startTime = new Date();
    
    
    const a1 = await session.prompt(prompt, {
        maxTokens: 200,
        temperature: 0.5,
        topK: 20,
        topP: 0.9,
        repeatPenalty: 1.15,
        grammar
    });
    



    const endTime = new Date();
    const executionTime = endTime - startTime; // Time in milliseconds
    
    console.log(`\n\n### response ### \n\n`);
    
    console.log(a1);
    
    console.log(`inference time: ${executionTime / 1000} seconds`);

    const variables = {
        where: {
          id: attachmentId
        },
        data: {
          inferredData: a1
        }
      }

    gqlApi.mutate({
        mutation: UPDATE_EXTRACTED_DATA,
        variables
      }).then(response => {
        console.log('Mutation response:', response);
      }).catch(error => {
        console.error('Error executing mutation:', error);
      });
    
}