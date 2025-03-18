
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shuffle } from "lucide-react";

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
        "relative overflow-hidden group transition-all duration-300 h-14 px-8 shadow-md",
        isHovered && !disabled ? "shadow-xl" : "",
        disabled ? "opacity-70" : "",
        className
      )}
      size="lg"
      variant="default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center space-x-2">
        <Shuffle 
          className={cn(
            "w-5 h-5 transition-transform duration-300",
            isHovered && !disabled ? "rotate-180" : ""
          )} 
        />
        <span className="font-medium">Sortear Amigo</span>
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
