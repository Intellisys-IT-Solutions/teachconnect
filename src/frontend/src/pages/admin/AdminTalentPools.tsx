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
import { Textarea } from "@/components/ui/textarea";
import { Eye, Loader2, Plus, Trash2, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateTalentPool } from "../../hooks/useQueries";
import {
  type SampleTalentPool,
  sampleTalentPools,
  sampleTeachers,
} from "../../sampleData";

export default function AdminTalentPools() {
  const [pools, setPools] = useState(sampleTalentPools);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  // useCreateTalentPool is available for backend integration
  const _createPool = useCreateTalentPool();

  const [form, setForm] = useState({
    name: "",
    description: "",
    icon: "🎯",
    filters: "",
  });

  const getCount = (pool: SampleTalentPool) => {
    try {
      const filters = JSON.parse(pool.filters);
      return sampleTeachers.filter((t) => {
        if (
          filters.subjects &&
          !filters.subjects.some((s: string) => t.subjects.includes(s))
        )
          return false;
        if (
          filters.grades &&
          !filters.grades.some((g: string) => t.grades.includes(g))
        )
          return false;
        if (
          filters.availabilityStatus &&
          t.availabilityStatus !== filters.availabilityStatus
        )
          return false;
        return t.profileVisible;
      }).length;
    } catch {
      return pool.count;
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    const newPool: SampleTalentPool = {
      id: `pool_${Date.now()}`,
      name: form.name,
      description: form.description,
      filters: form.filters || "{}",
      icon: form.icon,
      count: 0,
    };
    setPools((prev) => [newPool, ...prev]);
    setSaving(false);
    setOpen(false);
    setForm({ name: "", description: "", icon: "🎯", filters: "" });
    toast.success("Talent pool created!");
  };

  const handleDelete = (id: string) => {
    setPools((prev) => prev.filter((p) => p.id !== id));
    toast.success("Pool deleted");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Talent Pools
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Create and curate subject-specific teacher pools
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary text-primary-foreground">
              <Plus className="h-4 w-4" /> Create Pool
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Talent Pool</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label>Icon</Label>
                  <Input
                    value={form.icon}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, icon: e.target.value }))
                    }
                    placeholder="🎯"
                    className="mt-1.5 text-lg text-center"
                    maxLength={2}
                  />
                </div>
                <div className="col-span-3">
                  <Label>Pool Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="e.g. STEM Specialists"
                    className="mt-1.5"
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="What type of teachers are in this pool..."
                  className="mt-1.5 min-h-[80px]"
                />
              </div>
              <div>
                <Label>Filter Criteria (JSON)</Label>
                <Textarea
                  value={form.filters}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, filters: e.target.value }))
                  }
                  placeholder='e.g. {"subjects":["Mathematics","Physics"]}'
                  className="mt-1.5 min-h-[60px] font-mono text-xs"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Available filters: subjects, grades, availabilityStatus,
                  certifications
                </p>
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
                  {saving ? "Creating..." : "Create Pool"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pools.map((pool, i) => {
          const count = getCount(pool);
          return (
            <motion.div
              key={pool.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{pool.icon}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => toast("Pool preview coming soon")}
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(pool.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {pool.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                {pool.description}
              </p>
              {pool.filters && pool.filters !== "{}" && (
                <div className="bg-muted/50 rounded-md p-2 mt-auto">
                  <p className="text-xs font-mono text-muted-foreground truncate">
                    {pool.filters}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
