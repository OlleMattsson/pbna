/*

1. Listen for event
2. Fetch OCR data through GQL (or receive as event param)
3. Run inference
4. Write results back to Attachment.inferredData through the GQL API
*/

import {fileURLToPath} from "url";
import path from "path";
import {LlamaModel, LlamaContext, LlamaChatSession, EmptyChatPromptWrapper, LlamaChatPromptWrapper, LlamaGrammar} from "node-llama-cpp";

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


const ocrData = 
`<I] talossa. LASKU sivu 1
o vuona TI x\"
Laskun numero 3033 Maksuviite 30339
Laskun päiväys 27.09.2023 Huomautusaika 7 päivää
12111 Eräpäivä 11.10.2023 Maksuehto 14 päivää
Mattssoft Ab Viivästyskorko —10.5%
Humalniementie 13 K
00840 Helsinki Toimitusaika = -30.9.2023
Tilaaja Mattsson Olle
Viitteemme Torvinen Timo
Viitteenne
Sopimusnumero
1635 / Mattssoft Ab / LVI suunnittelu / LVI-suunnittelu tuntiveloitus
Nimike Määrä Hinta Alv Yhteensä
LVI-suunnittelu tuntiveloitus / LVI-suunnittelu 9h 89.00 24 % 801.00
Arvonlisävero 24 % 192.24
Huomioithan muuttuneen tilinumeron. Uusi tilinumeromme on FIS1 1555 3000 1298 91
Veroton yhteensä 801.00 EUR
Alv Yhteensä 192.24 EUR
Yhteensä 993.24 EUR
Suomen Talokeskus Oy Puhelin Y-tunnus — 2581730-8 Maksutiedot
Mannerheimintie 113 029 193 1900 VAT F125817308 FI51 1555 3000 1298 91
00280 Helsinki laskutusGtalokeskus.fi Kotipaikka — Helsinki NDEAFIHH
`


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
