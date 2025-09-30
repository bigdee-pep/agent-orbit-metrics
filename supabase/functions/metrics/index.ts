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
    const { activated } = await req.json();

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { data, error } = await supabaseClient
      .from('metrics')
      .select('metric_type, base_value, enhanced_value')
      .in('metric_type', ['first_call_resolution', 'automation_rate', 'csat_improvement']);

    if (error) throw error;

    const valueKey = activated ? 'enhanced_value' : 'base_value';
    
    const response = {
      first_call_resolution: data.find(m => m.metric_type === 'first_call_resolution')?.[valueKey] || 0,
      automation_rate: data.find(m => m.metric_type === 'automation_rate')?.[valueKey] || 0,
      csat_improvement: data.find(m => m.metric_type === 'csat_improvement')?.[valueKey] || 0
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in metrics function:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
