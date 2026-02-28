import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Check,
  GraduationCap,
  LayoutDashboard,
  Loader2,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useSaveCallerUserProfile,
} from "../hooks/useQueries";

type RoleSelection = "teacher" | "client" | "admin";

const roles = [
  {
    id: "teacher" as RoleSelection,
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Teacher / Candidate",
    desc: "Register your profile, upload credentials, and apply for positions at private & international schools.",
    color: "border-teal/30 bg-teal/5 hover:border-teal/60 hover:bg-teal/8",
    activeColor: "border-teal ring-2 ring-teal/25 bg-teal/8 border-t-4",
    iconBg: "bg-teal/10 text-teal",
    topBorderColor: "oklch(0.65 0.18 195)",
    selectedTopBorder: true,
  },
  {
    id: "client" as RoleSelection,
    icon: <Building2 className="h-6 w-6" />,
    title: "School / Client",
    desc: "Search and find qualified teachers, browse talent pools, and manage your recruitment requests.",
    color:
      "border-primary/25 bg-primary/5 hover:border-primary/50 hover:bg-primary/8",
    activeColor:
      "border-primary ring-2 ring-primary/20 bg-primary/8 border-t-4",
    iconBg: "bg-primary/10 text-primary",
    topBorderColor: "oklch(0.24 0.09 255)",
    selectedTopBorder: true,
  },
  {
    id: "admin" as RoleSelection,
    icon: <LayoutDashboard className="h-6 w-6" />,
    title: "Agency Admin",
    desc: "Full platform access: candidate management, pipeline, analytics, and client oversight.",
    color:
      "border-purple-200 bg-purple-50/50 hover:border-purple-400 hover:bg-purple-50",
    activeColor:
      "border-purple-500 ring-2 ring-purple-200 bg-purple-50 border-t-4",
    iconBg: "bg-purple-100 text-purple-700",
    topBorderColor: "oklch(0.5 0.2 295)",
    selectedTopBorder: true,
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login, clear, identity, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();

  const [selectedRole, setSelectedRole] = useState<RoleSelection>("teacher");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showNameForm, setShowNameForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const isAuthenticated = !!identity;

  // After auth, check if profile exists
  useEffect(() => {
    if (isAuthenticated && isFetched && !profileLoading) {
      if (!userProfile) {
        // Need to collect name
        setShowNameForm(true);
      } else if (userProfile) {
        // Profile exists — redirect based on stored role
        const role = (userProfile.role as RoleSelection) || selectedRole;
        redirectByRole(role);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isFetched, profileLoading, userProfile, selectedRole]);

  const redirectByRole = (role: string) => {
    if (role === "admin") navigate({ to: "/admin/dashboard" });
    else if (role === "client") navigate({ to: "/client/dashboard" });
    else navigate({ to: "/teacher/dashboard" });
  };

  const handleLogin = () => {
    login();
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    setSaving(true);
    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        role: selectedRole,
      });
      toast.success("Profile created!");
      redirectByRole(selectedRole);
    } catch {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
    setShowNameForm(false);
    setName("");
    setEmail("");
  };

  const selectedRoleData = roles.find((r) => r.id === selectedRole);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.98 0.004 240) 0%, oklch(0.95 0.015 220) 100%)",
      }}
    >
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-xl"
        >
          {/* Card */}
          <div className="bg-card border border-border/60 rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <img
                src="/assets/generated/teachconnect-logo-transparent.dim_320x80.png"
                alt="TeachConnect"
                className="h-10 w-auto mx-auto mb-4"
              />
              <h1 className="font-display text-2xl font-bold text-foreground">
                {showNameForm
                  ? "Complete Your Profile"
                  : "Welcome to TeachConnect"}
              </h1>
              <p className="text-muted-foreground mt-1.5 text-sm">
                {showNameForm
                  ? "Tell us about yourself to get started"
                  : "Select your role and connect with Internet Identity"}
              </p>
            </div>

            {!isAuthenticated && !showNameForm ? (
              <>
                {/* Role selection */}
                <div className="space-y-3 mb-6">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Select your role:
                  </p>
                  {roles.map((role) => {
                    const isSelected = selectedRole === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-150 text-left overflow-hidden relative ${
                          isSelected ? role.activeColor : role.color
                        }`}
                        style={
                          isSelected
                            ? {
                                borderTopColor: role.topBorderColor,
                                borderTopWidth: "4px",
                              }
                            : {}
                        }
                      >
                        <div
                          className={`${role.iconBg} w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5`}
                        >
                          {role.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-foreground text-sm">
                            {role.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {role.desc}
                          </div>
                        </div>
                        {isSelected && (
                          <div
                            className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                            style={{ backgroundColor: role.topBorderColor }}
                          >
                            <Check
                              className="w-3 h-3 text-white"
                              strokeWidth={3}
                            />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <Button
                  onClick={handleLogin}
                  disabled={isLoggingIn || isInitializing}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 font-semibold gap-2"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      Continue with Internet Identity
                    </>
                  )}
                </Button>

                {/* Security note — teal-tinted */}
                <div
                  className="flex items-start gap-2.5 mt-4 p-3 rounded-lg border"
                  style={{
                    backgroundColor: "oklch(0.65 0.18 195 / 0.06)",
                    borderColor: "oklch(0.65 0.18 195 / 0.20)",
                  }}
                >
                  <Shield
                    className="h-4 w-4 shrink-0 mt-0.5"
                    style={{ color: "oklch(0.65 0.18 195)" }}
                  />
                  <p className="text-xs text-muted-foreground">
                    Secured by Internet Identity — no passwords, no tracking,
                    fully decentralized authentication.
                  </p>
                </div>
              </>
            ) : showNameForm ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Mitchell"
                    className="mt-1.5"
                    autoFocus
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <div className="mt-1.5 p-3 bg-muted rounded-lg flex items-center gap-3">
                    <div
                      className={`${selectedRoleData?.iconBg} w-8 h-8 rounded-md flex items-center justify-center`}
                    >
                      {selectedRoleData?.icon}
                    </div>
                    <span className="text-sm font-medium">
                      {selectedRoleData?.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowNameForm(false)}
                      className="ml-auto text-xs text-muted-foreground hover:text-foreground underline"
                    >
                      Change
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={saving || !name.trim()}
                  className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                  {saving ? "Setting up..." : "Enter Platform"}
                </Button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-xs text-muted-foreground hover:text-foreground text-center underline"
                >
                  Sign out and start over
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary mb-3" />
                <p className="text-sm text-muted-foreground">
                  Setting up your workspace...
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
