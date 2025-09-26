import { testAgent } from "./agents/testAgent";
import { runOcrTesseract } from "./agents/tesseractAgent";
import { runLllamaAgent } from "./agents/llamaAgent";
import { runOpenAIAgent } from "./agents/openAIAgent";
import { getAttachmentFromId } from "./agents/getAttachmentFromId";
import { runInvoiceTypeClassifier } from "./agents/invoiceTypeClassifier";
import { setInvoiceStatus } from "./agents/setInvoiceStatus";
import { runInvoiceDataExtractor } from "./agents/invoiceDataExtractor";
import { openAiInvoiceToEntries } from "./agents/openAiInvoiceToEntries";
import { createInvoice } from "./agents/createInvoice";
import { createInvoiceVerification } from "./agents/createInvoiceVerification";
import { retrieveAgentOutput } from "./agents/retrieveAgentOutput";
import { createEntry } from "./agents/createEntry";

export async function runAgent({ ...args }) {
  const { agent } = args;

  switch (agent.type) {
    case "tool":
      return runToolAgent(args);

    case "llm":
      return runLlmAgent(args);

    default:
      throw new Error(`Unsupported agent type: ${agent.type}`);
  }
}

async function runToolAgent({ ...args }) {
  const { agent, input, context, agentOutputId } = args;

  switch (agent.functionName) {
    case "ocrTesseract":
      return runOcrTesseract(agent, input, context, agentOutputId);
    case "testAgent":
      return testAgent(agent, input, context, agentOutputId);
    case "invoiceAgent":
      return testAgent(agent, input, context, agentOutputId);
    case "getAttachmentFromId":
      return getAttachmentFromId(agent, input, context, agentOutputId);
    case "setInvoiceStatus":
      return setInvoiceStatus(args);
    case "createInvoice":
      return createInvoice(args);
    case "createInvoiceVerification":
      return createInvoiceVerification(args);
    case "retrieveAgentOutput":
      return retrieveAgentOutput(args);
    case "createEntry":
      createEntry(args);

    default:
      throw new Error(`Unknown tool agent function: ${agent}`);
  }
}

async function runLlmAgent({ ...args }) {
  const { agent, input, context, agentOutputId } = args;

  switch (agent.functionName) {
    case "llamaAgent":
      return runLllamaAgent(agent, input, context, agentOutputId);
    case "openAIAgent":
      return runOpenAIAgent(agent, input, context, agentOutputId);
    case "openAIClassifyInvoice":
      return runInvoiceTypeClassifier(args);
    case "openAIExtractInvoiceFields":
      return runInvoiceDataExtractor(args);
    case "openAiInvoice2Entries":
      return openAiInvoiceToEntries(args);
    default:
      throw new Error(`Unknown llm agent function: ${agent.function}`);
  }
}

// write a trigger
