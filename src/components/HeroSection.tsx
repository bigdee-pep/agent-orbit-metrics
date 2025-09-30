import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onSeeAction: () => void;
}

export const HeroSection = ({ onSeeAction }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Orbital Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] orbital-glow pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-12 animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold leading-tight">
          Stop <span className="text-muted-foreground">Managing</span>
          <br />
          Customer Experience.
          <br />
          Start <span className="gradient-text">Engineering</span>
          <br />
          Customer Excellence.
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Our autonomous AI agents don't just answer tickets. They resolve your most complex 
          operational challenges, delivering measurable ROI from day one.
        </p>
        
        <button
          onClick={onSeeAction}
          className="glass-card px-12 py-6 rounded-full inline-flex items-center gap-4 hover:scale-110 transition-all duration-300 animate-pulse group"
        >
          <span className="text-xl font-semibold gradient-text">See Them in Action</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </section>
  );
};
