const CARD_BG = "#344A2E";
const CARD_TEXT = "#eee9df";
const CARD_MUTED = "#8aaa84";

function FAQCard({
  label,
  heading,
  body,
  detail,
  size = "small",
  gridArea,
}: {
  label: string;
  heading: string;
  body: string;
  detail?: string;
  size?: "small" | "medium" | "large";
  gridArea?: string;
}) {
  const padding =
    size === "large" ? "40px" : size === "medium" ? "32px" : "28px";
  const headingSize =
    size === "large" ? "40px" : size === "medium" ? "28px" : "22px";
  const bodySize = size === "large" ? "17px" : "14px";
  const marginBottom =
    size === "large" ? "32px" : size === "medium" ? "20px" : "14px";

  return (
    <div
      style={{
        backgroundColor: CARD_BG,
        borderRadius: "16px",
        padding,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        gridArea,
      }}
    >
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: CARD_MUTED,
          marginBottom: "4px",
        }}
      >
        {label}
      </p>
      <h3
        style={{
          fontFamily: "Clearface, serif",
          fontSize: headingSize,
          color: CARD_TEXT,
          lineHeight: 1.15,
          marginBottom,
        }}
      >
        {heading}
      </h3>
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: bodySize,
          color: CARD_MUTED,
          lineHeight: 1.65,
        }}
      >
        {body}
      </p>
      {detail && (
        <p
          style={{
            fontFamily: "Clearface, serif",
            fontSize: "16px",
            color: CARD_TEXT,
            marginTop: "12px",
          }}
        >
          {detail}
        </p>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="relative z-10 px-4 py-6 md:px-10"
      style={{ backgroundColor: "#eee9df" }}
    >
      <div
        className="faq-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto auto",
          gridTemplateAreas: `
            "gifts dress food"
            "gifts plus  food"
          `,
          gap: "16px",
        }}
      >
        {/* Large — Gifts: spans both rows */}
        <FAQCard
          label="Wedding Gifts"
          heading="Your presence is enough"
          body="Truly. We're just happy to celebrate with you. If you'd still like to give something, we will have a wishing well at the reception for any cards or small gifts."
          size="large"
          gridArea="gifts"
        />

        {/* Small — Dress Code */}
        <FAQCard
          label="Dress Code"
          heading="Cocktail with colour"
          body="Dress in something you feel comfortable and festive in. Think cocktail but with some colour and personality!"
          size="small"
          gridArea="dress"
        />

        {/* Small — Plus One */}
        <FAQCard
          label="Plus Ones"
          heading="We're keeping it intimate"
          body="We're keeping it casual which means no sit down dinner, so likely yes, but give us a shout first. We are reasonably poor after all."
          size="small"
          gridArea="plus"
        />

        {/* Medium — Food: spans both rows */}
        <FAQCard
          label="Food & Drinks"
          heading="Yes — we'll feed you"
          body="Food and drinks will be provided throughout the day. We're serving pizza/pialla for dinner and there'll be plenty of beer and wine to go around. The venue is also BYO so if you're fussy bring all the spirits you like."
          size="medium"
          gridArea="food"
        />
      </div>
    </section>
  );
}
