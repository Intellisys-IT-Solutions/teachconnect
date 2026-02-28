import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle,
  Globe,
  GraduationCap,
  LayoutDashboard,
  Search,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const stats = [
  {
    label: "Teachers Placed",
    value: "2,400+",
    accentClass: "stat-card-accent-teal",
  },
  {
    label: "Partner Schools",
    value: "180+",
    accentClass: "stat-card-accent-amber",
  },
  { label: "Countries", value: "32", accentClass: "stat-card-accent-primary" },
  {
    label: "Avg. Fill Time",
    value: "8 days",
    accentClass: "stat-card-accent-green",
  },
];

const features = [
  {
    icon: <Search className="h-5 w-5" />,
    title: "Advanced Talent Search",
    description:
      "Filter by subject, grade, qualification, country, and availability. Multi-tag logic ensures teachers appear in all relevant searches.",
    iconBg: "bg-teal/10",
    iconColor: "text-teal",
    borderColor: "hover:border-teal/40",
    accentClass: "card-accent-teal",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Recruitment Protection",
    description:
      "School identities are hidden until formal engagement. Protect your agency fees and prevent direct hiring bypasses.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderColor: "hover:border-primary/40",
    accentClass: "card-accent-primary",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "International Reach",
    description:
      "Multi-country support, work permit validation, and international certification recognition for global placement.",
    iconBg: "bg-amber/10",
    iconColor: "text-amber",
    borderColor: "hover:border-amber/40",
    accentClass: "card-accent-amber",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Urgent Hiring Pool",
    description:
      "Pre-curated pools of immediately available teachers. Go from search to shortlist in under 5 minutes.",
    iconBg: "bg-teal/10",
    iconColor: "text-teal",
    borderColor: "hover:border-teal/40",
    accentClass: "card-accent-teal",
  },
];

const steps = [
  {
    step: "01",
    title: "Search Candidates",
    desc: "Use powerful filters to find exactly who you need from our verified talent pool.",
  },
  {
    step: "02",
    title: "Preview Profiles",
    desc: "Review experience, qualifications, and compatibility scores. Contact details remain protected.",
  },
  {
    step: "03",
    title: "Engage Agency",
    desc: "Request contact, assign our team to recruit, or self-service shortlist — your choice.",
  },
  {
    step: "04",
    title: "Place & Track",
    desc: "Manage interviews, offers, and placements through your dedicated dashboard.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden hero-mesh min-h-[580px] flex items-center">
        {/* Decorative grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {/* Pill badge with amber accent */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{
                backgroundColor: "oklch(0.78 0.17 65 / 0.18)",
                borderColor: "oklch(0.78 0.17 65 / 0.35)",
                color: "oklch(0.90 0.12 65)",
              }}
            >
              <Zap className="h-3.5 w-3.5" />
              Trusted by 180+ private &amp; international schools
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-5">
              Find Your Next{" "}
              <span className="text-gradient-teal relative">Exceptional</span>{" "}
              <span className="text-white">Teacher</span>
            </h1>

            <p className="text-sidebar-foreground/80 text-lg leading-relaxed mb-7 max-w-lg">
              TeachConnect is the recruitment platform purpose-built for private
              and international schools. Search verified teacher profiles,
              protect agency ownership, and fill urgent vacancies fast.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link to="/login">
                <Button
                  size="lg"
                  className="font-semibold gap-2 shadow-glow-amber"
                  style={{
                    backgroundColor: "oklch(0.78 0.17 65)",
                    color: "oklch(0.18 0.04 65)",
                  }}
                >
                  Find a Teacher
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 gap-2"
                >
                  <GraduationCap className="h-4 w-4" />
                  Register as Teacher
                </Button>
              </Link>
            </div>

            {/* Social proof bullets */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-sidebar-foreground/60">
              {[
                "No upfront cost",
                "8-day avg fill time",
                "180+ partner schools",
                "32 countries",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: "oklch(0.65 0.18 195)" }}
                  />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="relative">
              <img
                src="/assets/generated/hero-illustration.dim_1200x500.jpg"
                alt="TeachConnect platform illustration"
                className="rounded-2xl shadow-2xl w-full object-cover h-72 ring-1 ring-white/10"
              />
              {/* Floating stat card — teal top border */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-card-hover border-t-4 overflow-hidden"
                style={{ borderTopColor: "oklch(0.65 0.18 195)" }}
              >
                <div className="p-4">
                  <div className="text-2xl font-extrabold text-primary font-display">
                    2,400+
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Placements Made
                  </div>
                </div>
              </motion.div>

              {/* Floating stat card — amber top border */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-5 -right-5 bg-white rounded-xl shadow-card-hover overflow-hidden border-t-4"
                style={{ borderTopColor: "oklch(0.78 0.17 65)" }}
              >
                <div className="p-4">
                  <div
                    className="text-2xl font-extrabold font-display"
                    style={{ color: "oklch(0.65 0.18 195)" }}
                  >
                    8 days
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Avg. Fill Time
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────── */}
      <section className="bg-white border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`relative stat-card-accent ${stat.accentClass} rounded-lg px-4 py-3 shadow-stat`}
              >
                <div className="text-2xl font-extrabold font-display text-foreground pl-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5 pl-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Role CTA Cards ─────────────────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Who Are You?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Get started with the experience designed for your role.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* School Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-primary/8 to-primary/15 border border-primary/25 rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-200 group"
              style={{ borderTop: "8px solid oklch(0.24 0.09 255)" }}
            >
              <div className="p-6">
                <div className="bg-primary/10 text-primary w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Building2 className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  I'm a School
                </h3>
                <p className="text-sm font-semibold text-primary mb-2">
                  Search &amp; hire exceptional teachers
                </p>
                <p className="text-sm text-muted-foreground mb-5">
                  Access our verified talent pool, browse curated subject pools,
                  and manage your hiring pipeline.
                </p>
                <Link to="/login">
                  <Button
                    size="sm"
                    className="w-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Find Teachers
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Teacher Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-teal-light/40 to-accent/30 border border-teal/25 rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-200 group"
              style={{ borderTop: "8px solid oklch(0.65 0.18 195)" }}
            >
              <div className="p-6">
                <div className="bg-teal/10 text-teal w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal/15 transition-colors">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  I'm a Teacher
                </h3>
                <p className="text-sm font-semibold text-teal mb-2">
                  Find your perfect teaching role
                </p>
                <p className="text-sm text-muted-foreground mb-5">
                  Create your professional profile, upload credentials, and
                  apply to international opportunities.
                </p>
                <Link to="/login">
                  <Button
                    size="sm"
                    className="w-full gap-1.5"
                    style={{
                      backgroundColor: "oklch(0.65 0.18 195)",
                      color: "oklch(0.14 0.045 255)",
                    }}
                  >
                    Register Now
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Admin Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200 rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-200 group"
              style={{ borderTop: "8px solid oklch(0.5 0.2 295)" }}
            >
              <div className="p-6">
                <div className="bg-purple-100 text-purple-700 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200/70 transition-colors">
                  <LayoutDashboard className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  Agency Admin
                </h3>
                <p className="text-sm font-semibold text-purple-700 mb-2">
                  Manage the full recruitment lifecycle
                </p>
                <p className="text-sm text-muted-foreground mb-5">
                  Full candidate database, pipeline management, analytics, and
                  client management tools.
                </p>
                <Link to="/login">
                  <Button
                    size="sm"
                    className="w-full gap-1.5 bg-purple-700 text-white hover:bg-purple-800"
                  >
                    Agency Login
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A complete recruitment ecosystem purpose-built for education
              sector hiring.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group p-5 rounded-xl border border-border ${feat.borderColor} hover:shadow-card-hover transition-all duration-200 ${feat.accentClass} pl-5`}
              >
                <div
                  className={`${feat.iconBg} ${feat.iconColor} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}
                >
                  {feat.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              From search to placement in four steps.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 h-px bg-gradient-to-r from-border to-transparent"
                    style={{
                      width: "calc(100% - 40px)",
                      left: "calc(50% + 24px)",
                    }}
                  />
                )}
                {/* Large background step number */}
                <div className="relative mb-3">
                  <div
                    className="font-display font-extrabold leading-none select-none"
                    style={{
                      fontSize: "5rem",
                      color: "oklch(0.24 0.09 255 / 0.08)",
                      lineHeight: 1,
                    }}
                  >
                    {s.step}
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 left-0">
                    <div
                      className="text-sm font-bold font-display tracking-wide"
                      style={{ color: "oklch(0.65 0.18 195)" }}
                    >
                      Step {s.step}
                    </div>
                  </div>
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section className="hero-mesh py-16 relative overflow-hidden">
        {/* Decorative circles */}
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: "oklch(0.65 0.18 195)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-8 pointer-events-none"
          style={{ background: "oklch(0.78 0.17 65)" }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border"
              style={{
                backgroundColor: "oklch(0.65 0.18 195 / 0.15)",
                borderColor: "oklch(0.65 0.18 195 / 0.30)",
                color: "oklch(0.85 0.10 195)",
              }}
            >
              <Users className="h-3.5 w-3.5" />
              Join 180+ schools today
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-sidebar-foreground/70 mb-8 max-w-lg mx-auto">
              Join 180+ schools already using TeachConnect to find and place
              exceptional educators worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/login">
                <Button
                  size="lg"
                  className="font-semibold gap-2 shadow-glow-amber"
                  style={{
                    backgroundColor: "oklch(0.78 0.17 65)",
                    color: "oklch(0.18 0.04 65)",
                  }}
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Book a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
