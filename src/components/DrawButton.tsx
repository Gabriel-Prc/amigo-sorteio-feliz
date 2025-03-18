
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface DrawButtonProps {
  onDraw: () => void;
  disabled?: boolean;
  className?: string;
}

const DrawButton = ({ onDraw, disabled = false, className }: DrawButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      onClick={onDraw}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden h-14 px-8 shadow-md rounded-full bg-[#E86F43] hover:bg-[#E86F43]/90 text-white",
        disabled ? "opacity-70" : "",
        className
      )}
      size="lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center space-x-2">
        <Play className="w-5 h-5" />
        <span className="font-medium">Sortear amigo</span>
      </div>
      
      {!disabled && (
        <div 
          className={cn(
            "absolute inset-0 bg-white/10 transform transition-transform duration-500 ease-out",
            isHovered ? "scale-x-100" : "scale-x-0"
          )}
          style={{ transformOrigin: 'left center' }}
        />
      )}
    </Button>
  );
};

export default DrawButton;
