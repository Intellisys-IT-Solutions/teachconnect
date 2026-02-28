import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Building2, Loader2, MapPin, Plus, Users, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { JobStatusBadge, TagChip } from "../../components/Badges";
import { sampleJobListings } from "../../sampleData";

export default function ClientJobs() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [jobs, setJobs] = useState(sampleJobListings.slice(0, 3));

  const [form, setForm] = useState({
    title: "",
    region: "",
    country: "",
    schoolType: "Private Independent",
    roleOverview: "",
    subjects: "",
    grades: "",
    salaryRange: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.region) {
      toast.error("Please fill required fields");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setJobs((prev) => [
      {
        id: `j_${Date.now()}`,
        title: form.title,
        region: form.region,
        country: form.country,
        schoolType: form.schoolType as any,
        roleOverview: form.roleOverview,
        subjectsNeeded: form.subjects
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        gradesNeeded: form.grades
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean),
        status: "Open" as const,
        salaryRange: form.salaryRange || undefined,
      },
      ...prev,
    ]);
    setSaving(false);
    setOpen(false);
    setForm({
      title: "",
      region: "",
      country: "",
      schoolType: "Private Independent",
      roleOverview: "",
      subjects: "",
      grades: "",
      salaryRange: "",
    });
    toast.success("Job listing created!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            My Job Listings
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage your open positions and view applicants
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary text-primary-foreground">
              <Plus className="h-4 w-4" /> Create Listing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Create Job Listing</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label>Job Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="e.g. Senior Mathematics Teacher"
                  className="mt-1.5"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Region / Area *</Label>
                  <Input
                    value={form.region}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, region: e.target.value }))
                    }
                    placeholder="e.g. Johannesburg North"
                    className="mt-1.5"
                    required
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    value={form.country}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, country: e.target.value }))
                    }
                    placeholder="South Africa"
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div>
                <Label>School Type</Label>
                <Select
                  value={form.schoolType}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, schoolType: v }))
                  }
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private Independent">
                      Private Independent
                    </SelectItem>
                    <SelectItem value="International School">
                      International School
                    </SelectItem>
                    <SelectItem value="International Baccalaureate">
                      International Baccalaureate
                    </SelectItem>
                    <SelectItem value="Independent School">
                      Independent School
                    </SelectItem>
                    <SelectItem value="Private School">
                      Private School
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Role Overview</Label>
                <Textarea
                  value={form.roleOverview}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, roleOverview: e.target.value }))
                  }
                  placeholder="Describe the role, requirements, and expectations..."
                  className="mt-1.5 min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Subjects Needed</Label>
                  <Input
                    value={form.subjects}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, subjects: e.target.value }))
                    }
                    placeholder="Maths, Physics (comma-separated)"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Grade Levels</Label>
                  <Input
                    value={form.grades}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, grades: e.target.value }))
                    }
                    placeholder="Grade 10, 11, 12"
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div>
                <Label>Salary Range (optional)</Label>
                <Input
                  value={form.salaryRange}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, salaryRange: e.target.value }))
                  }
                  placeholder="e.g. R35,000 – R45,000/month"
                  className="mt-1.5"
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="gap-2 bg-primary text-primary-foreground"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? "Creating..." : "Create Listing"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Jobs list */}
      <div className="space-y-4">
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.region}, {job.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {job.schoolType}
                  </span>
                  {job.salaryRange && (
                    <span className="text-primary font-medium">
                      {job.salaryRange}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                  <Users className="h-3.5 w-3.5" />
                  {Math.floor(Math.random() * 8) + 1} applicants
                </div>
                <JobStatusBadge status={job.status} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {job.roleOverview}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {job.subjectsNeeded.map((s) => (
                <TagChip key={s} label={s} />
              ))}
              {job.gradesNeeded.slice(0, 4).map((g) => (
                <span
                  key={g}
                  className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground"
                >
                  {g}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                View Applicants
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                Edit
              </Button>
              {job.status === "Open" && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  Close Listing
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
