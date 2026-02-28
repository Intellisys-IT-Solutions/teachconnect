import { cn } from "@/lib/utils";

type AvailabilityStatus = "Available" | "Interviewing" | "Placed" | "Inactive";
type JobStatus = "Open" | "Filled" | "Closed";
type ApplicationStatus = "Pending" | "Shortlisted" | "Rejected" | "Hired";

interface BadgeProps {
  className?: string;
}

export function AvailabilityBadge({
  status,
  className,
}: BadgeProps & { status: AvailabilityStatus | string }) {
  // Using design-token-aligned inline styles for vivid OKLCH-based colors
  const styleMap: Record<
    string,
    { bg: string; color: string; dot: string; border: string }
  > = {
    Available: {
      bg: "oklch(0.60 0.18 145 / 0.12)",
      color: "oklch(0.32 0.14 145)",
      dot: "oklch(0.55 0.18 145)",
      border: "oklch(0.60 0.18 145 / 0.30)",
    },
    Interviewing: {
      bg: "oklch(0.78 0.17 65 / 0.14)",
      color: "oklch(0.42 0.12 65)",
      dot: "oklch(0.70 0.16 65)",
      border: "oklch(0.78 0.17 65 / 0.30)",
    },
    Placed: {
      bg: "oklch(0.24 0.09 255 / 0.10)",
      color: "oklch(0.24 0.09 255)",
      dot: "oklch(0.44 0.16 255)",
      border: "oklch(0.24 0.09 255 / 0.25)",
    },
    Inactive: {
      bg: "oklch(0.94 0.008 240)",
      color: "oklch(0.42 0.025 240)",
      dot: "oklch(0.60 0.015 240)",
      border: "oklch(0.87 0.014 240)",
    },
  };

  const s = styleMap[status] || styleMap.Inactive;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border",
        className,
      )}
      style={{
        backgroundColor: s.bg,
        color: s.color,
        borderColor: s.border,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ backgroundColor: s.dot }}
      />
      {status}
    </span>
  );
}

export function JobStatusBadge({
  status,
  className,
}: BadgeProps & { status: JobStatus | string }) {
  const styleMap: Record<
    string,
    { bg: string; color: string; border: string }
  > = {
    Open: {
      bg: "oklch(0.60 0.18 145 / 0.12)",
      color: "oklch(0.32 0.14 145)",
      border: "oklch(0.60 0.18 145 / 0.28)",
    },
    Filled: {
      bg: "oklch(0.24 0.09 255 / 0.10)",
      color: "oklch(0.24 0.09 255)",
      border: "oklch(0.24 0.09 255 / 0.22)",
    },
    Closed: {
      bg: "oklch(0.94 0.008 240)",
      color: "oklch(0.42 0.025 240)",
      border: "oklch(0.87 0.014 240)",
    },
  };
  const s = styleMap[status] || styleMap.Closed;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border",
        className,
      )}
      style={{ backgroundColor: s.bg, color: s.color, borderColor: s.border }}
    >
      {status}
    </span>
  );
}

export function ApplicationStatusBadge({
  status,
  className,
}: BadgeProps & { status: ApplicationStatus | string }) {
  const styleMap: Record<
    string,
    { bg: string; color: string; border: string }
  > = {
    Pending: {
      bg: "oklch(0.78 0.17 65 / 0.14)",
      color: "oklch(0.42 0.12 65)",
      border: "oklch(0.78 0.17 65 / 0.28)",
    },
    Shortlisted: {
      bg: "oklch(0.24 0.09 255 / 0.10)",
      color: "oklch(0.24 0.09 255)",
      border: "oklch(0.24 0.09 255 / 0.22)",
    },
    Rejected: {
      bg: "oklch(0.57 0.22 27 / 0.10)",
      color: "oklch(0.45 0.18 27)",
      border: "oklch(0.57 0.22 27 / 0.25)",
    },
    Hired: {
      bg: "oklch(0.60 0.18 145 / 0.12)",
      color: "oklch(0.32 0.14 145)",
      border: "oklch(0.60 0.18 145 / 0.28)",
    },
  };
  const s = styleMap[status] || styleMap.Pending;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border",
        className,
      )}
      style={{ backgroundColor: s.bg, color: s.color, borderColor: s.border }}
    >
      {status}
    </span>
  );
}

export function TagChip({
  label,
  onRemove,
}: { label: string; onRemove?: () => void }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border"
      style={{
        background: "oklch(0.65 0.18 195 / 0.10)",
        color: "oklch(0.30 0.14 195)",
        borderColor: "oklch(0.65 0.18 195 / 0.22)",
      }}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 hover:text-destructive transition-colors"
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
