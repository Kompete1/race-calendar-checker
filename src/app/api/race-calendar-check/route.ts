import { runWorkflow } from "@/agent/workflow";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://kompete1.github.io",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET() {
  const ts = new Date().toISOString();

  try {
    const instruction =
      "Check the MSA race calendar page for changes since the last seen/baseline and return a short update summary.";
    const result = await runWorkflow({ input_as_text: instruction });

    return new Response(
      JSON.stringify({
        status: "ok",
        summary: result.output_text,
        ts,
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    const summary = error instanceof Error ? error.message : "Unknown error";

    return new Response(
      JSON.stringify({
        status: "error",
        summary,
        ts,
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
