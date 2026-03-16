import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const BODY =
  "We're getting married! And we want you to be there, for a day full of love, awkwardness, happiness, and terrible dancing. On this page, you'll find everything you need to know – schedule, location, food and whats to drink! – and you can RSVP directly here. See you this summer!";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, ["#b0aa9f", "#1a1a16"]);
  return <motion.span style={{ color }}>{children} </motion.span>;
}

export default function TextSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = BODY.split(" ");

  return (
    <section
      ref={ref}
      className="relative z-10 px-6 py-16 md:px-16 md:py-28 md:min-h-[90vh] flex flex-col justify-center"
      style={{ backgroundColor: "#eee9df" }}
    >
      {/* Hearts */}
      <div className="flex justify-center items-center gap-3 mb-12">
        <span style={{ fontSize: "13px", color: "#3a3630" }}>♥</span>
        <span style={{ fontSize: "20px", color: "#3a3630" }}>♥</span>
        <span style={{ fontSize: "13px", color: "#3a3630" }}>♥</span>
      </div>

      <p
        className="max-w-4xl mx-auto text-2xl md:text-4xl leading-relaxed text-center"
        style={{ fontFamily: "Clearface, serif" }}
      >
        {words.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          >
            {word}
          </Word>
        ))}
      </p>
    </section>
  );
}
