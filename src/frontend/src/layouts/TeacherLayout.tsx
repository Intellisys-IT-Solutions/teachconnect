import { Outlet } from "@tanstack/react-router";
import {
  Briefcase,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Upload,
  User,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const items = [
  {
    to: "/teacher/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    to: "/teacher/profile",
    label: "My Profile",
    icon: <User className="h-4 w-4" />,
  },
  {
    to: "/teacher/documents",
    label: "Documents",
    icon: <Upload className="h-4 w-4" />,
  },
  {
    to: "/teacher/jobs",
    label: "Browse Jobs",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    to: "/teacher/applications",
    label: "Applications",
    icon: <FileText className="h-4 w-4" />,
  },
];

export default function TeacherLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar userRole="teacher" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={items} title="Teacher Portal" />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
