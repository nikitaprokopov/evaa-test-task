import { useEffect } from "react";

export function useEffectOnce(effect: () => unknown) {
  useEffect(() => {
    const cleanup = effect();

    return () => {
      if (cleanup && typeof cleanup === "function") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        cleanup();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
