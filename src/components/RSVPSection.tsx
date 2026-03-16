import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import rsvpImage from "../assets/gallery/Love.JPG";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

type Guest = {
  name: string;
};

type FormValues = {
  name: string;
  email: string;
  attending: "yes" | "no" | "";
  dietary: string;
  additionalGuests: Guest[];
};

const BG = "#eee9df";
const CARD_BG = "#dfe8db";
const DARK = "#1a1a16";
const MUTED = "#8a8278";
const ACCENT = "#F6CEF5";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        fontFamily: "sans-serif",
        fontSize: "14px",
        color: MUTED,
        display: "block",
        marginBottom: "8px",
      }}
    >
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 16px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: BG,
  fontFamily: "sans-serif",
  fontSize: "16px",
  color: DARK,
  outline: "none",
  boxSizing: "border-box",
};

const errorStyle: React.CSSProperties = {
  fontFamily: "sans-serif",
  fontSize: "12px",
  color: "#c0392b",
  marginTop: "4px",
};

export default function RSVPSection() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      attending: "",
      dietary: "",
      additionalGuests: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalGuests",
  });

  const attending = watch("attending");
  const [submitted, setSubmitted] = useState(false);
  const [attendingResponse, setAttendingResponse] = useState<"yes" | "no" | "">();
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  async function onSubmit(data: FormValues) {
    setSending(true);
    setSendError(false);
    const guestList =
      data.additionalGuests.length > 0
        ? data.additionalGuests.map((g) => g.name).join(", ")
        : "None";
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          guest_name: data.name,
          guest_email: data.email,
          attending: data.attending === "yes" ? "Yes 🎉" : "No 😢",
          additional_guests: guestList,
          dietary: data.dietary || "None",
        },
        EMAILJS_PUBLIC_KEY,
      );
      setAttendingResponse(data.attending);
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <section
        className="relative z-10 px-10 py-10"
        style={{ backgroundColor: BG }}
      >
        <div
          className="rounded-2xl px-10 py-16 flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: CARD_BG, minHeight: "300px" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ fontFamily: "sans-serif", color: MUTED }}
          >
            RSVP
          </p>
          <h2
            className="text-4xl leading-tight"
            style={{ fontFamily: "Clearface, serif", color: DARK }}
          >
            {attendingResponse === "no" ? "Rude but fair enough." : "Thanks, we'll see you there!"}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="relative z-10 px-4 py-4 md:px-10 md:py-10 rsvp-section"
      style={{ backgroundColor: BG, height: "100vh", boxSizing: "border-box" }}
    >
      <div
        className="rounded-2xl flex flex-col md:flex-row overflow-hidden rsvp-card"
        style={{ backgroundColor: CARD_BG, height: "100%" }}
      >
        {/* Image — left on desktop, hidden on mobile */}
        <div className="hidden md:block md:w-[50%] shrink-0 overflow-hidden">
          <img
            src={rsvpImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form — right on desktop, full width on mobile */}
        <div className="w-full md:w-[50%] px-6 py-6 md:px-10 md:py-10 overflow-y-auto">
          {/* RSVP by pill */}
          <div className="mb-4">
            <span
              style={{
                display: "inline-block",
                backgroundColor: ACCENT,
                borderRadius: "999px",
                padding: "4px 14px",
                fontFamily: "sans-serif",
                fontSize: "13px",
                color: DARK,
              }}
            >
              Kindly reply by March 31
            </span>
          </div>

          <h2
            className="text-3xl leading-tight mb-4"
            style={{
              fontFamily: "Clearface, serif",
              color: DARK,
              maxWidth: "680px",
            }}
          >
            Please let us know if you'll be joining us, we hope to see you
            there!
          </h2>

          <p
            className="mb-4"
            style={{ fontFamily: "sans-serif", color: MUTED, fontSize: "14px" }}
          >
            22 Nov, 2026
            <br />@ Perth City Farm, East Perth
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Name + Email row */}
            <div className="flex flex-col gap-6">
              <div style={{ flex: 1 }}>
                <Label>Name</Label>
                <input
                  placeholder="Your name"
                  style={inputStyle}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
              </div>
              <div style={{ flex: 1 }}>
                <Label>Email</Label>
                <input
                  placeholder="name@mail.com"
                  style={inputStyle}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p style={errorStyle}>{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Attending */}
            <div>
              <Label>Will you be attending?</Label>
              <div className="flex gap-3">
                {(["yes", "no"] as const).map((val) => {
                  const selected = attending === val;
                  return (
                    <label
                      key={val}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 20px",
                        borderRadius: "12px",
                        backgroundColor: selected ? "#344A2E" : BG,
                        color: selected ? "#eee9df" : DARK,
                        fontFamily: "sans-serif",
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "background-color 0.15s",
                      }}
                    >
                      <input
                        type="radio"
                        value={val}
                        style={{ display: "none" }}
                        {...register("attending", {
                          required: "Please select an option",
                        })}
                      />
                      {val === "yes" ? "Joyfully accepts" : "Oh, you hate us?"}
                    </label>
                  );
                })}
              </div>
              {errors.attending && (
                <p style={errorStyle}>{errors.attending.message}</p>
              )}
            </div>

            {/* Additional guests — only shown if attending */}
            {attending === "yes" && (
              <div>
                <Label>Additional guests (partner, kids, +1s)</Label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 items-center">
                      <input
                        placeholder={`Guest ${index + 1} name`}
                        style={{ ...inputStyle, flex: 1 }}
                        {...register(`additionalGuests.${index}.name`, {
                          required: "Name is required",
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: MUTED,
                          fontSize: "20px",
                          lineHeight: 1,
                          padding: "4px 8px",
                          flexShrink: 0,
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => append({ name: "" })}
                    style={{
                      alignSelf: "flex-start",
                      padding: "10px 18px",
                      borderRadius: "10px",
                      border: `1.5px dashed ${MUTED}`,
                      background: "none",
                      fontFamily: "sans-serif",
                      fontSize: "13px",
                      color: MUTED,
                      cursor: "pointer",
                    }}
                  >
                    + Add guest
                  </button>
                </div>
              </div>
            )}

            {/* Dietary */}
            <div>
              <Label>
                {attending === "no"
                  ? "Excuses?"
                  : "Dietary notes, allergies, or anything else we should know"}
              </Label>
              <textarea
                placeholder={
                  attending === "no"
                    ? "Excuses..."
                    : "Dietary notes, allergies, or anything else we should know"
                }
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
                {...register("dietary")}
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={sending}
                style={{
                  padding: "14px 32px",
                  borderRadius: "999px",
                  border: "none",
                  backgroundColor: DARK,
                  color: "#eee9df",
                  fontFamily: "sans-serif",
                  fontSize: "15px",
                  cursor: sending ? "not-allowed" : "pointer",
                  opacity: sending ? 0.7 : 1,
                }}
              >
                {sending ? "Sending…" : "Send reply"}
              </button>
              {sendError && (
                <p style={{ ...errorStyle, marginTop: "12px" }}>
                  Something went wrong — please try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
