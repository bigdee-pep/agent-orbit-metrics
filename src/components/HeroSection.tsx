import { ArrowRight, FolderOpen } from "lucide-react";
import Orb from "@/components/ui/Orb";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface HeroSectionProps {
  onSeeAction: (file: File) => void;
}

export const HeroSection = ({ onSeeAction }: HeroSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate CSV file
    if (!file.name.endsWith('.csv')) {
      toast.error("Please upload a CSV file only");
      return;
    }

    setUploading(true);
    // Simulate upload processing
    setTimeout(() => {
      setUploading(false);
      toast.success("CSV file uploaded successfully!");
      onSeeAction(file);
    }, 500);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Orb Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-60">
        <Orb hue={260} hoverIntensity={0.3} rotateOnHover={true} />
      </div>
      
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
        
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleClick}
            disabled={uploading}
            className="glass-card px-12 py-6 rounded-full inline-flex items-center gap-4 hover:scale-110 transition-all duration-300 animate-pulse group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FolderOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-semibold gradient-text">
              {uploading ? "Uploading..." : "Upload CSV & See Action"}
            </span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
          <p className="text-sm text-muted-foreground">Upload your customer service data (CSV format)</p>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </section>
  );
};
