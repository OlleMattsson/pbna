import { runAgent } from "./agent";
import { KeystoneContext } from "@keystone-6/core/types";

/*
    Start an orchestrator by running the first step
*/
export async function runOrchestrator({
  contextMap,
  context,
  orchestratorId,
}: {
  orchestratorId: string;
  contextMap: object;
  context: KeystoneContext;
}) {
  const orchestrator = await context.query.Orchestrator.findOne({
    where: { id: orchestratorId },
    query: `
          id
          steps {
            id
            order
            inputMapping
            storeOutputAs
          }
        `,
  });

  if (!orchestrator) {
    console.error(`WARNING: Orchestrator ${orchestratorId} not found`);
    return;
  }

  if (orchestrator.steps.length === 0) {
    console.error(`WARNING: Orchestrator ${orchestratorId} has no steps`);
    return;
  }

  const sortedSteps = orchestrator.steps.sort((a, b) => a.order - b.order);
  const firstStep = sortedSteps[0];

  console.log(`🔥 Starting orchestrator ${orchestrator.id}`);

  await runOrchestrationStep(firstStep.id, contextMap, context);
}

/*
    Run a step
*/
export async function runOrchestrationStep(
  stepId,
  contextMap,
  context: KeystoneContext
) {
  const step = await context.query.OrchestrationStep.findOne({
    where: { id: stepId },
    query: `
            id 
            order 
            storeOutputAs
            inputMapping            
            agent { 
                id 
                type
                name
                functionName
                inputSchema
                outputSchema       
                promptTemplate           
            }
        `,
  });

  const agent = step.agent;
  const input = interpolate(step.inputMapping, contextMap); // ← inject context vars

  // Create AgentOutput to track the execution
  const agentOutput = await context.db.AgentOutput.createOne({
    data: {
      step: { connect: { id: step.id } },
      agent: { connect: { id: agent.id } },
      input,
      contextSnapshot: contextMap,
      status: "pending",
    },
  });

  try {
    await runAgent({ agent, input, context, agentOutputId: agentOutput.id }); // ← fire and forget
  } catch (e) {
    console.log(e);
  }
}

// AI generated dark magic
function resolveContextPath(context: Record<string, any>, path: string) {
  const segments = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .map((segment) => segment.trim())
    .filter(Boolean);

  let current: any = context;
  for (const segment of segments) {
    if (current == null || typeof current !== "object") {
      return undefined;
    }
    current = current[segment];
  }

  return current;
}

export function interpolate(input: any, context: Record<string, any>): any {
  if (typeof input === "string") {
    // If the input matches ONLY a single {{key}}, replace it with the raw object
    const wholeKeyMatch = input.match(/^\s*\{\{(.*?)\}\}\s*$/);
    if (wholeKeyMatch) {
      const trimmedKey = wholeKeyMatch[1].trim();
      const value = resolveContextPath(context, trimmedKey);
      return value !== undefined ? value : "";
    }
    // Otherwise, do string interpolation as before
    return input.replace(/\{\{(.*?)\}\}/g, (_, key) => {
      const trimmedKey = key.trim();
      const value = resolveContextPath(context, trimmedKey);
      // For inline replacements, toString is safest
      return value !== undefined
        ? typeof value === "object"
          ? JSON.stringify(value)
          : String(value)
        : "";
    });
  } else if (Array.isArray(input)) {
    return input.map((i) => interpolate(i, context));
  } else if (typeof input === "object" && input !== null) {
    const result: Record<string, any> = {};
    for (const key in input) {
      result[key] = interpolate(input[key], context);
    }
    return result;
  } else {
    return input;
  }
}
