import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scenario } from "@/data/agents";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { api } from "@/services/api";

interface PerformanceViewProps {
  scenario: Scenario;
  onClose: () => void;
}

export const PerformanceView = ({ scenario, onClose }: PerformanceViewProps) => {
  const [isActivated, setIsActivated] = useState(false);
  const [resolutionData, setResolutionData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    first_call_resolution: 0,
    automation_rate: 0,
    csat_improvement: 0
  });
  const [costSavings, setCostSavings] = useState({
    cost_saved_by_agents: 0,
    immediate_efficiency_gain: 0
  });

  useEffect(() => {
    api.getResolutionTime().then(data => {
      setResolutionData(data.human_time.map((item: any, i: number) => ({
        ...item,
        enhanced: data.ai_time[i].value
      })));
    });
  }, []);

  useEffect(() => {
    api.getMetrics(isActivated).then(setMetrics);
    api.getAnnualCostSavings(isActivated, scenario.agents).then(setCostSavings);
  }, [isActivated, scenario.agents]);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="glass-card rounded-3xl p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">SCENARIO</p>
                <h1 className="text-4xl font-bold">{scenario.title}</h1>
                <p className="text-muted-foreground">{scenario.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-primary/50"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Performance Lift */}
          <div className={`glass-card rounded-3xl p-8 space-y-8 transition-all duration-500 ${
            isActivated ? 'bg-gradient-to-br from-accent/10 to-transparent' : ''
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Performance Lift</h2>
                <p className="text-muted-foreground">
                  {isActivated ? 'Enhanced State' : 'Current State'}
                </p>
              </div>
              <Button
                onClick={() => setIsActivated(!isActivated)}
                className={`px-8 py-6 rounded-full font-semibold transition-all ${
                  isActivated 
                    ? 'bg-primary hover:bg-primary/80 text-foreground' 
                    : 'bg-accent hover:bg-accent/90 text-accent-foreground'
                }`}
              >
                {isActivated ? 'De-Activate Agents' : 'Activate Agents'}
              </Button>
            </div>

            {/* Agent Pills */}
            {isActivated && (
              <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {scenario.agents.map((agent) => (
                  <div
                    key={agent}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/30"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-sm font-medium">{agent}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resolution Time Chart */}
              <div className="glass-card rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                    RESOLUTION TIME
                  </h3>
                  <p className="text-xs text-muted-foreground">Trend Analysis</p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={resolutionData}>
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--foreground))" 
                      strokeWidth={2}
                      dot={false}
                    />
                    {isActivated && (
                      <Line 
                        type="monotone" 
                        dataKey="enhanced" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* ROI Chart */}
              <div className="glass-card rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                    RETURN ON INVESTMENT
                  </h3>
                  <p className="text-xs text-muted-foreground">Trend Analysis</p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={resolutionData}>
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--foreground))" 
                      strokeWidth={2}
                      dot={false}
                    />
                    {isActivated && (
                      <Line 
                        type="monotone" 
                        dataKey="enhanced" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Impact Metrics */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Impact Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* FCR */}
                <div className="glass-card rounded-2xl p-6 text-center space-y-2">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider">
                    FIRST CONTACT RESOLUTION
                  </h4>
                  <div className="text-5xl font-bold">
                    {metrics.first_call_resolution}%
                  </div>
                </div>

                {/* Automation Rate */}
                <div className="glass-card rounded-2xl p-6 text-center space-y-2">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider">
                    AUTOMATION RATE
                  </h4>
                  <div className="text-5xl font-bold">
                    {metrics.automation_rate}%
                  </div>
                </div>

                {/* CSAT Score */}
                <div className="glass-card rounded-2xl p-6 text-center space-y-2">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider">
                    CSAT SCORE
                  </h4>
                  <div className="text-5xl font-bold">
                    {metrics.csat_improvement}%
                  </div>
                </div>

                {/* Bottom Line ROI */}
                <div className="glass-card rounded-2xl p-6 space-y-3">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider">
                    BOTTOM LINE ROI {isActivated && <span className="text-accent">(+50% SYNERGY)</span>}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Projected Annual Cost savings</span>
                      <span className={isActivated ? "text-accent font-semibold" : ""}>
                        ${costSavings.cost_saved_by_agents.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Immediate efficiency gain</span>
                      <span className={isActivated ? "text-accent font-semibold" : ""}>
                        {costSavings.immediate_efficiency_gain}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
