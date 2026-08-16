"use client";

import { Button } from "@/components/ui/Button";

export function PrintButton() {
  return (
    <Button
      variant="secondary"
      size="sm"
      icon="file-text"
      iconPosition="leading"
      onClick={() => window.print()}
    >
      Print
    </Button>
  );
}
