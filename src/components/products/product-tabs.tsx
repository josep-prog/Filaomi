"use client";

import { useState, type ReactNode } from "react";

export function ProductTabs({
  initialTab,
  viewContent,
  requestContent,
}: {
  initialTab: "view" | "request";
  viewContent: ReactNode;
  requestContent: ReactNode;
}) {
  const [tab, setTab] = useState<"view" | "request">(initialTab);

  return (
    <div>
      <div className="flex gap-2 border-b border-stone-200">
        <button
          type="button"
          onClick={() => setTab("view")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors ${
            tab === "view" ? "border-b-2 border-green-800 text-green-800" : "text-stone-500 hover:text-stone-700"
          }`}
        >
          View Details
        </button>
        <button
          type="button"
          onClick={() => setTab("request")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors ${
            tab === "request" ? "border-b-2 border-green-800 text-green-800" : "text-stone-500 hover:text-stone-700"
          }`}
        >
          Request This Product
        </button>
      </div>
      <div className="pt-6">
        <div hidden={tab !== "view"}>{viewContent}</div>
        <div hidden={tab !== "request"}>{requestContent}</div>
      </div>
    </div>
  );
}
