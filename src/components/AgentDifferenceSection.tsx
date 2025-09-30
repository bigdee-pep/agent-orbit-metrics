import { Bot, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export const AgentDifferenceSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-5xl md:text-7xl font-bold">
            The Difference{" "}
            <span className="gradient-text">One Agent</span>{" "}
            Makes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how a single AI agent transforms your customer service metrics in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Benefit 1 */}
          <div className={`glass-card rounded-3xl p-8 space-y-4 hover:scale-105 transition-all duration-500 ${
            isVisible ? "animate-fade-in" : ""
          }`} style={{ animationDelay: "0.2s" }}>
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
              <Zap className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-3xl font-bold">Instant Resolution</h3>
            <p className="text-muted-foreground text-lg">
              Average response time drops from <span className="line-through">12 minutes</span>{" "}
              to <span className="text-accent font-semibold">30 seconds</span>
            </p>
          </div>

          {/* Benefit 2 */}
          <div className={`glass-card rounded-3xl p-8 space-y-4 hover:scale-105 transition-all duration-500 ${
            isVisible ? "animate-fade-in" : ""
          }`} style={{ animationDelay: "0.4s" }}>
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">92% Success Rate</h3>
            <p className="text-muted-foreground text-lg">
              First-call resolution increases by <span className="text-primary font-semibold">35%</span>{" "}
              with intelligent routing
            </p>
          </div>

          {/* Benefit 3 */}
          <div className={`glass-card rounded-3xl p-8 space-y-4 hover:scale-105 transition-all duration-500 ${
            isVisible ? "animate-fade-in" : ""
          }`} style={{ animationDelay: "0.6s" }}>
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
              <Bot className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-3xl font-bold">24/7 Availability</h3>
            <p className="text-muted-foreground text-lg">
              Never miss a customer query. AI agents work{" "}
              <span className="text-accent font-semibold">round the clock</span> without fatigue
            </p>
          </div>

          {/* Benefit 4 */}
          <div className={`glass-card rounded-3xl p-8 space-y-4 hover:scale-105 transition-all duration-500 ${
            isVisible ? "animate-fade-in" : ""
          }`} style={{ animationDelay: "0.8s" }}>
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">Learning & Improving</h3>
            <p className="text-muted-foreground text-lg">
              Each interaction makes agents smarter, delivering{" "}
              <span className="text-primary font-semibold">exponential improvements</span>
            </p>
          </div>
        </div>

        {/* Key Stat */}
        <div className={`mt-12 glass-card rounded-3xl p-12 text-center ${
          isVisible ? "animate-scale-in" : ""
        }`} style={{ animationDelay: "1s" }}>
          <div className="text-7xl font-bold gradient-text mb-4">$450K</div>
          <p className="text-2xl text-muted-foreground">
            Average annual cost savings per deployed agent swarm
          </p>
        </div>
      </div>
    </section>
  );
};
