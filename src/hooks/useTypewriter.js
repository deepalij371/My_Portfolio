import { useState, useEffect, useRef } from "react";

const TITLES = [
  "Java Backend Developer",
  "Spring Boot Developer",
  "Microservices Developer",
  "REST API Engineer",
  "Problem Solver",
];

const TYPE_SPEED   = 60;   // ms per character typed
const DELETE_SPEED = 35;   // ms per character deleted
const PAUSE_AFTER  = 1800; // ms to hold the full word before deleting
const PAUSE_BEFORE = 300;  // ms to pause before typing next word

/**
 * Typewriter hook — types, holds, deletes, then moves to the next title.
 */
export function useTypewriter(titles = TITLES) {
  const [display, setDisplay] = useState("");
  const [titleIdx, setTitleIdx] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | holding | deleting | waiting
  const charIdx = useRef(0);

  useEffect(() => {
    let timer;
    const current = titles[titleIdx];

    if (phase === "typing") {
      if (charIdx.current < current.length) {
        timer = setTimeout(() => {
          setDisplay(current.slice(0, charIdx.current + 1));
          charIdx.current += 1;
        }, TYPE_SPEED);
      } else {
        timer = setTimeout(() => setPhase("holding"), PAUSE_AFTER);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), 100);

    } else if (phase === "deleting") {
      if (charIdx.current > 0) {
        timer = setTimeout(() => {
          charIdx.current -= 1;
          setDisplay(current.slice(0, charIdx.current));
        }, DELETE_SPEED);
      } else {
        timer = setTimeout(() => setPhase("waiting"), PAUSE_BEFORE);
      }
    } else if (phase === "waiting") {
      setTitleIdx((i) => (i + 1) % titles.length);
      charIdx.current = 0;
      setPhase("typing");
    }

    return () => clearTimeout(timer);
  }, [phase, display, titleIdx, titles]);

  return display;
}
