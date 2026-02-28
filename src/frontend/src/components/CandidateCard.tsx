import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Briefcase,
  CheckCircle,
  Eye,
  Globe,
  Lock,
} from "lucide-react";
import { motion } from "motion/react";
import type { SampleTeacher } from "../sampleData";
import { AvailabilityBadge, TagChip } from "./Badges";

interface CandidateCardProps {
  teacher: SampleTeacher;
  matchScore?: number;
  showContact?: boolean;
  onRequestContact?: () => void;
  onViewProfile?: () => void;
  index?: number;
}

// Avatar gradient by first letter
function getAvatarStyle(firstLetter: string): { bg: string; text: string } {
  const code = firstLetter.toUpperCase().charCodeAt(0);
  if (code <= 72) {
    // A-H: teal
    return { bg: "oklch(0.65 0.18 195 / 0.18)", text: "oklch(0.35 0.14 195)" };
  }
  if (code <= 82) {
    // I-R: primary
    return { bg: "oklch(0.24 0.09 255 / 0.14)", text: "oklch(0.24 0.09 255)" };
  }
  // S-Z: amber
  return { bg: "oklch(0.78 0.17 65 / 0.18)", text: "oklch(0.50 0.14 65)" };
}

// Left border color based on availability
function getCardBorderAccent(status: string): string {
  switch (status) {
    case "Available":
      return "oklch(0.65 0.18 195)";
    case "Interviewing":
      return "oklch(0.78 0.17 65)";
    case "Placed":
      return "oklch(0.24 0.09 255)";
    default:
      return "oklch(0.42 0.025 240)";
  }
}

export default function CandidateCard({
  teacher,
  matchScore,
  showContact = false,
  onRequestContact,
  onViewProfile,
  index = 0,
}: CandidateCardProps) {
  // Privacy: show first name + last initial only
  const displayName =
    teacher.name.split(" ").length > 1
      ? `${teacher.name.split(" ")[0]} ${teacher.name.split(" ").slice(-1)[0][0]}.`
      : teacher.name;

  const initials = teacher.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarStyle = getAvatarStyle(teacher.name[0] || "A");
  const borderAccentColor = getCardBorderAccent(teacher.availabilityStatus);

  // Determine hover shadow class
  const hoverShadowClass =
    teacher.availabilityStatus === "Available"
      ? "hover:shadow-glow-teal"
      : "hover:shadow-card-hover";

  // Has certifications (rough check)
  const isVerified =
    teacher.certifications && teacher.certifications.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      className={`bg-card border border-border rounded-xl p-5 ${hoverShadowClass} hover:border-border/80 transition-all duration-200 group relative overflow-hidden`}
      style={{ borderLeft: `3px solid ${borderAccentColor}` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback
              className="text-sm font-bold"
              style={{
                backgroundColor: avatarStyle.bg,
                color: avatarStyle.text,
              }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground leading-tight">
                {displayName}
              </span>
              {isVerified && (
                <CheckCircle
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: "oklch(0.65 0.18 195)" }}
                  aria-label="Verified credentials"
                />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <Globe className="h-3 w-3" />
              {teacher.country}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <AvailabilityBadge status={teacher.availabilityStatus} />
          {matchScore !== undefined && (
            <div
              className="text-xs font-bold px-2.5 py-0.5 rounded-full"
              style={
                matchScore >= 80
                  ? {
                      background: "oklch(0.65 0.18 195 / 0.12)",
                      color: "oklch(0.30 0.14 195)",
                    }
                  : matchScore >= 50
                    ? {
                        background: "oklch(0.78 0.17 65 / 0.15)",
                        color: "oklch(0.45 0.12 65)",
                      }
                    : {
                        background: "oklch(0.94 0.008 240)",
                        color: "oklch(0.42 0.025 240)",
                      }
              }
            >
              {matchScore}% match
            </div>
          )}
        </div>
      </div>

      {/* Subjects */}
      <div className="mb-2">
        <div className="flex items-center gap-1.5 mb-1.5">
          <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Subjects
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {teacher.subjects.slice(0, 4).map((s) => (
            <TagChip key={s} label={s} />
          ))}
          {teacher.subjects.length > 4 && (
            <span className="text-xs text-muted-foreground self-center">
              +{teacher.subjects.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Grades */}
      <div className="mb-3">
        <div className="flex flex-wrap gap-1">
          {teacher.grades.slice(0, 4).map((g) => (
            <span
              key={g}
              className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium"
              style={{
                background: "oklch(0.65 0.18 195 / 0.08)",
                color: "oklch(0.35 0.12 195)",
              }}
            >
              {g}
            </span>
          ))}
          {teacher.grades.length > 4 && (
            <span className="text-xs text-muted-foreground self-center">
              +{teacher.grades.length - 4} grades
            </span>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-1">
          <Briefcase className="h-3.5 w-3.5" />
          <span>{teacher.yearsExperience} yrs exp</span>
        </div>
        <div>{teacher.employmentType}</div>
        <div className="flex items-center gap-1">
          {showContact ? (
            <span
              className="font-semibold"
              style={{ color: "oklch(0.50 0.14 145)" }}
            >
              Contact visible
            </span>
          ) : (
            <>
              <Lock className="h-3 w-3" />
              <span>Contact hidden</span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 text-xs hover:border-primary/40"
          onClick={onViewProfile}
        >
          <Eye className="h-3.5 w-3.5 mr-1" />
          Preview
        </Button>
        {!showContact && (
          <Button
            size="sm"
            className="flex-1 text-xs"
            style={{
              backgroundColor: "oklch(0.24 0.09 255)",
              color: "oklch(0.98 0 0)",
            }}
            onClick={onRequestContact}
          >
            Request Contact
          </Button>
        )}
      </div>
    </motion.div>
  );
}
