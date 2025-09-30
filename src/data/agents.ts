export interface Agent {
  name: string;
  rating: number;
  reliability: number;
  estimated_tokens_ingested: number;
  model_used: string;
  model_rate_per_1k_tokens_usd: number;
  human_rate_usd_per_hour: number;
}

export const agents: Agent[] = [
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
    name: "OrderTrackingAgent",
    rating: 4.8,
    reliability: 9.1,
    estimated_tokens_ingested: 1472300,
    model_used: "gpt-4.1",
    model_rate_per_1k_tokens_usd: 13.75,
    human_rate_usd_per_hour: 68
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
    name: "PasswordRecoveryAgent",
    rating: 4.8,
    reliability: 9.1,
    estimated_tokens_ingested: 241700,
    model_used: "gpt-4.1",
    model_rate_per_1k_tokens_usd: 12.25,
    human_rate_usd_per_hour: 48
  }
];

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  problem: string;
  problemColor: string;
  successRate: number;
  metrics: {
    fcr: number;
    automationRate: number;
    csatScore: number;
    costSavings: number;
    efficiencyGain: number;
    roiMultiplier: number;
  };
  agents: string[];
}

export const scenarios: Scenario[] = [
  {
    id: "status-inquiries",
    title: "High Volume of Status Inquiries",
    description: "Customers frequently contact support for order tracking information",
    icon: "search",
    problem: "OVERWHELMS SUPPORT TEAM WITH REPETITIVE QUERIES",
    problemColor: "text-red-400",
    successRate: 95,
    metrics: {
      fcr: 65,
      automationRate: 0,
      csatScore: 78,
      costSavings: 1414500,
      efficiencyGain: 50,
      roiMultiplier: 1
    },
    agents: ["Hardware Agent", "ABS Agent", "Password Resolution Agent", "Investigation Agent", "Ticket Agent"]
  },
  {
    id: "refund-processing",
    title: "Complex Refund & Return Processing",
    description: "Multiple policies, approval delays and customer frustration",
    icon: "refresh-cw",
    problem: "LONG RESOLUTION TIMES AND INCONSISTENT POLICY APPLICATION",
    problemColor: "text-orange-400",
    successRate: 95,
    metrics: {
      fcr: 70,
      automationRate: 0,
      csatScore: 82,
      costSavings: 982300,
      efficiencyGain: 45,
      roiMultiplier: 1.2
    },
    agents: ["Refund Agent", "Policy Agent", "Approval Agent"]
  },
  {
    id: "technical-troubleshooting",
    title: "Repetitive Technical Troubleshooting",
    description: "Common technical issues require extensive agent time and expertise",
    icon: "wrench",
    problem: "HIGH-HANDLING TIME FOR ROUTINE PROBLEMS",
    problemColor: "text-yellow-400",
    successRate: 88,
    metrics: {
      fcr: 58,
      automationRate: 0,
      csatScore: 72,
      costSavings: 756800,
      efficiencyGain: 38,
      roiMultiplier: 0.9
    },
    agents: ["Tech Support Agent", "Diagnostic Agent", "Resolution Agent"]
  },
  {
    id: "billing-questions",
    title: "Billing and Account Questions",
    description: "Customers need help understanding charges and account details",
    icon: "credit-card",
    problem: "COMPLEX DATA LOOKUPS SLOW DOWN RESOLUTION",
    problemColor: "text-blue-400",
    successRate: 88,
    metrics: {
      fcr: 72,
      automationRate: 0,
      csatScore: 80,
      costSavings: 1125000,
      efficiencyGain: 42,
      roiMultiplier: 1.1
    },
    agents: ["Billing Agent", "Account Agent", "Charge Explanation Agent"]
  }
];
