import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { activated } = await req.json();

    const baseMetrics = {
      first_call_resolution: 68,
      automation_rate: 45,
      csat_improvement: 72
    };

    const enhancedMetrics = {
      first_call_resolution: 88,
      automation_rate: 92,
      csat_improvement: 84
    };

    const data = activated ? enhancedMetrics : baseMetrics;

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
