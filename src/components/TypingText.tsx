import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number;
}

export function TypingText({ text, speed = 80 }: Props) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    setDisplay("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {display}
      <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-white align-middle" />
    </span>
  );
}
