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
    const { activated, agents } = await req.json();

    // Calculate cost savings based on agent tokens and rates
    let costSavedByAgents = 0;
    
    if (activated && agents && agents.length > 0) {
      // Mock calculation based on provided agent data
      const agentData = [
        { name: "OrderCancellationAgent", tokens: 745200, rate: 12.75, humanRate: 62 },
        { name: "BillingInvoicesAgent", tokens: 1230400, rate: 12.5, humanRate: 64 },
        { name: "OrderTrackingAgent", tokens: 1472300, rate: 13.75, humanRate: 68 },
      ];

      agents.forEach((agentName: string) => {
        const agent = agentData.find(a => a.name === agentName);
        if (agent) {
          const aiCost = (agent.tokens / 1000) * agent.rate;
          const humanCost = agent.humanRate * 160; // 160 hours per month
          costSavedByAgents += (humanCost - aiCost);
        }
      });

      costSavedByAgents = Math.round(costSavedByAgents * 12); // Annual savings
    }

    const data = {
      cost_saved_by_agents: activated ? costSavedByAgents || 450000 : 0,
      immediate_efficiency_gain: activated ? 35 : 0
    };

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
