"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

/* ─── Types ───────────────────────────────────────────────────────────────── */
interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

/* ─── FAQ Data ────────────────────────────────────────────────────────────── */
const FAQS: FaqItem[] = [
  {
    category: "Getting Started",
    question: "What is an AI agent? How is it different from a chatbot?",
    answer:
      "A chatbot only replies when someone asks a question. An AI agent works for you automatically in the background — 24/7. It handles tasks like responding to leads, tracking activity, and managing your workflow without you needing to do anything manually.",
  },
  {
    category: "Getting Started",
    question: "How quickly can I start using this?",
    answer:
      "You can get started very quickly. Just add your properties and basic details, and your AI tools will start working for you. Most users are up and running within a day.",
  },
  {
    category: "Agents",
    question: "Do I need to choose which AI tools to use?",
    answer:
      "No, everything works together for you. All tools share the same information so you don’t have to manage anything manually.",
  },
  {
    category: "Agents",
    question: "Will the AI take actions on its own?",
    answer:
      "You are always in control. The AI can suggest actions, assist you, or work automatically based on your settings. You decide how much control you want to give.",
  },
  {
    category: "Agents",
    question: "How accurate is the AI?",
    answer:
      "The system is highly reliable and improves over time. If something is unclear, it will ask or notify you instead of making a wrong decision.",
  },
  {
    category: "Data & Security",
    question: "Is my data safe?",
    answer:
      "Yes, your data is fully secure and only accessible to you and your team. We use strong security measures to keep everything protected.",
  },
  {
    category: "Data & Security",
    question: "Does this work for Indian real estate?",
    answer:
      "Yes, the system is designed to support Indian property workflows and common document formats used in real estate.",
  },
  {
    category: "Pricing",
    question: "Are there any hidden charges?",
    answer:
      "No, there are no hidden fees. You only pay for your plan — everything is included.",
  },
  {
    category: "Pricing",
    question: "Can I try it before paying?",
    answer:
      "Yes, you can try it for free and see how it works before making any payment.",
  },
  {
    category: "Integration",
    question: "Can I connect this with my existing tools?",
    answer:
      "Yes, it works with popular tools and platforms, and you can also connect your own systems if needed.",
  },
  {
    category: "Support",
    question: "What if I need help?",
    answer:
      "Our support team is always available to help you with setup, questions, or anything else you need.",
  },
];

/* ─── FaqSection Component ────────────────────────────────────────────────── */
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number): void => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative overflow-hidden py-24">

      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: "var(--color-primary-200)" }}
      />
      <div
        className="pointer-events-none absolute bottom-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: "var(--color-primary-300)" }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: "var(--color-primary-600)" }}
          >
            <HelpCircle className="w-8 h-8 text-white" />
          </div>

          {/* Live agent badge */}
          {/* <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-[0.12em] uppercase mb-4 ml-2"
            style={{
              background: "var(--color-primary-50)",
              border: "1px solid var(--color-primary-200)",
              color: "var(--color-primary-600)",
            }}
          >
            <span className="relative inline-flex w-2 h-2">
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-60"
                style={{ background: "var(--color-primary-600)" }}
              />
              <span
                className="relative rounded-full w-2 h-2"
                style={{ background: "var(--color-primary-600)" }}
              />
            </span>
            AI Agents · Live Support
          </div> */}

          <h2
            className="text-4xl font-bold mb-4 block"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently Asked Questions
          </h2>

          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
           Everything you need to know about how our AI helps you manage leads, properties, and clients more easily.
          </p>
        </div>

        {/* ── FAQ Items ── */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "var(--bg-primary)",
                  border: isOpen
                    ? "1px solid var(--color-primary-300)"
                    : "1px solid var(--border-light)",
                  boxShadow: isOpen
                    ? "0 4px 24px rgba(0,102,204,0.10)"
                    : "0 1px 6px rgba(0,60,120,0.05)",
                }}
              >
                {/* Question button */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-4 md:p-6 lg:p-8 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">

                      {/* Number bubble */}
                      <span
                        className="flex items-center justify-center min-w-8 min-h-8 w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 flex-shrink-0"
                        style={{
                          backgroundColor: isOpen
                            ? "var(--color-primary-600)"
                            : "var(--color-primary-100)",
                          color: isOpen
                            ? "#ffffff"
                            : "var(--color-primary-600)",
                        }}
                      >
                        {index + 1}
                      </span>

                      {/* Category tag */}
                      <span
                        className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{
                          background: isOpen
                            ? "var(--color-primary-100)"
                            : "var(--color-primary-50)",
                          color: "var(--color-primary-600)",
                        }}
                      >
                        {faq.category}
                      </span>
                    </div>

                    <h3
                      className="text-sm md:text-base lg:text-lg font-bold transition-colors duration-300 mt-2 pl-11"
                      style={{
                        color: isOpen
                          ? "var(--color-primary-600)"
                          : "var(--text-primary)",
                      }}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* Chevron */}
                  <div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 mt-1"
                    style={{
                      backgroundColor: isOpen
                        ? "var(--color-primary-100)"
                        : "var(--bg-tertiary, #f0f6ff)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown
                      className="w-5 h-5"
                      style={{
                        color: isOpen
                          ? "var(--color-primary-600)"
                          : "var(--text-secondary)",
                      }}
                    />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? "480px" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div
                      className="pl-6 pt-2 border-l-4 ml-11"
                      style={{ borderColor: "var(--color-primary-200)" }}
                    >
                      <p
                        className="leading-relaxed text-base md:text-lg"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA strip ── */}
        <div
          className="mt-12 text-center rounded-2xl p-8 md:p-10 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary-700), var(--color-primary-600), var(--color-primary-500))",
            boxShadow: "0 8px 40px rgba(0,102,204,0.25)",
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="relative">
            {/* Pinging badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              <span className="relative inline-flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-70" />
                <span className="relative rounded-full bg-white w-2 h-2" />
              </span>
              We usually reply within a few hours
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Still have questions?
            </h3>

            <p className="text-white/80 mb-6 text-lg">
             Our team is here to help you understand everything — whether you want a quick demo or just have a few questions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                className="bg-white font-bold px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg text-sm"
                style={{ color: "var(--color-primary-600)" }}
              >
                Contact Us
              </button>
              <button
                type="button"
                className="bg-white/10 border border-white/25 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
              >
                Book a Free Demo
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}