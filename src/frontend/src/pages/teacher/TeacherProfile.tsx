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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import TagInput from "../../components/TagInput";
import { useGetCallerUserProfile } from "../../hooks/useQueries";

const SUBJECTS = [
  "Mathematics",
  "Further Mathematics",
  "English",
  "Literature",
  "Life Sciences",
  "Biology",
  "Chemistry",
  "Physics",
  "Physical Sciences",
  "Social Sciences",
  "History",
  "Geography",
  "Computer Science",
  "Information Technology",
  "French",
  "Arabic",
  "Afrikaans",
  "German",
  "Business Studies",
  "Economics",
  "Accounting",
  "Physical Education",
  "Life Orientation",
  "Art",
  "Music",
  "Drama",
  "Foundation Phase",
  "Environmental Science",
];

const GRADES = [
  "Grade R",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

const QUALIFICATIONS = [
  "B.Ed",
  "PGCE",
  "BA Education",
  "BSc",
  "MSc",
  "MA",
  "BEd Foundation Phase",
  "BEd Intermediate Phase",
  "BEd Senior Phase",
  "HDE",
  "MEd",
];

const CERTIFICATIONS = [
  "SAFE Certificate",
  "TEFL",
  "CELTA",
  "IB Examiner",
  "Cambridge Educator",
  "Montessori Level 1",
  "Montessori Level 2",
  "IB PYP Certificate",
  "Google Certified Educator",
  "Microsoft Educator",
  "First Aid Level 3",
];

interface EmploymentEntry {
  employer: string;
  role: string;
  startYear: string;
  endYear: string;
  current: boolean;
}

export default function TeacherProfile() {
  const { data: userProfile } = useGetCallerUserProfile();
  const [saving, setSaving] = useState(false);

  const [subjects, setSubjects] = useState<string[]>([
    "Mathematics",
    "Physics",
  ]);
  const [grades, setGrades] = useState<string[]>([
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ]);
  const [qualifications, setQualifications] = useState<string[]>([
    "BSc Mathematics",
    "PGCE",
  ]);
  const [certifications, setCertifications] = useState<string[]>([
    "SAFE Certificate",
  ]);

  const [personalInfo, setPersonalInfo] = useState({
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    phone: "",
    nationality: "",
    country: "",
    workPermitStatus: "Citizen",
    employmentType: "Full-Time",
    availabilityStatus: "Available",
    teachingPhilosophy: "",
  });

  const [employmentHistory, setEmploymentHistory] = useState<EmploymentEntry[]>(
    [{ employer: "", role: "", startYear: "", endYear: "", current: false }],
  );

  const addEmployment = () => {
    setEmploymentHistory([
      ...employmentHistory,
      { employer: "", role: "", startYear: "", endYear: "", current: false },
    ]);
  };

  const removeEmployment = (index: number) => {
    setEmploymentHistory(employmentHistory.filter((_, i) => i !== index));
  };

  const updateEmployment = (
    index: number,
    field: keyof EmploymentEntry,
    value: string | boolean,
  ) => {
    setEmploymentHistory((prev) =>
      prev.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry,
      ),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast.success("Profile saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            My Profile
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Complete your profile to appear in school searches
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="teaching">Teaching</TabsTrigger>
          <TabsTrigger value="history">Experience</TabsTrigger>
          <TabsTrigger value="work-eligibility">Eligibility</TabsTrigger>
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="personal">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-xl p-6 space-y-4"
          >
            <h2 className="font-semibold text-foreground">
              Personal Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={personalInfo.name}
                  onChange={(e) =>
                    setPersonalInfo((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) =>
                    setPersonalInfo((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) =>
                    setPersonalInfo((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+27 82 xxx xxxx"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={personalInfo.nationality}
                  onChange={(e) =>
                    setPersonalInfo((p) => ({
                      ...p,
                      nationality: e.target.value,
                    }))
                  }
                  placeholder="e.g. South African"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="country">Country of Residence</Label>
                <Input
                  id="country"
                  value={personalInfo.country}
                  onChange={(e) =>
                    setPersonalInfo((p) => ({ ...p, country: e.target.value }))
                  }
                  placeholder="e.g. South Africa"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Availability Status</Label>
                <Select
                  value={personalInfo.availabilityStatus}
                  onValueChange={(v) =>
                    setPersonalInfo((p) => ({ ...p, availabilityStatus: v }))
                  }
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Interviewing">Interviewing</SelectItem>
                    <SelectItem value="Placed">Placed</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Employment Type Preference</Label>
                <Select
                  value={personalInfo.employmentType}
                  onValueChange={(v) =>
                    setPersonalInfo((p) => ({ ...p, employmentType: v }))
                  }
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Substitute">Substitute</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="philosophy">Teaching Philosophy (optional)</Label>
              <Textarea
                id="philosophy"
                value={personalInfo.teachingPhilosophy}
                onChange={(e) =>
                  setPersonalInfo((p) => ({
                    ...p,
                    teachingPhilosophy: e.target.value,
                  }))
                }
                placeholder="Describe your approach to teaching and what drives you as an educator..."
                className="mt-1.5 min-h-[100px]"
              />
            </div>
          </motion.div>
        </TabsContent>

        {/* Teaching Info */}
        <TabsContent value="teaching">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-xl p-6 space-y-5"
          >
            <h2 className="font-semibold text-foreground">
              Teaching Information
            </h2>
            <div>
              <Label className="mb-1.5 block">Subjects Taught *</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Type or select subjects — you can add multiple
              </p>
              <TagInput
                value={subjects}
                onChange={setSubjects}
                suggestions={SUBJECTS}
                placeholder="Add subject..."
              />
            </div>
            <div>
              <Label className="mb-1.5 block">Grades Taught *</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Select all applicable grade levels
              </p>
              <div className="flex flex-wrap gap-2">
                {GRADES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      if (grades.includes(g))
                        setGrades(grades.filter((x) => x !== g));
                      else setGrades([...grades, g]);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      grades.includes(g)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block">Qualifications *</Label>
              <TagInput
                value={qualifications}
                onChange={setQualifications}
                suggestions={QUALIFICATIONS}
                placeholder="Add qualification..."
              />
            </div>
            <div>
              <Label className="mb-1.5 block">Certifications</Label>
              <TagInput
                value={certifications}
                onChange={setCertifications}
                suggestions={CERTIFICATIONS}
                placeholder="Add certification..."
              />
            </div>
          </motion.div>
        </TabsContent>

        {/* Employment History */}
        <TabsContent value="history">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">
                Employment History
              </h2>
              <Button
                size="sm"
                variant="outline"
                onClick={addEmployment}
                className="gap-1.5 text-xs"
              >
                <Plus className="h-3.5 w-3.5" /> Add Position
              </Button>
            </div>
            {employmentHistory.map((entry, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: employment history has no stable ID
                key={i}
                className="border border-border rounded-lg p-4 space-y-3 relative"
              >
                <button
                  type="button"
                  onClick={() => removeEmployment(i)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Employer / School *</Label>
                    <Input
                      value={entry.employer}
                      onChange={(e) =>
                        updateEmployment(i, "employer", e.target.value)
                      }
                      placeholder="e.g. Reddam House"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Role / Position *</Label>
                    <Input
                      value={entry.role}
                      onChange={(e) =>
                        updateEmployment(i, "role", e.target.value)
                      }
                      placeholder="e.g. Mathematics Teacher"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Start Year *</Label>
                    <Input
                      value={entry.startYear}
                      onChange={(e) =>
                        updateEmployment(i, "startYear", e.target.value)
                      }
                      placeholder="2019"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">End Year</Label>
                    <Input
                      value={entry.current ? "Present" : entry.endYear}
                      onChange={(e) =>
                        updateEmployment(i, "endYear", e.target.value)
                      }
                      placeholder="2023 or leave blank if current"
                      disabled={entry.current}
                      className="mt-1"
                    />
                    <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={entry.current}
                        onChange={(e) =>
                          updateEmployment(i, "current", e.target.checked)
                        }
                        className="rounded"
                      />
                      <span className="text-xs text-muted-foreground">
                        Currently working here
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </TabsContent>

        {/* Work Eligibility */}
        <TabsContent value="work-eligibility">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-xl p-6 space-y-4"
          >
            <h2 className="font-semibold text-foreground">Work Eligibility</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Work Permit Status</Label>
                <Select
                  value={personalInfo.workPermitStatus}
                  onValueChange={(v) =>
                    setPersonalInfo((p) => ({ ...p, workPermitStatus: v }))
                  }
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Citizen">Citizen</SelectItem>
                    <SelectItem value="Permanent Resident">
                      Permanent Resident
                    </SelectItem>
                    <SelectItem value="Work Permit Holder">
                      Work Permit Holder
                    </SelectItem>
                    <SelectItem value="EU Citizen">EU Citizen</SelectItem>
                    <SelectItem value="PR Holder">PR Holder</SelectItem>
                    <SelectItem value="Requires Sponsorship">
                      Requires Sponsorship
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="permit-expiry">Permit Validity Date</Label>
                <Input
                  id="permit-expiry"
                  type="date"
                  className="mt-1.5"
                  disabled={
                    personalInfo.workPermitStatus === "Citizen" ||
                    personalInfo.workPermitStatus === "EU Citizen"
                  }
                />
              </div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Teaching Certification:
                </strong>{" "}
                Upload your SAFE certificate and other teaching certifications
                in the Documents section. Verified documents improve your
                visibility in school searches.
              </p>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
