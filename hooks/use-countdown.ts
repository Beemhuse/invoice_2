import { useState, useEffect } from "react";

export const useCountdown = (initialCount: number) => {
  const [countdown, setCountdown] = useState(initialCount);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
    }

    return () => clearTimeout(timer);
  }, [countdown, isCounting]);

  const startCountdown = () => {
    setCountdown(initialCount);
    setIsCounting(true);
  };

  return {
    countdown,
    startCountdown,
    isCounting,
  };
};