import { scenarios } from "@/data/agents";
import { ScenarioCard } from "./ScenarioCard";

interface ScenariosSectionProps {
  onViewSimulation: (scenarioId: string) => void;
}

export const ScenariosSection = ({ onViewSimulation }: ScenariosSectionProps) => {
  return (
    <section id="scenarios" className="min-h-screen flex items-center justify-center py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
        <div className="text-center space-y-6">
          <h2 className="text-5xl md:text-7xl font-bold">
            Real Scenarios.{" "}
            <span className="gradient-text">Real Results.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Below are the most common scenarios from your customer service data. 
            Click on each to see how AI agents work together to resolve them faster 
            and the measurable impact on your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario, index) => (
            <div 
              key={scenario.id}
              className="animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ScenarioCard 
                scenario={scenario} 
                onViewSimulation={onViewSimulation}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
