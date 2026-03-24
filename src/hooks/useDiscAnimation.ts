// hooks/useDiscAnimation.ts
import { useState } from 'react';

type Phase = 'idle' | 'dropping' | 'locked';

export function useDiscAnimation() {
  const [phase, setPhase] = useState<Phase>('idle');

  const triggerInsert = () => {
    setPhase('dropping');

    setTimeout(() => {
      setPhase('locked');
    }, 700);
  };

  return {
    phase,
    triggerInsert,
  };
}
