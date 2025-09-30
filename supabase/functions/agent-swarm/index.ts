import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const agents = [
  {
    name: "OrderCancellationAgent",
    rating: 4.7,
    reliability: 9.0,
    estimated_tokens_ingested: 745200,
    model_used: "gpt-4.1",
    model_rate_per_1k_tokens_usd: 12.75,
    human_rate_usd_per_hour: 62
  },
  {
    name: "OrderModificationAgent",
    rating: 4.5,
    reliability: 8.8,
    estimated_tokens_ingested: 683100,
    model_used: "claude-3.5-sonnet",
    model_rate_per_1k_tokens_usd: 9.75,
    human_rate_usd_per_hour: 58
  },
  {
    name: "AddressUpdateAgent",
    rating: 4.4,
    reliability: 8.7,
    estimated_tokens_ingested: 352800,
    model_used: "llama-3.1-large",
    model_rate_per_1k_tokens_usd: 3.2,
    human_rate_usd_per_hour: 40
  },
  {
    name: "RefundsReimbursementsAgent",
    rating: 4.6,
    reliability: 9.0,
    estimated_tokens_ingested: 934300,
    model_used: "gpt-4.1",
    model_rate_per_1k_tokens_usd: 14.25,
    human_rate_usd_per_hour: 66
  },
  {
    name: "BillingInvoicesAgent",
    rating: 4.5,
    reliability: 8.8,
    estimated_tokens_ingested: 1230400,
    model_used: "claude-3.5-sonnet",
    model_rate_per_1k_tokens_usd: 12.5,
    human_rate_usd_per_hour: 64
  },
  {
    name: "PaymentMethodsAgent",
    rating: 4.3,
    reliability: 8.6,
    estimated_tokens_ingested: 412500,
    model_used: "llama-3.1-large",
    model_rate_per_1k_tokens_usd: 2.4,
    human_rate_usd_per_hour: 42
  },
  {
    name: "PaymentIssuesAgent",
    rating: 4.4,
    reliability: 8.7,
    estimated_tokens_ingested: 887900,
    model_used: "claude-3.5-sonnet",
    model_rate_per_1k_tokens_usd: 8.25,
    human_rate_usd_per_hour: 60
  },
  {
    name: "AccountRegistrationAgent",
    rating: 4.3,
    reliability: 8.5,
    estimated_tokens_ingested: 321900,
    model_used: "llama-3.1-large",
    model_rate_per_1k_tokens_usd: 1.8,
    human_rate_usd_per_hour: 36
  },
  {
    name: "DuplicateAccountsAgent",
    rating: 4.4,
    reliability: 8.6,
    estimated_tokens_ingested: 268400,
    model_used: "claude-3.5-sonnet",
    model_rate_per_1k_tokens_usd: 10.25,
    human_rate_usd_per_hour: 44
  },
  {
    name: "AccountClosureAgent",
    rating: 4.4,
    reliability: 8.7,
    estimated_tokens_ingested: 389100,
    model_used: "claude-3.5-sonnet",
    model_rate_per_1k_tokens_usd: 13.0,
    human_rate_usd_per_hour: 50
  },
  {
    name: "PasswordRecoveryAgent",
    rating: 4.8,
    reliability: 9.1,
    estimated_tokens_ingested: 241700,
    model_used: "gpt-4.1",
    model_rate_per_1k_tokens_usd: 12.25,
    human_rate_usd_per_hour: 48
  },
  {
    name: "OrderTrackingAgent",
    rating: 4.8,
    reliability: 9.1,
    estimated_tokens_ingested: 1472300,
    model_used: "gpt-4.1",
    model_rate_per_1k_tokens_usd: 13.75,
    human_rate_usd_per_hour: 68
  },
  {
    name: "ShippingOptionsAgent",
    rating: 4.3,
    reliability: 8.6,
    estimated_tokens_ingested: 541800,
    model_used: "llama-3.1-large",
    model_rate_per_1k_tokens_usd: 3.8,
    human_rate_usd_per_hour: 46
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { agent_name } = await req.json();

    if (agent_name) {
      const agent = agents.find(a => a.name === agent_name);
      return new Response(
        JSON.stringify(agent || agents[0]),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(agents),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
