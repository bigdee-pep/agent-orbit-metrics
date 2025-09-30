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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { data, error } = await supabaseClient
      .from('metrics')
      .select('metric_type, base_value')
      .in('metric_type', ['repetitive_time', 'escalated_percentage', 'reduced_csat']);

    if (error) throw error;

    const response = {
      repetitive_time: data.find(m => m.metric_type === 'repetitive_time')?.base_value || 0,
      escalated_percentage: data.find(m => m.metric_type === 'escalated_percentage')?.base_value || 0,
      reduced_csat: data.find(m => m.metric_type === 'reduced_csat')?.base_value || 0
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in first-screen function:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
