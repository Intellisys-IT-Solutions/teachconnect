import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ActivityLogEntry,
  JobApplication,
  JobListing,
  JobRequest,
  RecruitmentPipelineEntry,
  SavedJobs,
  SchoolProfile,
  TalentPool,
  TeacherProfile,
  UserProfile,
} from "../backend.d";
import { useActor } from "./useActor";

// ─── User Profile ─────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useCallerRole() {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useIsAdmin() {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

// ─── Teacher Profiles ─────────────────────────────────────────────────────────

export function useGetTeacherProfiles() {
  const { actor, isFetching } = useActor();
  return useQuery<TeacherProfile[]>({
    queryKey: ["teacherProfiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeacherProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTeacherProfile(teacherId: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<TeacherProfile | null>({
    queryKey: ["teacherProfile", teacherId],
    queryFn: async () => {
      if (!actor || !teacherId) return null;
      const { Principal } = await import("@dfinity/principal");
      return actor.getTeacherProfile(Principal.fromText(teacherId));
    },
    enabled: !!actor && !isFetching && !!teacherId,
  });
}

export function useCreateTeacherProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (personalInfo: {
      country: string;
      name: string;
      nationality: string;
      email: string;
      phone: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createTeacherProfile(personalInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacherProfiles"] });
    },
  });
}

export function useUpdateTeacherProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates: TeacherProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateTeacherProfile(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacherProfiles"] });
      queryClient.invalidateQueries({ queryKey: ["teacherProfile"] });
    },
  });
}

// ─── Job Listings ─────────────────────────────────────────────────────────────

export function useGetJobListings() {
  const { actor, isFetching } = useActor();
  return useQuery<JobListing[]>({
    queryKey: ["jobListings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJobListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateJobListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      region: string;
      country: string;
      schoolType: string;
      roleOverview: string;
      schoolId: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const { Principal } = await import("@dfinity/principal");
      return actor.createJobListing(
        data.title,
        data.region,
        data.country,
        data.schoolType,
        data.roleOverview,
        Principal.fromText(data.schoolId),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobListings"] });
    },
  });
}

// ─── Job Applications ─────────────────────────────────────────────────────────

export function useGetJobApplications() {
  const { actor, isFetching } = useActor();
  return useQuery<JobApplication[]>({
    queryKey: ["jobApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJobApplications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useApplyForJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      teacherId,
      jobId,
    }: { teacherId: string; jobId: string }) => {
      if (!actor) throw new Error("Actor not available");
      const { Principal } = await import("@dfinity/principal");
      return actor.applyForJob(
        Principal.fromText(teacherId),
        Principal.fromText(jobId),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
    },
  });
}

export function useUpdateApplicationStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      applicationId,
      newStatus,
    }: { applicationId: string; newStatus: string }) => {
      if (!actor) throw new Error("Actor not available");
      const { Principal } = await import("@dfinity/principal");
      return actor.updateApplicationStatus(
        Principal.fromText(applicationId),
        newStatus,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
    },
  });
}

// ─── Saved Jobs ───────────────────────────────────────────────────────────────

export function useGetSavedJobs() {
  const { actor, isFetching } = useActor();
  return useQuery<SavedJobs[]>({
    queryKey: ["savedJobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSavedJobs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      teacherId,
      jobId,
    }: { teacherId: string; jobId: string }) => {
      if (!actor) throw new Error("Actor not available");
      const { Principal } = await import("@dfinity/principal");
      return actor.saveJob(
        Principal.fromText(teacherId),
        Principal.fromText(jobId),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
    },
  });
}

// ─── School Profiles ──────────────────────────────────────────────────────────

export function useGetSchoolProfiles() {
  const { actor, isFetching } = useActor();
  return useQuery<SchoolProfile[]>({
    queryKey: ["schoolProfiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSchoolProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateSchoolProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      contactEmail: string;
      country: string;
      schoolType: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createSchoolProfile(
        data.name,
        data.contactEmail,
        data.country,
        data.schoolType,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolProfiles"] });
    },
  });
}

export function useApproveSchool() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (schoolId: string) => {
      if (!actor) throw new Error("Actor not available");
      const { Principal } = await import("@dfinity/principal");
      return actor.approveSchool(Principal.fromText(schoolId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolProfiles"] });
    },
  });
}

// ─── Talent Pools ─────────────────────────────────────────────────────────────

export function useGetTalentPools() {
  const { actor, isFetching } = useActor();
  return useQuery<TalentPool[]>({
    queryKey: ["talentPools"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTalentPools();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTalentPool() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      filters: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createTalentPool(data.name, data.description, data.filters);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talentPools"] });
    },
  });
}

// ─── Recruitment Pipeline ─────────────────────────────────────────────────────

export function useGetRecruitmentPipelines() {
  const { actor, isFetching } = useActor();
  return useQuery<RecruitmentPipelineEntry[]>({
    queryKey: ["recruitmentPipelines"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecruitmentPipelines();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddToRecruitmentPipeline() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      candidateId,
      jobId,
      stage,
    }: { candidateId: string; jobId: string; stage: string }) => {
      if (!actor) throw new Error("Actor not available");
      const { Principal } = await import("@dfinity/principal");
      return actor.addToRecruitmentPipeline(
        Principal.fromText(candidateId),
        Principal.fromText(jobId),
        stage,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruitmentPipelines"] });
    },
  });
}

export function useUpdatePipelineStage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      entryId,
      newStage,
    }: { entryId: string; newStage: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePipelineStage(entryId, newStage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruitmentPipelines"] });
    },
  });
}

// ─── Job Requests ─────────────────────────────────────────────────────────────

export function useGetJobRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<JobRequest[]>({
    queryKey: ["jobRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJobRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateJobRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientId,
      requirements,
    }: { clientId: string; requirements: string }) => {
      if (!actor) throw new Error("Actor not available");
      const { Principal } = await import("@dfinity/principal");
      return actor.createJobRequest(Principal.fromText(clientId), requirements);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobRequests"] });
    },
  });
}

export function useUpdateJobRequestStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      requestId,
      newStatus,
    }: { requestId: string; newStatus: string }) => {
      if (!actor) throw new Error("Actor not available");
      const { Principal } = await import("@dfinity/principal");
      return actor.updateJobRequestStatus(
        Principal.fromText(requestId),
        newStatus,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobRequests"] });
    },
  });
}

// ─── Activity Logs ────────────────────────────────────────────────────────────

export function useGetActivityLogs() {
  const { actor, isFetching } = useActor();
  return useQuery<ActivityLogEntry[]>({
    queryKey: ["activityLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActivityLogs();
    },
    enabled: !!actor && !isFetching,
  });
}
