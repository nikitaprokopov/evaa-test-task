import { useRef } from "react";

export function useMemoOnce<T>(factory: () => T): T {
  const ref = useRef<{ value: T }>();

  if (!ref.current) {
    ref.current = {
      value: factory(),
    };
  }

  return ref.current.value;
}
