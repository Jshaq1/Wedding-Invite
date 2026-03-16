import { useState, useCallback } from "react";

// To add images to the gallery, just drop them into src/assets/gallery/
// They'll be picked up automatically on the next build/dev restart.
const imageModules = import.meta.glob<string>("../assets/gallery/*", {
  eager: true,
  import: "default",
});

const images = Object.values(imageModules);

// Duplicate for seamless loop
const track = [...images, ...images];

export default function GallerySection() {
  const [loadedCount, setLoadedCount] = useState(0);
  const onLoad = useCallback(() => setLoadedCount((n) => n + 1), []);

  // Start animating once at least the first half (originals) are loaded
  const ready = loadedCount >= images.length;

  return (
    <section
      className="relative z-10 py-10 overflow-hidden"
      style={{ backgroundColor: "#eee9df" }}
    >
      <div className={ready ? "flex items-end gap-4 gallery-track" : "flex items-end gap-4"}>
        {track.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="shrink-0 rounded-2xl object-cover"
            style={{ height: "400px", width: "auto" }}
            onLoad={i < images.length ? onLoad : undefined}
          />
        ))}
      </div>
    </section>
  );
}
