import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { ScenariosSection } from "@/components/ScenariosSection";
import { PerformanceView } from "@/components/PerformanceView";
import { scenarios } from "@/data/agents";

const Index = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  
  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Logo */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <h1 className="text-2xl font-bold text-foreground">Orbit</h1>
      </div>

      {/* Main Content */}
      <HeroSection />
      <ProblemSection />
      <ScenariosSection onViewSimulation={setSelectedScenarioId} />

      {/* Performance View Modal */}
      {selectedScenario && (
        <PerformanceView 
          scenario={selectedScenario} 
          onClose={() => setSelectedScenarioId(null)} 
        />
      )}
    </div>
  );
};

export default Index;
