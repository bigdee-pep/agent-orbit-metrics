import { scenarios } from "@/data/agents";
import { ScenarioCard } from "./ScenarioCard";

interface ScenariosSectionProps {
  onViewSimulation: (scenarioId: string) => void;
}

export const ScenariosSection = ({ onViewSimulation }: ScenariosSectionProps) => {
  return (
    <section id="scenarios" className="py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            The Difference One Agent Makes. Right Now.
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Below are the most common scenarios for Customer service from your corporation. 
            Click on each scenario to see how your agents can work together to fix it faster and what impact that has on your business
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <ScenarioCard 
              key={scenario.id} 
              scenario={scenario} 
              onViewSimulation={onViewSimulation}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
