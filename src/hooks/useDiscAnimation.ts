// hooks/useDiscAnimation.ts
import { useState } from 'react';

export function useDiscAnimation() {
  const [isInserting, setIsInserting] = useState(false);

  const triggerInsert = () => {
    setIsInserting(true);

    setTimeout(() => {
      setIsInserting(false);
    }, 800); // match CSS duration
  };

  return { isInserting, triggerInsert };
}
