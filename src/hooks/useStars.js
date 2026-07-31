import { useMemo } from "react";

/**
 * Generates a stable array of random star configurations.
 * @param {number} count - Number of stars to generate
 */
export function useStars(count = 90) {
  return useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.6,
        delay: Math.random() * 4,
        dur: 2 + Math.random() * 3,
      })),
    [count]
  );
}
