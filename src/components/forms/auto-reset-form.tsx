"use client";

import { useRef, useState, useTransition, type ReactNode } from "react";

export function AutoResetForm({
  action,
  successMessage,
  className,
  encType,
  children,
}: {
  action: (formData: FormData) => Promise<void>;
  successMessage: string;
  className?: string;
  encType?: string;
  children: ReactNode;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      {status === "success" && (
        <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">{successMessage}</p>
      )}
      {status === "error" && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
          {error ?? "Something went wrong. Please try again."}
        </p>
      )}
      <form
        ref={formRef}
        className={className}
        encType={encType}
        action={(formData) => {
          setStatus("idle");
          startTransition(async () => {
            try {
              await action(formData);
              formRef.current?.reset();
              setStatus("success");
            } catch (e) {
              setStatus("error");
              setError(e instanceof Error ? e.message : null);
            }
          });
        }}
      >
        {children}
      </form>
      {isPending && <p className="mt-2 text-xs text-stone-400">Submitting…</p>}
    </div>
  );
}
