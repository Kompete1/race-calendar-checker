const corsHeaders = {
  "Access-Control-Allow-Origin": "https://kompete1.github.io",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET() {
  const body = {
    status: "stub",
    summary: "Phase 3 agent not connected yet.",
    ts: new Date().toISOString(),
  };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: corsHeaders,
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
