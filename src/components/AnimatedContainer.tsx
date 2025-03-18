
import { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps {
  children: ReactNode;
  show: boolean;
  className?: string;
  animateIn?: string;
  animateOut?: string;
  duration?: number;
  delay?: number;
  onAnimationComplete?: () => void;
}

const AnimatedContainer = ({
  children,
  show,
  className = "",
  animateIn = "animate-fade-in",
  animateOut = "animate-fade-out",
  duration = 300,
  delay = 0,
  onAnimationComplete,
}: AnimatedContainerProps) => {
  const [shouldRender, setShouldRender] = useState(show);
  const [animation, setAnimation] = useState(show ? animateIn : "");

  useEffect(() => {
    let timeoutId: number;

    if (show) {
      setShouldRender(true);
      timeoutId = window.setTimeout(() => {
        setAnimation(animateIn);
        if (onAnimationComplete) {
          window.setTimeout(onAnimationComplete, duration);
        }
      }, 10);
    } else {
      setAnimation(animateOut);
      timeoutId = window.setTimeout(() => {
        setShouldRender(false);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, duration);
    }

    return () => window.clearTimeout(timeoutId);
  }, [show, animateIn, animateOut, duration, onAnimationComplete]);

  if (!shouldRender) return null;

  return (
    <div 
      className={cn(animation, className)}
      style={{ 
        transitionDuration: `${duration}ms`, 
        transitionDelay: delay ? `${delay}ms` : undefined,
        willChange: "transform, opacity" 
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
