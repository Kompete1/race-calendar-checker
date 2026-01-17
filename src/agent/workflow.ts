import { Agent, AgentInputItem, Runner, withTrace } from "@openai/agents";

const myAgent = new Agent({
  name: "My agent",
  instructions: `You are MSA Race Calendar Update Checker. You will receive JSON in input_as_text containing: (1) baseline_calendar (the current known national + regional race dates/venues) (2) latest_source (evidence from motorsport.co.za events calendar download page: filenames, urls, and any extracted text) Task: Determine whether there are any changes affecting:
National circuit car races (Extreme Festival – National)
Regional circuit car races (BMW Performance Parts / relevant regional circuit series) Compare latest_source to baseline_calendar. If there is no new calendar file or no meaningful change to dates/venues, respond exactly: No changes to the race calendar. If there are changes, list them as bullets with: series (National/Regional), what changed (Added/Removed/Date changed/Venue changed), old → new. If the evidence is insufficient to confidently extract dates/venues, say what is missing and do NOT guess.`,
  model: "gpt-4.1",
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

type WorkflowInput = { input_as_text: string };


// Main code entrypoint
export const runWorkflow = async (workflow: WorkflowInput) => {
  return await withTrace("MSA Race Calendar Update Checker", async () => {
    const state = {
      lastseen: null,
      baseline: null
    };
    const conversationHistory: AgentInputItem[] = [
      { role: "user", content: [{ type: "input_text", text: workflow.input_as_text }] }
    ];
    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_696b96b031e481909ea2e56861fcaccc02547538c4abee1f"
      }
    });
    const myAgentResultTemp = await runner.run(
      myAgent,
      [
        ...conversationHistory
      ]
    );
    conversationHistory.push(...myAgentResultTemp.newItems.map((item) => item.rawItem));

    if (!myAgentResultTemp.finalOutput) {
        throw new Error("Agent result is undefined");
    }

    const myAgentResult = {
      output_text: myAgentResultTemp.finalOutput ?? ""
    };
    return myAgentResult;
  });
}
