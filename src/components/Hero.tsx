import { useState } from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/IMG_6313.JPG";

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const [ready, setReady] = useState(false);

  return (
    <section className="sticky top-0 h-[85vh] md:h-screen overflow-hidden">
      {/* Cream wipe overlay — slides down once image is loaded */}
      <motion.div
        className="absolute inset-0 z-30"
        style={{ backgroundColor: "#eee9df" }}
        initial={{ y: 0 }}
        animate={{ y: ready ? "100%" : 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />

      {/* Background image — portrait rotated to landscape */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="hero-image"
        onLoad={() => setReady(true)}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100vh",
          height: "100vw",
          objectFit: "cover",
          transform: "translate(-50%, -50%) rotate(-90deg) scaleY(-1)",
        }}
      />
      {/* Gradient overlay — dark at bottom, transparent at top */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        }}
      />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-end md:justify-between px-6 md:px-10 py-5 md:py-7 z-20">
        <div className="hidden md:flex gap-8">
          {["Location", "The Day", "FAQ"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="text-sm tracking-wide transition-colors"
              style={{ color: "#faecda", fontFamily: "sans-serif" }}
            >
              {link}
            </a>
          ))}
        </div>
        <a
          href="#rsvp"
          className="bg-[#faecda] text-[#215313] text-sm px-5 py-2 rounded-full hover:bg-white/90 transition-colors cursor-pointer"
          style={{ fontFamily: "sans-serif" }}
        >
          I'll be there!
        </a>
      </nav>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-10 pb-6 z-20">
        {/* Desktop: subtitle sits above h1 */}
        <motion.div
          className="hidden md:flex justify-between items-end -mb-6 px-4"
          variants={fadeUp}
          initial="initial"
          animate={ready ? "animate" : "initial"}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.85 }}
        >
          <span
            className="text-md tracking-wide"
            style={{ fontFamily: "sans-serif", color: "#faecda" }}
          >
            We're getting married!
          </span>
          <span
            className="text-smd tracking-wide"
            style={{ fontFamily: "sans-serif", color: "#faecda" }}
          >
            Sunday, November 22, 2026
          </span>
        </motion.div>

        <motion.h1
          className="hero-title text-[#faecda] leading-none md:whitespace-nowrap"
          style={{
            fontFamily: "Clearface, serif",
            fontSize: "16.5cqi",
            lineHeight: 1,
          }}
          variants={fadeUp}
          initial="initial"
          animate={ready ? "animate" : "initial"}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
        >
          Meg &amp; Jordan
        </motion.h1>

        {/* Mobile: subtitle sits below h1 */}
        <motion.div
          className="flex flex-col gap-0.5 mt-2 md:hidden"
          variants={fadeUp}
          initial="initial"
          animate={ready ? "animate" : "initial"}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.85 }}
        >
          <span
            className="text-base tracking-wide"
            style={{ fontFamily: "sans-serif", color: "#faecda" }}
          >
            We're getting married!
          </span>
          <span
            className="text-base tracking-wide"
            style={{ fontFamily: "sans-serif", color: "#faecda" }}
          >
            Sunday, November 22, 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
}
