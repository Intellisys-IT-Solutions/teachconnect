import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// Pages - Public
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";
// Layouts
import TeacherLayout from "./layouts/TeacherLayout";

import TeacherApplications from "./pages/teacher/TeacherApplications";
// Teacher Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherDocuments from "./pages/teacher/TeacherDocuments";
import TeacherJobs from "./pages/teacher/TeacherJobs";
import TeacherProfile from "./pages/teacher/TeacherProfile";

// Client Pages
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientHireRequest from "./pages/client/ClientHireRequest";
import ClientJobs from "./pages/client/ClientJobs";
import ClientSearch from "./pages/client/ClientSearch";
import ClientShortlist from "./pages/client/ClientShortlist";
import ClientTalentPools from "./pages/client/ClientTalentPools";

import AdminActivityLog from "./pages/admin/AdminActivityLog";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminCandidates from "./pages/admin/AdminCandidates";
import AdminClients from "./pages/admin/AdminClients";
// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminPipeline from "./pages/admin/AdminPipeline";
import AdminTalentPools from "./pages/admin/AdminTalentPools";

// ─── Root Route ───────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-right" richColors />
    </>
  ),
});

// ─── Public Routes ────────────────────────────────────────────────────────────
const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// ─── Teacher Routes ───────────────────────────────────────────────────────────
const teacherLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher",
  component: TeacherLayout,
});
const teacherDashboardRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/dashboard",
  component: TeacherDashboard,
});
const teacherProfileRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/profile",
  component: TeacherProfile,
});
const teacherDocumentsRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/documents",
  component: TeacherDocuments,
});
const teacherJobsRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/jobs",
  component: TeacherJobs,
});
const teacherApplicationsRoute = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: "/applications",
  component: TeacherApplications,
});

// ─── Client Routes ────────────────────────────────────────────────────────────
const clientLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/client",
  component: ClientLayout,
});
const clientDashboardRoute = createRoute({
  getParentRoute: () => clientLayoutRoute,
  path: "/dashboard",
  component: ClientDashboard,
});
const clientSearchRoute = createRoute({
  getParentRoute: () => clientLayoutRoute,
  path: "/search",
  component: ClientSearch,
});
const clientTalentPoolsRoute = createRoute({
  getParentRoute: () => clientLayoutRoute,
  path: "/talent-pools",
  component: ClientTalentPools,
});
const clientShortlistRoute = createRoute({
  getParentRoute: () => clientLayoutRoute,
  path: "/shortlist",
  component: ClientShortlist,
});
const clientHireRequestRoute = createRoute({
  getParentRoute: () => clientLayoutRoute,
  path: "/hire-request",
  component: ClientHireRequest,
});
const clientJobsRoute = createRoute({
  getParentRoute: () => clientLayoutRoute,
  path: "/jobs",
  component: ClientJobs,
});

// ─── Admin Routes ─────────────────────────────────────────────────────────────
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLayout,
});
const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/dashboard",
  component: AdminDashboard,
});
const adminCandidatesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/candidates",
  component: AdminCandidates,
});
const adminClientsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/clients",
  component: AdminClients,
});
const adminJobsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/jobs",
  component: AdminJobs,
});
const adminTalentPoolsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/talent-pools",
  component: AdminTalentPools,
});
const adminPipelineRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/pipeline",
  component: AdminPipeline,
});
const adminAnalyticsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/analytics",
  component: AdminAnalytics,
});
const adminActivityLogRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/activity-log",
  component: AdminActivityLog,
});

// ─── Route Tree ───────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  teacherLayoutRoute.addChildren([
    teacherDashboardRoute,
    teacherProfileRoute,
    teacherDocumentsRoute,
    teacherJobsRoute,
    teacherApplicationsRoute,
  ]),
  clientLayoutRoute.addChildren([
    clientDashboardRoute,
    clientSearchRoute,
    clientTalentPoolsRoute,
    clientShortlistRoute,
    clientHireRequestRoute,
    clientJobsRoute,
  ]),
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminCandidatesRoute,
    adminClientsRoute,
    adminJobsRoute,
    adminTalentPoolsRoute,
    adminPipelineRoute,
    adminAnalyticsRoute,
    adminActivityLogRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
