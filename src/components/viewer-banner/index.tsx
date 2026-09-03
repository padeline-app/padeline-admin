"use client";

import { useState } from "react";
import { XIcon } from "@phosphor-icons/react";
import { useAdminAuth } from "@/lib/firebase/admin-auth";
import { ROLE_HINTS } from "@/components/role-badge";

export function ViewerBanner() {
  const { user } = useAdminAuth();
  const [dismissed, setDismissed] = useState(false);

  if (user?.role !== "VIEWER" || dismissed) return null;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-warning/30 bg-warning/10 px-6 py-2.5 text-sm text-warning">
      <p>
        You have {ROLE_HINTS.VIEWER.toLowerCase()}.
      </p>
      <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss">
        <XIcon size={16} />
      </button>
    </div>
  );
}
