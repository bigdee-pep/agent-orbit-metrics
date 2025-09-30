import { Search, RefreshCw, Wrench, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scenario } from "@/data/agents";

interface ScenarioCardProps {
  scenario: Scenario;
  onViewSimulation: (scenarioId: string) => void;
}

const iconMap = {
  search: Search,
  "refresh-cw": RefreshCw,
  wrench: Wrench,
  "credit-card": CreditCard,
};

export const ScenarioCard = ({ scenario, onViewSimulation }: ScenarioCardProps) => {
  const Icon = iconMap[scenario.icon as keyof typeof iconMap];
  
  return (
    <div className="glass-card rounded-3xl p-8 space-y-6 hover:border-accent/50 transition-all">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">SCENARIO</p>
        <div className="flex items-start gap-4">
          <Icon className="w-6 h-6 text-foreground mt-1 flex-shrink-0" />
          <h3 className="text-2xl font-bold">{scenario.title}</h3>
        </div>
      </div>
      
      <p className="text-muted-foreground">
        {scenario.description}
      </p>
      
      <div className="space-y-3 pt-4 border-t border-border/50">
        <p className={`text-xs uppercase tracking-wider ${scenario.problemColor}`}>
          {scenario.problem}
        </p>
        <p className="text-sm text-foreground">
          can be automated with a success rate of <span className="font-bold">{scenario.successRate}%</span>
        </p>
      </div>
      
      <Button 
        onClick={() => onViewSimulation(scenario.id)}
        variant="secondary"
        className="w-full bg-primary/50 hover:bg-primary/70 transition-all"
      >
        View Simulation
      </Button>
    </div>
  );
};
