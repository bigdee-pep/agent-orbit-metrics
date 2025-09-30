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
    const humanTime = [
      { date: "July 3", value: 50 },
      { date: "July 6", value: 58 },
      { date: "July 9", value: 65 },
      { date: "July 12", value: 78 },
      { date: "July 15", value: 82 },
      { date: "July 18", value: 76 },
      { date: "July 21", value: 68 },
      { date: "July 24", value: 55 },
    ];

    const aiTime = humanTime.map((d, i) => ({
      ...d,
      value: Math.min(100, d.value + 15 + i * 2)
    }));

    const data = {
      human_time: humanTime,
      ai_time: aiTime
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
