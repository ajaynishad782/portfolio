"use client";

import { useState, type FormEvent } from "react";
import { Mail, Send, MapPin } from "lucide-react";
import { portfolio, isSet } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import SocialLinks from "@/components/SocialLinks";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  const { personal } = portfolio;
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  // Honeypot: hidden field real users never fill. Bots that auto-fill it are
  // silently dropped by the server.
  const [company, setCompany] = useState("");

  function validate(): Errors {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Please enter your name.";
    if (!values.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Please enter a valid email address.";
    if (!values.message.trim()) e.message = "Please enter a message.";
    return e;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    setFormError(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.errors) setErrors(data.errors as Errors);
        setFormError(
          data?.error ??
            "Something went wrong sending your message. Please try again.",
        );
        return;
      }

      setSubmitted(true);
      setValues({ name: "", email: "", message: "" });
    } catch {
      setFormError(
        "Network error — please check your connection and try again.",
      );
    } finally {
      setSending(false);
    }
  }

  function field(name: keyof typeof values) {
    return {
      value: values[name],
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => setValues((v) => ({ ...v, [name]: e.target.value })),
      "aria-invalid": !!errors[name],
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
      className:
        "mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent",
    };
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Contact"
        title="Let's work together"
        description="Have a project, opportunity, or idea? I'd love to hear about it."
        align="center"
      />

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          {isSet(personal.email) && (
            <a
              href={`mailto:${personal.email}`}
              className="text-foreground/80 hover:text-accent flex items-center gap-3 transition-colors"
            >
              <span className="bg-accent/15 text-accent inline-flex h-10 w-10 items-center justify-center rounded-lg">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              {personal.email}
            </a>
          )}
          {isSet(personal.location) && (
            <p className="text-foreground/80 flex items-center gap-3">
              <span className="bg-accent/15 text-accent inline-flex h-10 w-10 items-center justify-center rounded-lg">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              {personal.location}
            </p>
          )}
          <SocialLinks />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot — hidden from users, visible to bots. */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...field("name")}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...field("email")}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea id="message" rows={5} {...field("message")} />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-500">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="bg-accent text-accent-foreground mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {sending ? "Sending…" : "Send message"}
          </button>

          {formError && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
            >
              {formError}
            </p>
          )}

          {submitted && (
            <p
              role="status"
              className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-500"
            >
              Thanks! Your message has been sent — I&apos;ll get back to you
              soon.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
