import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scenario } from "@/data/agents";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface PerformanceViewProps {
  scenario: Scenario;
  onClose: () => void;
}

const resolutionData = [
  { date: "July 3", value: 50 },
  { date: "July 6", value: 58 },
  { date: "July 9", value: 65 },
  { date: "July 12", value: 78 },
  { date: "July 15", value: 82 },
  { date: "July 18", value: 76 },
  { date: "July 21", value: 68 },
  { date: "July 24", value: 55 },
];

const roiData = [
  { date: "July 3", value: 50 },
  { date: "July 6", value: 62 },
  { date: "July 9", value: 70 },
  { date: "July 12", value: 80 },
  { date: "July 15", value: 85 },
  { date: "July 18", value: 82 },
  { date: "July 21", value: 68 },
  { date: "July 24", value: 55 },
];

const enhancedResolutionData = resolutionData.map((d, i) => ({
  ...d,
  enhanced: Math.min(100, d.value + 15 + i * 2)
}));

const enhancedRoiData = roiData.map((d, i) => ({
  ...d,
  enhanced: Math.min(100, d.value + 10 + i * 1.5)
}));

export const PerformanceView = ({ scenario, onClose }: PerformanceViewProps) => {
  const [isActivated, setIsActivated] = useState(false);

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
                  <LineChart data={isActivated ? enhancedResolutionData : resolutionData}>
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
                  <LineChart data={isActivated ? enhancedRoiData : roiData}>
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
                    {isActivated ? scenario.metrics.fcr + 20 : scenario.metrics.fcr}%
                  </div>
                </div>

                {/* Automation Rate */}
                <div className="glass-card rounded-2xl p-6 text-center space-y-2">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider">
                    AUTOMATION RATE
                  </h4>
                  <div className="text-5xl font-bold">
                    {isActivated ? scenario.successRate : scenario.metrics.automationRate}%
                  </div>
                </div>

                {/* CSAT Score */}
                <div className="glass-card rounded-2xl p-6 text-center space-y-2">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider">
                    CSAT SCORE
                  </h4>
                  <div className="text-5xl font-bold">
                    {isActivated ? scenario.metrics.csatScore + 12 : scenario.metrics.csatScore}%
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
                        ${isActivated 
                          ? (scenario.metrics.costSavings * 1.5).toLocaleString() 
                          : 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Immediate efficiency gain</span>
                      <span className={isActivated ? "text-accent font-semibold" : ""}>
                        {isActivated ? scenario.metrics.efficiencyGain + 15 : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ROI multiplier</span>
                      <span className={isActivated ? "text-accent font-semibold" : ""}>
                        {isActivated ? (scenario.metrics.roiMultiplier + 0.5).toFixed(1) : scenario.metrics.roiMultiplier}x
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
