import { TrendingUp, Clock, TrendingDown } from "lucide-react";

export const ProblemSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Your Data is Telling a Story of{" "}
          <span className="gradient-text">Lost Opportunity.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <div className="glass-card rounded-3xl p-8 space-y-4">
            <TrendingUp className="w-10 h-10 text-muted-foreground" />
            <div className="text-5xl font-bold">45%</div>
            <p className="text-sm text-muted-foreground">
              of your agent's time is spent on repetitive, automatable tasks.
            </p>
          </div>
          
          {/* Stat Card 2 */}
          <div className="glass-card rounded-3xl p-8 space-y-4">
            <Clock className="w-10 h-10 text-muted-foreground" />
            <div className="text-5xl font-bold">12 minutes</div>
            <p className="text-sm text-muted-foreground">
              are added because of Escalations and Hand-offs on a daily basis
            </p>
          </div>
          
          {/* Stat Card 3 */}
          <div className="glass-card rounded-3xl p-8 space-y-4">
            <TrendingDown className="w-10 h-10 text-muted-foreground" />
            <div className="text-5xl font-bold">8 points</div>
            <p className="text-sm text-muted-foreground">
              are deducted from your CSAT daily because of inconsistent answers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
