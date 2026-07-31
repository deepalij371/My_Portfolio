import { useState, useEffect } from "react";

/**
 * Cycles through a list of strings at a given interval.
 * @param {string[]} list
 * @param {number} interval - ms between changes
 * @returns {string} Current item
 */
export function useCyclingText(list, interval = 2600) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % list.length), interval);
    return () => clearInterval(t);
  }, [list, interval]);

  return list[i];
}
