"use client";

import { useState, type ReactNode } from "react";

export function Accordion({ items }: { items: { title: string; content: ReactNode; badge?: ReactNode }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-5 py-4 text-left"
            >
              {item.badge}
              <span className="flex-1 font-semibold text-stone-900">{item.title}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-stone-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm text-stone-600">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
