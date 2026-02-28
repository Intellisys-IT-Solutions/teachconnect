import { Outlet } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Briefcase,
  Building2,
  GitBranch,
  LayoutDashboard,
  TrendingUp,
  Users,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const items = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    to: "/admin/candidates",
    label: "Candidates",
    icon: <Users className="h-4 w-4" />,
  },
  {
    to: "/admin/clients",
    label: "Schools",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    to: "/admin/jobs",
    label: "Job Listings",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    to: "/admin/talent-pools",
    label: "Talent Pools",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    to: "/admin/pipeline",
    label: "Pipeline",
    icon: <GitBranch className="h-4 w-4" />,
  },
  {
    to: "/admin/analytics",
    label: "Analytics",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    to: "/admin/activity-log",
    label: "Activity Log",
    icon: <Activity className="h-4 w-4" />,
  },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar userRole="admin" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={items} title="Agency Admin" />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
