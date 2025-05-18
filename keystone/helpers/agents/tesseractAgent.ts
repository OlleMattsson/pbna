/*

## Input Schema

{
  "type": "object",
  "required": [
    "imagePath",
    "language"
  ],
  "properties": {
    "language": {
      "enum": [
        "eng",
        "fin",
        "sve"
      ],
      "type": "string"
    },
    "imagePath": {
      "type": "string"
    }
  }
}

## Output Schema

{
  "type": "object",
  "required": [
    "tesseract"
  ],
  "properties": {
    "tesseract": {
      "type": "object"
    }
  }
}

*/

import { Message } from 'redis-smq';
import {config, queueNames} from "../../common/redis-smq-config"
import { smqRun } from '../smq'
import {waitForAgentResult} from '../waitForAgentResult'
import {validateAndStoreErrors} from '../validateAndStoreErrors'


export async function runOcrTesseract(agent, input, context, agentOutputId) {
    try {
        await validateAndStoreErrors({
            type: "input", 
            agent, 
            value: input, 
            context, 
            agentOutputId, 
            errorPrefix: "[ocrTesseract] input schema validation failed"
        })
        
        const result = await tesseractResult(agent, input)
        
        const output = {tesseract: result}

        await validateAndStoreErrors({
            type: "output", 
            agent, 
            value: output, 
            context, 
            agentOutputId, 
            errorPrefix: "[ocrTesseract] output schema validation failed"
        })

        await onSuccess(context, agentOutputId, output)

    } catch (err) {
        console.log(err)
    }
}

const onSuccess = async (context, agentOutputId, output) => 
    context.db.AgentOutput.updateOne({
        where: {id: agentOutputId},
        data: {
            output,
            status: 'completed',
        }
    });

 const tesseractResult = async (agent, input): Promise<any> => {

    const {language, imagePath} = input

    const resultPromise = waitForAgentResult(agent.id)
        
    // tesseract ocr
    const ocrmsg = new Message();
    ocrmsg
        .setBody({
            imagePath: imagePath,
            language,
            agentId: agent.id
        })
        .setTTL(1000 * 60) // in millis
        .setQueue(queueNames.tesseract); 
    
    // send message
    smqRun(ocrmsg, config)

    return await resultPromise
 }   