import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { AgentDifferenceSection } from "@/components/AgentDifferenceSection";
import { ScenariosSection } from "@/components/ScenariosSection";
import { PerformanceView } from "@/components/PerformanceView";
import { scenarios } from "@/data/agents";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  
  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentSection < 3 && !selectedScenarioId) {
        setCurrentSection((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection, selectedScenarioId]);

  const handleNext = () => {
    if (currentSection < 3) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Logo */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <h1 className="text-2xl font-bold text-foreground">Orbit</h1>
      </div>

      {/* Section 0: Hero Landing */}
      <div
        className={`min-h-screen transition-all duration-1000 ease-in-out ${
          currentSection === 0
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none fixed inset-0"
        }`}
      >
        <HeroSection onSeeAction={() => setCurrentSection(1)} />
      </div>

      {/* Section 1: Problem Section */}
      <div
        className={`min-h-screen transition-all duration-1000 ease-in-out ${
          currentSection === 1
            ? "opacity-100 translate-y-0"
            : currentSection > 1
            ? "opacity-0 -translate-y-full pointer-events-none fixed inset-0"
            : "opacity-0 translate-y-full pointer-events-none fixed inset-0"
        }`}
      >
        {currentSection >= 1 && (
          <>
            <ProblemSection />
            <div className="flex flex-col items-center gap-4 pb-20">
              <button
                onClick={handleNext}
                className="glass-card px-10 py-5 rounded-full hover:scale-110 transition-all duration-300 animate-pulse group"
              >
                <span className="gradient-text font-semibold text-lg">
                  Next →
                </span>
              </button>
              <p className="text-sm text-muted-foreground">or press Enter</p>
            </div>
          </>
        )}
      </div>

      {/* Section 2: Agent Difference */}
      <div
        className={`min-h-screen transition-all duration-1000 ease-in-out ${
          currentSection === 2
            ? "opacity-100 translate-y-0"
            : currentSection > 2
            ? "opacity-0 -translate-y-full pointer-events-none fixed inset-0"
            : "opacity-0 translate-y-full pointer-events-none fixed inset-0"
        }`}
      >
        {currentSection >= 2 && (
          <>
            <AgentDifferenceSection />
            <div className="flex flex-col items-center gap-4 pb-20">
              <button
                onClick={handleNext}
                className="glass-card px-10 py-5 rounded-full hover:scale-110 transition-all duration-300 animate-pulse group"
              >
                <span className="gradient-text font-semibold text-lg">
                  See Scenarios in Action →
                </span>
              </button>
              <p className="text-sm text-muted-foreground">or press Enter</p>
            </div>
          </>
        )}
      </div>

      {/* Section 3: Scenarios */}
      <div
        className={`min-h-screen transition-all duration-1000 ease-in-out ${
          currentSection === 3
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none fixed inset-0"
        }`}
      >
        {currentSection >= 3 && (
          <ScenariosSection onViewSimulation={setSelectedScenarioId} />
        )}
      </div>

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
