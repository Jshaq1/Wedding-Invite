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
  return (
    <section
      className="relative z-10 py-10 overflow-hidden"
      style={{ backgroundColor: "#eee9df" }}
    >
      <div className="flex items-end gap-4 gallery-track">
        {track.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="shrink-0 h-100 w-auto rounded-2xl object-cover"
          />
        ))}
      </div>
    </section>
  );
}
