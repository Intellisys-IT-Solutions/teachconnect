import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, LogOut, Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";

interface NavbarProps {
  userRole?: "teacher" | "client" | "admin" | null;
}

export default function Navbar({ userRole: role }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, identity, isLoggingIn } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCallerUserProfile();
  const location = useLocation();

  const isAuthenticated = !!identity;

  const handleLogout = async () => {
    clear();
    queryClient.clear();
    setMobileOpen(false);
  };

  const initials = userProfile?.name
    ? userProfile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const navLinks = {
    teacher: [
      { to: "/teacher/dashboard", label: "Dashboard" },
      { to: "/teacher/profile", label: "My Profile" },
      { to: "/teacher/jobs", label: "Browse Jobs" },
      { to: "/teacher/applications", label: "Applications" },
    ],
    client: [
      { to: "/client/dashboard", label: "Dashboard" },
      { to: "/client/search", label: "Find Teachers" },
      { to: "/client/talent-pools", label: "Talent Pools" },
      { to: "/client/jobs", label: "My Listings" },
    ],
    admin: [
      { to: "/admin/dashboard", label: "Dashboard" },
      { to: "/admin/candidates", label: "Candidates" },
      { to: "/admin/clients", label: "Schools" },
      { to: "/admin/pipeline", label: "Pipeline" },
    ],
  };

  const links = role ? navLinks[role] : [];

  return (
    <header className="sticky top-0 z-50 bg-white/96 backdrop-blur-md border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/generated/teachconnect-logo-transparent.dim_320x80.png"
              alt="TeachConnect"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          {links.length > 0 && (
            <nav className="hidden md:flex items-center gap-0.5">
              {links.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                        style={{ background: "oklch(0.65 0.18 195)" }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sign In
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={() => login()}
                  disabled={isLoggingIn}
                  className="font-semibold"
                  style={{
                    backgroundColor: "oklch(0.78 0.17 65)",
                    color: "oklch(0.18 0.04 65)",
                  }}
                >
                  {isLoggingIn ? "Connecting..." : "Get Started"}
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarFallback
                        className="text-xs font-bold"
                        style={{
                          background: "oklch(0.24 0.09 255 / 0.12)",
                          color: "oklch(0.24 0.09 255)",
                        }}
                      >
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium max-w-[120px] truncate text-foreground">
                      {userProfile?.name || "User"}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {role === "teacher" && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/teacher/profile"
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile menu toggle */}
            {links.length > 0 && (
              <button
                type="button"
                className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <nav className="px-4 py-3 space-y-1 bg-white">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "bg-secondary text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
