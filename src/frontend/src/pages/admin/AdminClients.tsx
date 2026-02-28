import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  CheckCircle,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useApproveSchool } from "../../hooks/useQueries";

interface School {
  id: string;
  name: string;
  country: string;
  schoolType: string;
  contactEmail: string;
  status: "Pending" | "Approved" | "Rejected";
  joinedDate: string;
  jobRequests: number;
}

const mockSchools: School[] = [
  {
    id: "s1",
    name: "Reddam House Bedfordview",
    country: "South Africa",
    schoolType: "Private Independent",
    contactEmail: "hr@reddam.co.za",
    status: "Approved",
    joinedDate: "Jan 2024",
    jobRequests: 3,
  },
  {
    id: "s2",
    name: "GEMS Wellington Academy Dubai",
    country: "UAE",
    schoolType: "International School",
    contactEmail: "recruitment@gems.ae",
    status: "Approved",
    joinedDate: "Mar 2024",
    jobRequests: 5,
  },
  {
    id: "s3",
    name: "Singapore American School",
    country: "Singapore",
    schoolType: "International Baccalaureate",
    contactEmail: "hr@sas.edu.sg",
    status: "Pending",
    joinedDate: "Jan 2025",
    jobRequests: 0,
  },
  {
    id: "s4",
    name: "Bishops Diocesan College",
    country: "South Africa",
    schoolType: "Independent School",
    contactEmail: "admin@bishops.org.za",
    status: "Approved",
    joinedDate: "Jun 2024",
    jobRequests: 2,
  },
  {
    id: "s5",
    name: "Munich International School",
    country: "Germany",
    schoolType: "International Baccalaureate",
    contactEmail: "hr@mis-munich.de",
    status: "Pending",
    joinedDate: "Jan 2025",
    jobRequests: 0,
  },
];

export default function AdminClients() {
  const [schools, setSchools] = useState<School[]>(mockSchools);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const _approveSchool = useApproveSchool();

  const [form, setForm] = useState({
    name: "",
    contactEmail: "",
    country: "",
    schoolType: "Private Independent",
  });

  const filtered = schools.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.country.toLowerCase().includes(search.toLowerCase()),
  );

  const handleApprove = (id: string) => {
    setSchools((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Approved" } : s)),
    );
    toast.success("School approved!");
  };

  const handleReject = (id: string) => {
    setSchools((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Rejected" } : s)),
    );
    toast.success("School rejected");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSchools((prev) => [
      {
        id: `s_${Date.now()}`,
        ...form,
        status: "Approved" as const,
        joinedDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        jobRequests: 0,
      },
      ...prev,
    ]);
    setSaving(false);
    setOpen(false);
    setForm({
      name: "",
      contactEmail: "",
      country: "",
      schoolType: "Private Independent",
    });
    toast.success("School account created!");
  };

  const pendingCount = schools.filter((s) => s.status === "Pending").length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            School Accounts
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {pendingCount > 0 && (
              <span className="text-orange-600 font-medium">
                {pendingCount} pending approval ·{" "}
              </span>
            )}
            {schools.length} total schools
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary text-primary-foreground">
              <Plus className="h-4 w-4" /> Add School
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add School Account</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <Label>School Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="e.g. St Stithians College"
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label>Contact Email *</Label>
                <Input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, contactEmail: e.target.value }))
                  }
                  placeholder="hr@school.com"
                  className="mt-1.5"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
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
                        IB School
                      </SelectItem>
                      <SelectItem value="Independent School">
                        Independent School
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="gap-2">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? "Creating..." : "Create Account"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search schools..."
          className="pl-9"
        />
      </div>

      {/* Pending Approvals Banner */}
      {pendingCount > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3">
          <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
            <Building2 className="h-4 w-4 text-orange-600" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-orange-800">
              {pendingCount} school{pendingCount > 1 ? "s" : ""} awaiting
              approval
            </div>
            <div className="text-xs text-orange-700">
              Review and approve new school registrations below
            </div>
          </div>
        </div>
      )}

      {/* Schools List */}
      <div className="space-y-3">
        {filtered.map((school, i) => (
          <motion.div
            key={school.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`bg-card border rounded-xl p-4 transition-shadow ${
              school.status === "Pending"
                ? "border-orange-200 bg-orange-50/30"
                : "border-border hover:shadow-card"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                    school.status === "Approved"
                      ? "bg-primary/10"
                      : "bg-orange-100"
                  }`}
                >
                  <Building2
                    className={`h-5 w-5 ${school.status === "Approved" ? "text-primary" : "text-orange-600"}`}
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-foreground">
                    {school.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {school.schoolType} · {school.country} ·{" "}
                    {school.contactEmail}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Joined {school.joinedDate} · {school.jobRequests} job
                    requests
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {school.status === "Pending" ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(school.id)}
                      className="gap-1.5 text-xs bg-green-600 text-white hover:bg-green-700"
                    >
                      <CheckCircle className="h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(school.id)}
                      className="gap-1.5 text-xs text-destructive border-destructive/30 hover:bg-destructive/5"
                    >
                      <X className="h-3.5 w-3.5" /> Reject
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                        school.status === "Approved"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      {school.status}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => toast("View requests coming soon")}
                        >
                          View Job Requests
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleReject(school.id)}
                          className="text-destructive"
                        >
                          Suspend Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
