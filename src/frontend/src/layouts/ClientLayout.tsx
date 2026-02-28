import { Outlet } from "@tanstack/react-router";
import {
  BookmarkCheck,
  Briefcase,
  FileText,
  LayoutDashboard,
  Search,
  Users,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const items = [
  {
    to: "/client/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    to: "/client/search",
    label: "Find Teachers",
    icon: <Search className="h-4 w-4" />,
  },
  {
    to: "/client/talent-pools",
    label: "Talent Pools",
    icon: <Users className="h-4 w-4" />,
  },
  {
    to: "/client/shortlist",
    label: "Shortlist",
    icon: <BookmarkCheck className="h-4 w-4" />,
  },
  {
    to: "/client/hire-request",
    label: "Hire Request",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    to: "/client/jobs",
    label: "My Listings",
    icon: <Briefcase className="h-4 w-4" />,
  },
];

export default function ClientLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar userRole="client" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={items} title="School Portal" />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
