import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import MegDrink from "../assets/MegDrink.jpg";
import Love from "../assets/gallery/Rome.jpg";
import JordanSpeech from "../assets/JordanSpeech.jpeg";
import Dancing from "../assets/Dancing.mp4";

const events = [
  {
    time: "4:00pm",
    title: "Welcome Drinks",
    note: "Snake an ice cold bromin",
    image: MegDrink,
  },
  { time: "4:30pm", title: "Ceremony", note: "Couple of beans", image: Love },
  {
    time: "5:30pm",
    title: "Dinner & Speeches",
    note: "Pizza and Embarrassment",
    image: JordanSpeech,
  },
  {
    time: "Late",
    title: "Dancing",
    note: "Till our socks got holes",
    image: Dancing,
  },
];

// When each event activates as a fraction of scroll progress
const THRESHOLDS = [0.05, 0.35, 0.65, 0.92];

const LINE_LEFT = 140; // px — where the vertical line sits in the right column

function EventRow({
  event,
  progress,
  threshold,
}: {
  event: (typeof events)[0];
  progress: MotionValue<number>;
  threshold: number;
}) {
  const scale = useTransform(
    progress,
    [threshold - 0.02, threshold, threshold + 0.06],
    [1, 1.08, 1.03],
  );

  return (
    <div className="relative mb-12 md:mb-24">
      {/* Time badge — centered on the line, acts as the dot */}
      <div
        className="schedule-badge"
        style={{
          position: "absolute",
          left: LINE_LEFT,
          top: 0,
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <motion.span
          style={{
            scale,
            display: "inline-block",
            fontFamily: "sans-serif",
            fontSize: "13px",
            backgroundColor: "#F6CEF5",
            color: "#344A2E",
            padding: "5px 14px",
            borderRadius: "999px",
            whiteSpace: "nowrap",
          }}
        >
          {event.time}
        </motion.span>
      </div>

      {/* Content — padded left to clear the badge */}
      <div
        className="schedule-content"
        style={{ paddingLeft: `${LINE_LEFT + 70}px` }}
      >
        <h3
          className="text-2xl leading-tight"
          style={{ fontFamily: "Clearface, serif", color: "#1a1a16" }}
        >
          {event.title}
        </h3>
        {event.note && (
          <p
            className="text-sm mt-1"
            style={{ fontFamily: "sans-serif", color: "#8a8278" }}
          >
            {event.note}
          </p>
        )}
        {/* Photo */}
        <motion.div
          style={{
            scale,
            transformOrigin: "top left",
            width: "100%",
            height: "250px",
            marginTop: "16px",
            borderRadius: "8px",
            overflow: "hidden",
            border: event.image ? "none" : "1.5px dashed #c5bfb5",
            backgroundColor: event.image ? "transparent" : "#e5dfd4",
          }}
        >
          {event.image &&
            (event.image.endsWith(".mp4") ? (
              <video
                src={event.image}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <img
                src={event.image}
                alt={event.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function ScheduleSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="the-day"
      className="relative z-10 px-6 py-16 md:px-16 md:py-28"
      style={{ backgroundColor: "#eee9df" }}
    >
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 max-w-6xl">
        {/* Left — description, sticky within the section */}
        <div className="w-full md:w-7/12 pt-2 self-start md:sticky top-16">
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ fontFamily: "sans-serif", color: "#8a8278" }}
          >
            The Day
          </p>
          <p
            className="text-2xl md:text-4xl leading-snug"
            style={{ fontFamily: "Clearface, serif", color: "#1a1a16" }}
          >
            Join us for a day full of love, laughter, dancing, and a small
            amount of autism. We can't wait to celebrate with you!
          </p>
        </div>

        {/* Right — timeline */}
        <div className="w-full md:w-5/12 relative">
          {/* Background line (faint) */}
          <div
            className="absolute top-0 bottom-0 w-px schedule-line"
            style={{ left: LINE_LEFT, backgroundColor: "#f0cfd0" }}
          />
          {/* Animated fill line */}
          <motion.div
            className="absolute top-0 origin-top schedule-fill-line"
            style={{
              width: "5px",
              left: LINE_LEFT - 2,
              bottom: 0,
              backgroundColor: "#F6CEF5",
              scaleY: lineScaleY,
            }}
          />
          {/* End cap circle */}
          <div
            className="absolute rounded-full schedule-end-cap"
            style={{
              left: LINE_LEFT,
              bottom: 0,
              width: "8px",
              height: "8px",
              backgroundColor: "#f0cfd0",
              transform: "translateX(-50%)",
            }}
          />

          {events.map((event, i) => (
            <EventRow
              key={event.time}
              event={event}
              progress={scrollYProgress}
              threshold={THRESHOLDS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
