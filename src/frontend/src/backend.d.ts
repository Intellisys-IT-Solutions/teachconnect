import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface TalentPool {
    id: Principal;
    filters: string;
    name: string;
    createdAt: Time;
    description: string;
    updatedAt: Time;
}
export interface PersonalInfo {
    country: string;
    name: string;
    nationality: string;
    email: string;
    phone: string;
}
export interface JobListing {
    id: Principal;
    region: string;
    schoolType: string;
    status: string;
    title: string;
    country: string;
    createdAt: Time;
    subjectsNeeded: Array<string>;
    updatedAt: Time;
    schoolId: Principal;
    roleOverview: string;
    gradesNeeded: Array<string>;
}
export interface JobApplication {
    id: Principal;
    status: string;
    createdAt: Time;
    jobId: Principal;
    updatedAt: Time;
    teacherId: Principal;
}
export interface ActivityLogEntry {
    id: Principal;
    action: string;
    createdAt: Time;
    actorId: Principal;
    updatedAt: Time;
    targetId: Principal;
}
export interface TeacherProfile {
    id: Principal;
    grades: Array<string>;
    country: string;
    subjects: Array<string>;
    yearsExperience: bigint;
    name: string;
    createdAt: Time;
    qualifications: Array<string>;
    workPermitStatus: string;
    teachingDocuments: Array<TeacherDocument>;
    nationality: string;
    email: string;
    employmentType: string;
    updatedAt: Time;
    verifiedDocuments: Array<string>;
    employmentHistory: Array<EmploymentHistory>;
    phone: string;
    certifications: Array<string>;
    availabilityStatus: string;
    profileVisible: boolean;
}
export interface EmploymentHistory {
    startYear: bigint;
    endYear?: bigint;
    role: string;
    employer: string;
}
export interface JobRequest {
    id: Principal;
    status: string;
    clientId: Principal;
    createdAt: Time;
    updatedAt: Time;
    requirements: string;
}
export interface RecruitmentPipelineEntry {
    id: string;
    createdAt: Time;
    jobId: Principal;
    updatedAt: Time;
    stage: string;
    candidateId: Principal;
}
export interface TeacherDocument {
    fileName: string;
    blobId: string;
    docType: string;
    uploadedAt: Time;
}
export interface SchoolProfile {
    id: Principal;
    schoolType: string;
    country: string;
    name: string;
    createdAt: Time;
    updatedAt: Time;
    contactEmail: string;
}
export interface SavedJobs {
    jobId: Principal;
    teacherId: Principal;
}
export interface UserProfile {
    name: string;
    role: string;
    email: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToRecruitmentPipeline(candidateId: Principal, jobId: Principal, stage: string): Promise<string>;
    applyForJob(teacherId: Principal, jobId: Principal): Promise<Principal>;
    approveSchool(schoolId: Principal): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createJobListing(title: string, region: string, country: string, schoolType: string, roleOverview: string, schoolId: Principal): Promise<Principal>;
    createJobRequest(clientId: Principal, requirements: string): Promise<Principal>;
    createSchoolProfile(name: string, contactEmail: string, country: string, schoolType: string): Promise<Principal>;
    createTalentPool(name: string, description: string, filters: string): Promise<Principal>;
    createTeacherProfile(personalInfo: PersonalInfo): Promise<Principal>;
    getActivityLogs(): Promise<Array<ActivityLogEntry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getJobApplication(applicationId: Principal): Promise<JobApplication | null>;
    getJobApplications(): Promise<Array<JobApplication>>;
    getJobListing(jobId: Principal): Promise<JobListing | null>;
    getJobListings(): Promise<Array<JobListing>>;
    getJobRequests(): Promise<Array<JobRequest>>;
    getRecruitmentPipelines(): Promise<Array<RecruitmentPipelineEntry>>;
    getSavedJobs(): Promise<Array<SavedJobs>>;
    getSavedJobsForTeacher(teacherId: Principal): Promise<Array<SavedJobs>>;
    getSchoolProfile(schoolId: Principal): Promise<SchoolProfile | null>;
    getSchoolProfiles(): Promise<Array<SchoolProfile>>;
    getTalentPool(poolId: Principal): Promise<TalentPool | null>;
    getTalentPools(): Promise<Array<TalentPool>>;
    getTeacherProfile(teacherId: Principal): Promise<TeacherProfile | null>;
    getTeacherProfiles(): Promise<Array<TeacherProfile>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    logActivity(actorId: Principal, action: string, targetId: Principal): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveJob(teacherId: Principal, jobId: Principal): Promise<void>;
    system_clearPersistentData(): Promise<void>;
    system_totalPersistentDataEntries(): Promise<bigint>;
    updateApplicationStatus(applicationId: Principal, newStatus: string): Promise<void>;
    updateJobListing(jobId: Principal, updates: JobListing): Promise<void>;
    updateJobRequestStatus(requestId: Principal, newStatus: string): Promise<void>;
    updatePipelineStage(entryId: string, newStage: string): Promise<void>;
    updateTeacherProfile(updates: TeacherProfile): Promise<void>;
    verifyTeacherDocument(teacherId: Principal, docId: string): Promise<void>;
}
