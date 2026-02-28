import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Loader2,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface JobRequest {
  id: string;
  title: string;
  status: "Submitted" | "In Progress" | "Completed" | "Cancelled";
  createdAt: string;
  requirements: string;
}

const mockRequests: JobRequest[] = [
  {
    id: "r1",
    title: "Urgently seeking Life Sciences teacher",
    status: "In Progress",
    createdAt: "10 Jan 2025",
    requirements:
      "Senior phase Life Sciences teacher needed for immediate start. Must have CAPS curriculum experience and minimum 5 years.",
  },
  {
    id: "r2",
    title: "Foundation Phase specialist needed",
    status: "Completed",
    createdAt: "5 Dec 2024",
    requirements:
      "Experienced Foundation Phase teacher for Grade 1-2. Montessori experience preferred.",
  },
];

const statusStyles: Record<string, string> = {
  Submitted: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function ClientHireRequest() {
  const [requests, setRequests] = useState<JobRequest[]>(mockRequests);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subject: "",
    grade: "",
    startDate: "",
    employmentType: "Full-Time",
    requirements: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.requirements.trim()) {
      toast.error("Please describe your requirements");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setRequests((prev) => [
      {
        id: `r_${Date.now()}`,
        title: form.title || `${form.subject || "Teacher"} needed`,
        status: "Submitted",
        createdAt: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        requirements: form.requirements,
      },
      ...prev,
    ]);
    setForm({
      title: "",
      subject: "",
      grade: "",
      startDate: "",
      employmentType: "Full-Time",
      requirements: "",
    });
    setSubmitting(false);
    toast.success(
      "Recruitment request submitted! Our team will be in touch within 24 hours.",
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Assign Agency to Recruit
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Let our experienced team find and present the best candidates for your
          vacancy
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="font-semibold text-foreground mb-5">
              New Recruitment Request
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Request Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="e.g. Urgently seeking Maths teacher"
                  className="mt-1.5"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Subject Needed</Label>
                  <Input
                    value={form.subject}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, subject: e.target.value }))
                    }
                    placeholder="e.g. Mathematics"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Grade Level</Label>
                  <Input
                    value={form.grade}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, grade: e.target.value }))
                    }
                    placeholder="e.g. Grade 10-12"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, startDate: e.target.value }))
                    }
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Employment Type</Label>
                  <Select
                    value={form.employmentType}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, employmentType: v }))
                    }
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-Time">Full-Time</SelectItem>
                      <SelectItem value="Part-Time">Part-Time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Substitute">
                        Substitute / Supply
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="requirements">Detailed Requirements *</Label>
                <Textarea
                  id="requirements"
                  value={form.requirements}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, requirements: e.target.value }))
                  }
                  placeholder="Describe qualifications, experience level, curriculum preferences, special requirements, salary budget, and any other relevant information..."
                  className="mt-1.5 min-h-[140px]"
                  required
                />
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  Our team will search our existing candidate database first. If
                  no suitable match is found, we'll conduct an active talent
                  sourcing campaign and present qualified candidates within{" "}
                  <strong className="text-foreground">5-7 business days</strong>
                  .
                </div>
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full gap-2 h-11 bg-primary text-primary-foreground"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {submitting ? "Submitting..." : "Submit Recruitment Request"}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Process + Existing Requests */}
        <div className="lg:col-span-2 space-y-5">
          {/* Process */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Our Process</h3>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  title: "Database Review",
                  desc: "We search our existing pool first",
                },
                {
                  step: "2",
                  title: "Active Sourcing",
                  desc: "If needed, we advertise externally",
                },
                {
                  step: "3",
                  title: "Candidate Vetting",
                  desc: "Background checks & credential verification",
                },
                {
                  step: "4",
                  title: "Presentation",
                  desc: "Shortlisted candidates presented via platform",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-3 items-start">
                  <div className="h-6 w-6 bg-primary text-primary-foreground rounded-full text-xs font-bold flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {s.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Existing Requests */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">
              Your Requests ({requests.length})
            </h3>
            <div className="space-y-3">
              {requests.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                  className="p-3 rounded-lg border border-border bg-muted/20"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="text-sm font-medium text-foreground leading-tight">
                      {req.title}
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 ${statusStyles[req.status]}`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {req.createdAt}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
