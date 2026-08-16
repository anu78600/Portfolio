"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Copy-to-clipboard for the email address.
 *
 * Small, but it removes the one genuinely annoying step in the contact flow for
 * anyone who does not use a desktop mail client — which is most recruiters,
 * working out of a browser-based inbox.
 *
 * The confirmation is announced politely for screen readers rather than only
 * shown as a label change.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <>
      <Button
        variant="secondary"
        icon={copied ? "check" : "copy"}
        iconPosition="leading"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
          } catch {
            // Clipboard blocked (insecure context or denied permission) — the
            // address is visible next to this button, so nothing is lost.
          }
        }}
      >
        {copied ? "Copied" : "Copy address"}
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </>
  );
}
