import { useEffect, useState } from "react";

/** Retorna `value` somente depois de `delay` ms sem novas alterações */
export function useDebounce<T>(value: T, delay = 600): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
