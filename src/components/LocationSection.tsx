import locationImage from "../assets/Good-entryway.jpg";

function RotatingBadge() {
  const text = "WHERE WE WED • ";
  const radius = 44;
  const cx = 60;
  const cy = 60;
  const pathId = "badge-circle";

  return (
    <div
      style={{
        position: "relative",
        width: "125px",
        height: "125px",
        flexShrink: 0,
      }}
    >
      {/* Pink background circle */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          backgroundColor: "#F6CEF5",
        }}
      />

      {/* Rotating text */}
      <svg
        width="125"
        height="125"
        viewBox="0 0 120 120"
        className="spin-slow"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <path
            id={pathId}
            d={`M ${cx},${cy} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          fontSize="12"
          fill="#344A2E"
          fontFamily="sans-serif"
          letterSpacing="1.8"
        >
          <textPath href={`#${pathId}`}>{text.repeat(2)}</textPath>
        </text>
      </svg>

      {/* Map pin icon — static, centered */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            fill="#344A2E"
          />
          <circle cx="12" cy="9" r="2.5" fill="#F6CEF5" />
        </svg>
      </div>
    </div>
  );
}

export default function LocationSection() {
  return (
    <section
      className="relative z-10 px-4 pt-4 md:px-10 md:pt-10"
      style={{ backgroundColor: "#eee9df" }}
    >
      <div
        className="flex flex-col md:flex-row rounded-2xl overflow-hidden"
        style={{ backgroundColor: "#dfe8db" }}
      >
        {/* Left — text content */}
        <div className="w-full md:w-[50%] px-6 py-6 md:px-8 md:py-8 flex flex-col justify-between">
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ fontFamily: "sans-serif", color: "#8a8278" }}
            >
              Location
            </p>
            <h2
              className="text-3xl md:text-4xl leading-tight mb-8 md:mb-16"
              style={{ fontFamily: "Clearface, serif", color: "#1a1a16" }}
            >
              We'll be getting married at Perth City Farm.
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <p
                className="mb-1"
                style={{
                  fontFamily: "Clearface, serif",
                  color: "#1a1a16",
                  fontSize: "18px",
                }}
              >
                • Address
              </p>
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: "sans-serif",
                  color: "#5a5550",
                  fontSize: "14px",
                }}
              >
                1 City Farm Pl
                <br />
                East Perth WA 6004
              </p>
              <a
                href="https://maps.app.goo.gl/oN4VHLfV8m9An7269"
                className="underline mt-2 inline-block"
                target="_blank"
                style={{
                  fontFamily: "sans-serif",
                  color: "#1a1a16",
                  fontSize: "14px",
                }}
              >
                Google Maps Directions
              </a>
            </div>

            <div>
              <p
                className="mb-1"
                style={{
                  fontFamily: "Clearface, serif",
                  color: "#1a1a16",
                  fontSize: "18px",
                }}
              >
                • By Car
              </p>
              <p
                style={{
                  fontFamily: "sans-serif",
                  color: "#5a5550",
                  fontSize: "14px",
                }}
              >
                Street parking is available around the venue. There are also
                public parking areas within walking distance.
              </p>
            </div>

            <div>
              <p
                className="mb-1"
                style={{
                  fontFamily: "Clearface, serif",
                  color: "#1a1a16",
                  fontSize: "18px",
                }}
              >
                • By Train
              </p>
              <p
                style={{
                  fontFamily: "sans-serif",
                  color: "#5a5550",
                  fontSize: "14px",
                }}
              >
                Take the train Claisbrook, then it's a short walk to the venue.
              </p>
            </div>
          </div>
        </div>

        {/* Right — photo + badge */}
        <div className="w-full md:w-[50%] relative py-4 px-4 md:py-8 md:pr-8 md:pl-0">
          {/* Photo */}
          <img
            src={locationImage}
            alt="Venue"
            className="w-full h-full rounded-2xl object-cover"
            style={{ minHeight: "360px" }}
          />

          {/* Rotating badge */}
          <div
            className="location-badge"
            style={{
              position: "absolute",
              left: "-60px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
            }}
          >
            <RotatingBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
