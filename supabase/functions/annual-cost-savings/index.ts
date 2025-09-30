import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    let costSavedByAgents = 0;
    
    if (activated && agents && agents.length > 0) {
      // Get agent data from database
      const { data: agentData, error: agentError } = await supabaseClient
        .from('agents')
        .select('name, estimated_tokens_ingested, model_rate_per_1k_tokens_usd, human_rate_usd_per_hour')
        .in('name', agents);

      if (agentError) throw agentError;

      // Calculate savings
      agentData.forEach((agent: any) => {
        const aiCost = (agent.estimated_tokens_ingested / 1000) * agent.model_rate_per_1k_tokens_usd;
        const humanCost = agent.human_rate_usd_per_hour * 160; // 160 hours per month
        costSavedByAgents += (humanCost - aiCost);
      });

      costSavedByAgents = Math.round(costSavedByAgents * 12); // Annual savings
    }

    // Get metrics from database
    const { data: metricsData, error: metricsError } = await supabaseClient
      .from('metrics')
      .select('metric_type, base_value, enhanced_value')
      .in('metric_type', ['cost_saved_by_agents', 'immediate_efficiency_gain']);

    if (metricsError) throw metricsError;

    const response = {
      cost_saved_by_agents: activated ? (costSavedByAgents || metricsData.find(m => m.metric_type === 'cost_saved_by_agents')?.enhanced_value || 0) : 0,
      immediate_efficiency_gain: activated ? (metricsData.find(m => m.metric_type === 'immediate_efficiency_gain')?.enhanced_value || 0) : 0
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in annual-cost-savings function:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
