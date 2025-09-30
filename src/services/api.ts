const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function callFunction(functionName: string, body?: any) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/${functionName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  getFirstScreen: async () => {
    return callFunction('first-screen');
  },

  selectCategory: async (category?: string) => {
    return callFunction('select-category', { category });
  },

  getAgentSwarm: async (agentName?: string) => {
    return callFunction('agent-swarm', { agent_name: agentName });
  },

  getResolutionTime: async () => {
    return callFunction('resolution-time');
  },

  getMetrics: async (activated: boolean) => {
    return callFunction('metrics', { activated });
  },

  getAnnualCostSavings: async (activated: boolean, agents?: string[]) => {
    return callFunction('annual-cost-savings', { activated, agents });
  },
};
