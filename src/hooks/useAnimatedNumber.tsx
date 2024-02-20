import { useEffect, useState } from "react";

export function useAnimatedNumber(targetNumber: number, duration: number) {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number | null = null;

    function step(timestamp: number) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / duration, 1);
      const animatedNumber = Math.floor(percentage * targetNumber);

      setCurrentNumber(animatedNumber);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(step);
      }
    }

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [targetNumber, duration]);

  return currentNumber;
}
