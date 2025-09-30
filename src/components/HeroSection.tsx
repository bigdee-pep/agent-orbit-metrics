import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const scrollToScenarios = () => {
    document.getElementById('scenarios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Orbital Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] orbital-glow pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          <span className="text-muted-foreground">Stop Managing Customer Service.</span>
          <br />
          <span className="text-foreground">Start Engineering Customer Excellence.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Our autonomous AI agents don't just answer tickets. They resolve your most complex 
          operational challenges, delivering measurable ROI from day one.
        </p>
        
        <Button 
          size="lg" 
          onClick={scrollToScenarios}
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
        >
          See them in action
        </Button>
      </div>
    </section>
  );
};
