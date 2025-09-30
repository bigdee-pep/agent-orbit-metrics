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
    const { category } = await req.json();

    const scenarios = [
      {
        category_name: "Order cancellation",
        category_desc: "Customer frustrated by repeated transfers between departments when trying to cancel orders. 8-15 min wait times, multiple authentication steps.",
        agents: ["OrderCancellationAgent", "RefundsReimbursementsAgent"],
        successRate: 92
      },
      {
        category_name: "Billing & Payment Issues",
        category_desc: "Complex billing inquiries requiring access to multiple systems. Customers face 10+ min holds and inconsistent information about payment methods and invoices.",
        agents: ["BillingInvoicesAgent", "PaymentMethodsAgent", "PaymentIssuesAgent"],
        successRate: 88
      },
      {
        category_name: "Account Management",
        category_desc: "Customers struggle with account updates, password resets, and duplicate accounts. Long resolution times due to security verification processes.",
        agents: ["AccountRegistrationAgent", "DuplicateAccountsAgent", "AccountClosureAgent", "PasswordRecoveryAgent"],
        successRate: 95
      },
      {
        category_name: "Order Tracking & Delivery",
        category_desc: "High volume of repetitive 'where is my order' calls. Customers transferred between shipping and customer service departments.",
        agents: ["OrderTrackingAgent", "ShippingOptionsAgent"],
        successRate: 94
      }
    ];

    const selectedScenario = category 
      ? scenarios.find(s => s.category_name === category) || scenarios[0]
      : scenarios[0];

    return new Response(
      JSON.stringify(selectedScenario),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
