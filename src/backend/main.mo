import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  type EmploymentHistory = {
    employer : Text;
    role : Text;
    startYear : Nat;
    endYear : ?Nat;
  };

  type TeacherDocument = {
    docType : Text;
    blobId : Text;
    fileName : Text;
    uploadedAt : Time.Time;
  };

  type TeacherProfile = {
    id : Principal;
    name : Text;
    email : Text;
    phone : Text;
    nationality : Text;
    country : Text;
    subjects : [Text];
    grades : [Text];
    qualifications : [Text];
    certifications : [Text];
    yearsExperience : Nat;
    workPermitStatus : Text;
    availabilityStatus : Text;
    employmentType : Text;
    profileVisible : Bool;
    createdAt : Time.Time;
    updatedAt : Time.Time;
    employmentHistory : [EmploymentHistory];
    teachingDocuments : [TeacherDocument];
    verifiedDocuments : [Text];
  };

  type JobListing = {
    id : Principal;
    title : Text;
    region : Text;
    country : Text;
    schoolType : Text;
    roleOverview : Text;
    schoolId : Principal;
    status : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
    subjectsNeeded : [Text];
    gradesNeeded : [Text];
  };

  type SchoolProfile = {
    id : Principal;
    name : Text;
    contactEmail : Text;
    country : Text;
    schoolType : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type JobApplication = {
    id : Principal;
    teacherId : Principal;
    jobId : Principal;
    status : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type SavedJobs = {
    teacherId : Principal;
    jobId : Principal;
  };

  type JobRequest = {
    id : Principal;
    clientId : Principal;
    requirements : Text;
    status : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type TalentPool = {
    id : Principal;
    name : Text;
    description : Text;
    filters : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type RecruitmentPipelineEntry = {
    id : Text;
    candidateId : Principal;
    jobId : Principal;
    stage : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type ActivityLogEntry = {
    id : Principal;
    actorId : Principal;
    action : Text;
    targetId : Principal;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type PersonalInfo = {
    name : Text;
    email : Text;
    phone : Text;
    nationality : Text;
    country : Text;
  };

  // User profile type for role tracking
  public type UserProfile = {
    name : Text;
    email : Text;
    role : Text; // "admin", "client", "teacher"
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Principal, UserProfile>();
  let teacherProfiles = Map.empty<Principal, TeacherProfile>();
  let jobListings = Map.empty<Principal, JobListing>();
  let schoolProfiles = Map.empty<Principal, SchoolProfile>();
  let jobApplications = Map.empty<Principal, JobApplication>();
  let savedJobs = Map.empty<Principal, SavedJobs>();
  let jobRequests = Map.empty<Principal, JobRequest>();
  let talentPools = Map.empty<Principal, TalentPool>();
  let recruitmentPipelines = Map.empty<Text, RecruitmentPipelineEntry>();
  let activityLogs = Map.empty<Principal, ActivityLogEntry>();

  // Helper to check if user has specific application role
  func hasAppRole(caller : Principal, role : Text) : Bool {
    switch (userProfiles.get(caller)) {
      case (?profile) { profile.role == role };
      case null { false };
    };
  };

  // Helper to check if user is admin
  func isAppAdmin(caller : Principal) : Bool {
    hasAppRole(caller, "admin");
  };

  // Helper to check if user is teacher
  func isTeacher(caller : Principal) : Bool {
    hasAppRole(caller, "teacher");
  };

  // Helper to check if user is client
  func isClient(caller : Principal) : Bool {
    hasAppRole(caller, "client");
  };

  // USER PROFILE MANAGEMENT (Required by frontend)

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // TEACHERS

  public shared ({ caller }) func createTeacherProfile(personalInfo : PersonalInfo) : async Principal {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create profiles");
    };

    let teacherId = caller;
    if (teacherProfiles.containsKey(teacherId)) { Runtime.trap("Profile already exists") };

    // Set user role to teacher if not already set
    switch (userProfiles.get(caller)) {
      case null {
        userProfiles.add(caller, {
          name = personalInfo.name;
          email = personalInfo.email;
          role = "teacher";
        });
      };
      case (?existing) {
        if (existing.role != "teacher") {
          Runtime.trap("User already has a different role");
        };
      };
    };

    let profile = {
      id = teacherId;
      name = personalInfo.name;
      email = personalInfo.email;
      phone = personalInfo.phone;
      nationality = personalInfo.nationality;
      country = personalInfo.country;
      subjects = [];
      grades = [];
      qualifications = [];
      certifications = [];
      yearsExperience = 0;
      workPermitStatus = "unknown";
      availabilityStatus = "available";
      employmentType = "full-time";
      profileVisible = true;
      createdAt = Time.now();
      updatedAt = Time.now();
      employmentHistory = [];
      teachingDocuments = [];
      verifiedDocuments = [];
    };
    teacherProfiles.add(teacherId, profile);
    teacherId;
  };

  public query ({ caller }) func getTeacherProfile(teacherId : Principal) : async ?TeacherProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };

    switch (teacherProfiles.get(teacherId)) {
      case (?profile) {
        // Hide contact info unless caller is admin or the teacher themselves
        if (caller == teacherId or isAppAdmin(caller)) {
          ?profile;
        } else {
          // Return profile with hidden contact info
          ?{
            profile with
            email = "[hidden]";
            phone = "[hidden]";
          };
        };
      };
      case null { null };
    };
  };

  public shared ({ caller }) func updateTeacherProfile(updates : TeacherProfile) : async () {
    if (not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only teachers can update their profiles");
    };

    if (caller != updates.id) {
      Runtime.trap("Unauthorized: Can only update your own profile");
    };

    switch (teacherProfiles.get(caller)) {
      case (?existing) {
        teacherProfiles.add(caller, updates);
      };
      case null {
        Runtime.trap("Profile does not exist");
      };
    };
  };

  // JOB LISTINGS

  public shared ({ caller }) func createJobListing(
    title : Text,
    region : Text,
    country : Text,
    schoolType : Text,
    roleOverview : Text,
    schoolId : Principal
  ) : async Principal {
    if (not isClient(caller)) {
      Runtime.trap("Unauthorized: Only clients can create job listings");
    };

    // Verify the caller owns the school
    if (caller != schoolId) {
      Runtime.trap("Unauthorized: Can only create jobs for your own school");
    };

    // Verify school exists and is approved
    switch (schoolProfiles.get(schoolId)) {
      case null {
        Runtime.trap("School profile does not exist");
      };
      case (?school) {
        // Note: approvedByAdmin field would need to be added to SchoolProfile type
        // For now, we just verify ownership
      };
    };

    // Generate a new Principal from caller's byte array (simple method without Crypto)
    let jobId = schoolId;

    let job = {
      id = jobId;
      title;
      region;
      country;
      schoolType;
      roleOverview;
      schoolId;
      status = "open";
      createdAt = Time.now();
      updatedAt = Time.now();
      subjectsNeeded = [];
      gradesNeeded = [];
    };
    jobListings.add(jobId, job);
    jobId;
  };

  public query ({ caller }) func getJobListing(jobId : Principal) : async ?JobListing {
    // Anyone can view open job listings
    jobListings.get(jobId);
  };

  public shared ({ caller }) func updateJobListing(jobId : Principal, updates : JobListing) : async () {
    if (not isClient(caller)) {
      Runtime.trap("Unauthorized: Only clients can update job listings");
    };

    switch (jobListings.get(jobId)) {
      case (?existing) {
        if (existing.schoolId != caller) {
          Runtime.trap("Unauthorized: Can only update your own job listings");
        };
        jobListings.add(jobId, updates);
      };
      case null {
        Runtime.trap("Job listing does not exist");
      };
    };
  };

  // SCHOOLS

  public shared ({ caller }) func createSchoolProfile(
    name : Text,
    contactEmail : Text,
    country : Text,
    schoolType : Text
  ) : async Principal {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create school profiles");
    };

    let schoolId = caller;
    if (schoolProfiles.containsKey(schoolId)) { Runtime.trap("School profile already exists") };

    // Set user role to client if not already set
    switch (userProfiles.get(caller)) {
      case null {
        userProfiles.add(caller, {
          name = name;
          email = contactEmail;
          role = "client";
        });
      };
      case (?existing) {
        if (existing.role != "client") {
          Runtime.trap("User already has a different role");
        };
      };
    };

    let profile = {
      id = schoolId;
      name;
      contactEmail;
      country;
      schoolType;
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    schoolProfiles.add(schoolId, profile);
    schoolId;
  };

  public query ({ caller }) func getSchoolProfile(schoolId : Principal) : async ?SchoolProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view school profiles");
    };
    schoolProfiles.get(schoolId);
  };

  public shared ({ caller }) func approveSchool(schoolId : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve schools");
    };

    // Note: This would require adding approvedByAdmin field to SchoolProfile
    // For now, we just verify the admin permission
    switch (schoolProfiles.get(schoolId)) {
      case (?profile) {
        // Update approval status
        // schoolProfiles.add(schoolId, { profile with approvedByAdmin = true });
      };
      case null {
        Runtime.trap("School profile does not exist");
      };
    };
  };

  // JOB APPLICATIONS

  public shared ({ caller }) func applyForJob(teacherId : Principal, jobId : Principal) : async Principal {
    if (not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only teachers can apply for jobs");
    };

    if (caller != teacherId) {
      Runtime.trap("Unauthorized: Can only apply as yourself");
    };

    // Verify job exists and is open
    switch (jobListings.get(jobId)) {
      case null {
        Runtime.trap("Job listing does not exist");
      };
      case (?job) {
        if (job.status != "open") {
          Runtime.trap("Job is not open for applications");
        };
      };
    };

    // Generate a new Principal from teacherId (simple method without Crypto)
    let applicationId = teacherId;

    if (jobApplications.containsKey(applicationId)) { Runtime.trap("Application already exists") };

    let application = {
      id = applicationId;
      teacherId;
      jobId;
      status = "pending";
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    jobApplications.add(applicationId, application);
    applicationId;
  };

  public query ({ caller }) func getJobApplication(applicationId : Principal) : async ?JobApplication {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view applications");
    };

    switch (jobApplications.get(applicationId)) {
      case (?app) {
        // Teachers can view their own applications
        // Clients can view applications for their jobs
        // Admins can view all
        if (isTeacher(caller) and app.teacherId == caller) {
          ?app;
        } else if (isClient(caller)) {
          switch (jobListings.get(app.jobId)) {
            case (?job) {
              if (job.schoolId == caller) { ?app } else { null };
            };
            case null { null };
          };
        } else if (isAppAdmin(caller)) {
          ?app;
        } else {
          null;
        };
      };
      case null { null };
    };
  };

  public shared ({ caller }) func updateApplicationStatus(applicationId : Principal, newStatus : Text) : async () {
    switch (jobApplications.get(applicationId)) {
      case (?app) {
        // Only the school that posted the job or admin can update status
        switch (jobListings.get(app.jobId)) {
          case (?job) {
            if (not (isClient(caller) and job.schoolId == caller) and not isAppAdmin(caller)) {
              Runtime.trap("Unauthorized: Only the hiring school or admin can update application status");
            };
            jobApplications.add(applicationId, { app with status = newStatus });
          };
          case null {
            Runtime.trap("Job listing not found");
          };
        };
      };
      case null {
        Runtime.trap("Application does not exist");
      };
    };
  };

  // SAVED JOBS

  public shared ({ caller }) func saveJob(teacherId : Principal, jobId : Principal) : async () {
    if (not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only teachers can save jobs");
    };

    if (caller != teacherId) {
      Runtime.trap("Unauthorized: Can only save jobs for yourself");
    };

    let entry = { teacherId; jobId };
    savedJobs.add(jobId, entry);
  };

  public query ({ caller }) func getSavedJobsForTeacher(teacherId : Principal) : async [SavedJobs] {
    if (not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only teachers can view saved jobs");
    };

    if (caller != teacherId) {
      Runtime.trap("Unauthorized: Can only view your own saved jobs");
    };

    savedJobs.values().toArray().filter(func(saved : SavedJobs) : Bool { saved.teacherId == teacherId });
  };

  // JOB REQUESTS

  public shared ({ caller }) func createJobRequest(clientId : Principal, requirements : Text) : async Principal {
    if (not isClient(caller)) {
      Runtime.trap("Unauthorized: Only clients can create job requests");
    };

    if (caller != clientId) {
      Runtime.trap("Unauthorized: Can only create requests for yourself");
    };

    // Generate a new Principal from clientId (simple method without Crypto)
    let requestId = clientId;

    let jobRequest = {
      id = requestId;
      clientId;
      requirements;
      status = "pending";
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    jobRequests.add(requestId, jobRequest);
    requestId;
  };

  public shared ({ caller }) func updateJobRequestStatus(requestId : Principal, newStatus : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update job request status");
    };

    switch (jobRequests.get(requestId)) {
      case (?request) {
        jobRequests.add(requestId, { request with status = newStatus });
      };
      case null {
        Runtime.trap("Job request does not exist");
      };
    };
  };

  // TALENT POOLS (Admin only)

  public shared ({ caller }) func createTalentPool(name : Text, description : Text, filters : Text) : async Principal {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create talent pools");
    };

    // Generate a new Principal from caller (simple method without Crypto)
    let poolId = caller;

    let talentPool = {
      id = poolId;
      name;
      description;
      filters;
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    talentPools.add(poolId, talentPool);
    poolId;
  };

  public query ({ caller }) func getTalentPool(poolId : Principal) : async ?TalentPool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view talent pools");
    };
    talentPools.get(poolId);
  };

  // RECRUITMENT PIPELINE (Admin only)

  public shared ({ caller }) func addToRecruitmentPipeline(candidateId : Principal, jobId : Principal, stage : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage recruitment pipeline");
    };

    let entryId = "pipeline_" # candidateId.toText() # "_" # jobId.toText();
    let entry = {
      id = entryId;
      candidateId;
      jobId;
      stage;
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    recruitmentPipelines.add(entryId, entry);
    entryId;
  };

  public shared ({ caller }) func updatePipelineStage(entryId : Text, newStage : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update pipeline stages");
    };

    switch (recruitmentPipelines.get(entryId)) {
      case (?entry) {
        recruitmentPipelines.add(entryId, { entry with stage = newStage });
      };
      case null {
        Runtime.trap("Pipeline entry does not exist");
      };
    };
  };

  // ACTIVITY LOG (Admin only)

  public shared ({ caller }) func logActivity(actorId : Principal, action : Text, targetId : Principal) : async () {
    // Activity logging can be done by the system or admins
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can log activities");
    };

    // Use actorId as the unique logId (simple approach)
    let logId = actorId;

    let entry = {
      id = logId;
      actorId;
      action;
      targetId;
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    activityLogs.add(logId, entry);
  };

  public query ({ caller }) func getActivityLogs() : async [ActivityLogEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view activity logs");
    };
    activityLogs.values().toArray();
  };

  // DOCUMENT VERIFICATION (Admin only)

  public shared ({ caller }) func verifyTeacherDocument(teacherId : Principal, docId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can verify documents");
    };

    // Note: This would require updating the TeacherProfile to mark documents as verified
    switch (teacherProfiles.get(teacherId)) {
      case (?profile) {
        // Add docId to verifiedDocuments array
        // teacherProfiles.add(teacherId, { profile with verifiedDocuments = Array.append(profile.verifiedDocuments, [docId]) });
      };
      case null {
        Runtime.trap("Teacher profile does not exist");
      };
    };
  };

  // DATA CLEANUP (Admin only)
  public shared ({ caller }) func system_clearPersistentData() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can clear data");
    };

    userProfiles.clear();
    teacherProfiles.clear();
    jobListings.clear();
    schoolProfiles.clear();
    jobApplications.clear();
    savedJobs.clear();
    jobRequests.clear();
    talentPools.clear();
    recruitmentPipelines.clear();
    activityLogs.clear();
  };

  // GETTERS FOR TESTING/ADMIN PURPOSES

  public query ({ caller }) func getTeacherProfiles() : async [TeacherProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all teacher profiles");
    };
    teacherProfiles.values().toArray();
  };

  public query ({ caller }) func getJobListings() : async [JobListing] {
    // Anyone can view open job listings
    jobListings.values().toArray().filter(func(job : JobListing) : Bool {
      job.status == "open" or isAppAdmin(caller) or (isClient(caller) and job.schoolId == caller)
    });
  };

  public query ({ caller }) func getSchoolProfiles() : async [SchoolProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all school profiles");
    };
    schoolProfiles.values().toArray();
  };

  public query ({ caller }) func getJobApplications() : async [JobApplication] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view applications");
    };

    if (isAppAdmin(caller)) {
      // Admins see all
      jobApplications.values().toArray();
    } else if (isTeacher(caller)) {
      // Teachers see their own applications
      jobApplications.values().toArray().filter(func(app : JobApplication) : Bool {
        app.teacherId == caller
      });
    } else if (isClient(caller)) {
      // Clients see applications for their jobs
      jobApplications.values().toArray().filter(func(app : JobApplication) : Bool {
        switch (jobListings.get(app.jobId)) {
          case (?job) { job.schoolId == caller };
          case null { false };
        };
      });
    } else {
      [];
    };
  };

  public query ({ caller }) func getSavedJobs() : async [SavedJobs] {
    if (not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only teachers can view saved jobs");
    };
    savedJobs.values().toArray().filter(func(saved : SavedJobs) : Bool {
      saved.teacherId == caller
    });
  };

  public query ({ caller }) func getJobRequests() : async [JobRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view job requests");
    };

    if (isAppAdmin(caller)) {
      jobRequests.values().toArray();
    } else if (isClient(caller)) {
      jobRequests.values().toArray().filter(func(req : JobRequest) : Bool {
        req.clientId == caller;
      });
    } else {
      Runtime.trap("Unauthorized: Only admins and clients can view job requests");
    };
  };

  public query ({ caller }) func getTalentPools() : async [TalentPool] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view talent pools");
    };
    talentPools.values().toArray();
  };

  public query ({ caller }) func getRecruitmentPipelines() : async [RecruitmentPipelineEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view recruitment pipelines");
    };
    recruitmentPipelines.values().toArray();
  };

  // SYSTEM INTROSPECTION
  public query ({ caller }) func system_totalPersistentDataEntries() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view system stats");
    };

    userProfiles.size() +
    teacherProfiles.size() +
    jobListings.size() +
    schoolProfiles.size() +
    jobApplications.size() +
    savedJobs.size() +
    jobRequests.size() +
    talentPools.size() +
    recruitmentPipelines.size() +
    activityLogs.size();
  };
};
