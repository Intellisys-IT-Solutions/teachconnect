// Sample data for demo purposes — displayed alongside real backend data

export interface SampleTeacher {
  id: string;
  name: string;
  subjects: string[];
  grades: string[];
  qualifications: string[];
  certifications: string[];
  yearsExperience: number;
  country: string;
  nationality: string;
  availabilityStatus: "Available" | "Interviewing" | "Placed" | "Inactive";
  employmentType: string;
  workPermitStatus: string;
  profileVisible: boolean;
  teachingPhilosophy?: string;
  employmentHistory: {
    employer: string;
    role: string;
    startYear: number;
    endYear?: number;
  }[];
}

export interface SampleJobListing {
  id: string;
  title: string;
  region: string;
  country: string;
  schoolType: string;
  roleOverview: string;
  subjectsNeeded: string[];
  gradesNeeded: string[];
  status: "Open" | "Filled" | "Closed";
  salaryRange?: string;
}

export interface SampleTalentPool {
  id: string;
  name: string;
  description: string;
  filters: string;
  icon: string;
  subjectTag?: string;
  availabilityTag?: string;
  count: number;
}

export const sampleTeachers: SampleTeacher[] = [
  {
    id: "t001",
    name: "Sarah Mitchell",
    subjects: ["English", "Literature", "Drama"],
    grades: ["Grade 7", "Grade 8", "Grade 9", "Grade 10"],
    qualifications: ["B.Ed English", "PGCE"],
    certifications: ["TEFL", "SAFE Certificate"],
    yearsExperience: 8,
    country: "United Kingdom",
    nationality: "British",
    availabilityStatus: "Available",
    employmentType: "Full-Time",
    workPermitStatus: "EU Citizen",
    profileVisible: true,
    teachingPhilosophy:
      "I believe every student has a unique voice waiting to be discovered through literature and creative expression.",
    employmentHistory: [
      {
        employer: "Harrow International School",
        role: "Senior English Teacher",
        startYear: 2019,
        endYear: 2023,
      },
      {
        employer: "St. Mary's Academy",
        role: "English Teacher",
        startYear: 2016,
        endYear: 2019,
      },
    ],
  },
  {
    id: "t002",
    name: "James Okonkwo",
    subjects: ["Mathematics", "Physics", "Further Mathematics"],
    grades: ["Grade 10", "Grade 11", "Grade 12"],
    qualifications: ["BSc Mathematics", "MSc Applied Physics", "PGCE"],
    certifications: ["IB Examiner", "SAFE Certificate"],
    yearsExperience: 12,
    country: "South Africa",
    nationality: "Nigerian",
    availabilityStatus: "Available",
    employmentType: "Full-Time",
    workPermitStatus: "Work Permit Holder",
    profileVisible: true,
    employmentHistory: [
      {
        employer: "Reddam House",
        role: "Head of Mathematics",
        startYear: 2018,
      },
      {
        employer: "King Edward VII School",
        role: "Senior Maths Teacher",
        startYear: 2012,
        endYear: 2018,
      },
    ],
  },
  {
    id: "t003",
    name: "Emma van der Berg",
    subjects: ["Life Sciences", "Biology", "Environmental Science"],
    grades: ["Grade 8", "Grade 9", "Grade 10", "Grade 11"],
    qualifications: ["BSc Biology", "B.Ed Natural Sciences"],
    certifications: ["Cambridge Educator", "SAFE Certificate"],
    yearsExperience: 6,
    country: "South Africa",
    nationality: "South African",
    availabilityStatus: "Interviewing",
    employmentType: "Full-Time",
    workPermitStatus: "Citizen",
    profileVisible: true,
    employmentHistory: [
      {
        employer: "Pretoria Boys High School",
        role: "Life Sciences Teacher",
        startYear: 2018,
      },
    ],
  },
  {
    id: "t004",
    name: "Marcus Chen",
    subjects: ["Social Sciences", "History", "Geography"],
    grades: ["Grade 4", "Grade 5", "Grade 6", "Grade 7"],
    qualifications: ["BA History & Geography", "PGCE Primary"],
    certifications: ["IB PYP Certificate"],
    yearsExperience: 5,
    country: "Singapore",
    nationality: "Singaporean",
    availabilityStatus: "Available",
    employmentType: "Full-Time",
    workPermitStatus: "PR Holder",
    profileVisible: true,
    employmentHistory: [
      {
        employer: "Singapore American School",
        role: "Primary Teacher",
        startYear: 2019,
      },
    ],
  },
  {
    id: "t005",
    name: "Priya Nair",
    subjects: ["English", "Life Skills", "Social Sciences"],
    grades: ["Grade 4", "Grade 5", "Grade 6"],
    qualifications: ["B.Ed Primary Education"],
    certifications: ["TEFL", "Montessori Level 2"],
    yearsExperience: 4,
    country: "United Arab Emirates",
    nationality: "Indian",
    availabilityStatus: "Available",
    employmentType: "Part-Time",
    workPermitStatus: "Work Permit Holder",
    profileVisible: true,
    employmentHistory: [
      {
        employer: "GEMS Wellington Academy",
        role: "Primary English Teacher",
        startYear: 2020,
      },
    ],
  },
  {
    id: "t006",
    name: "Thomas Müller",
    subjects: ["Chemistry", "Physical Sciences", "Biology"],
    grades: ["Grade 10", "Grade 11", "Grade 12"],
    qualifications: ["MSc Chemistry", "Teacher Certification (Germany)"],
    certifications: ["IB Examiner", "SAFE Certificate"],
    yearsExperience: 15,
    country: "Germany",
    nationality: "German",
    availabilityStatus: "Placed",
    employmentType: "Full-Time",
    workPermitStatus: "EU Citizen",
    profileVisible: true,
    employmentHistory: [
      {
        employer: "Munich International School",
        role: "Head of Sciences",
        startYear: 2015,
      },
      {
        employer: "Deutsche Schule",
        role: "Chemistry Teacher",
        startYear: 2009,
        endYear: 2015,
      },
    ],
  },
  {
    id: "t007",
    name: "Fatima Al-Rashid",
    subjects: ["Arabic", "Islamic Studies", "Social Sciences"],
    grades: ["Grade 1", "Grade 2", "Grade 3", "Grade 4"],
    qualifications: ["BA Arabic Education", "Diploma in Islamic Studies"],
    certifications: ["MOE UAE Certified"],
    yearsExperience: 9,
    country: "United Arab Emirates",
    nationality: "Jordanian",
    availabilityStatus: "Available",
    employmentType: "Full-Time",
    workPermitStatus: "Work Permit Holder",
    profileVisible: true,
    employmentHistory: [
      {
        employer: "Jumeirah English Speaking School",
        role: "Arabic Teacher",
        startYear: 2015,
      },
    ],
  },
  {
    id: "t008",
    name: "David Khumalo",
    subjects: ["Physical Education", "Health Sciences", "Life Orientation"],
    grades: ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"],
    qualifications: ["BSc Sport Science", "B.Ed Physical Education"],
    certifications: ["First Aid Level 3", "SAFE Certificate"],
    yearsExperience: 7,
    country: "South Africa",
    nationality: "South African",
    availabilityStatus: "Available",
    employmentType: "Full-Time",
    workPermitStatus: "Citizen",
    profileVisible: true,
    employmentHistory: [
      {
        employer: "Bishops Diocesan College",
        role: "PE Head of Department",
        startYear: 2017,
      },
    ],
  },
  {
    id: "t009",
    name: "Sophie Laurent",
    subjects: ["French", "English as Additional Language", "Literature"],
    grades: ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11"],
    qualifications: ["MA French Literature", "PGCE Modern Languages"],
    certifications: ["DELF Examiner", "Cambridge CELTA"],
    yearsExperience: 11,
    country: "France",
    nationality: "French",
    availabilityStatus: "Interviewing",
    employmentType: "Full-Time",
    workPermitStatus: "EU Citizen",
    profileVisible: true,
    employmentHistory: [
      {
        employer: "Lycée International de Saint-Germain",
        role: "French & EAL Teacher",
        startYear: 2013,
      },
    ],
  },
  {
    id: "t010",
    name: "Ravi Krishnamurthy",
    subjects: ["Information Technology", "Computer Science", "Mathematics"],
    grades: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
    qualifications: ["BTech Computer Science", "B.Ed"],
    certifications: ["Google Certified Educator", "Microsoft Educator"],
    yearsExperience: 8,
    country: "India",
    nationality: "Indian",
    availabilityStatus: "Available",
    employmentType: "Full-Time",
    workPermitStatus: "Work Permit Holder",
    profileVisible: true,
    employmentHistory: [
      { employer: "Delhi Public School", role: "ICT Teacher", startYear: 2016 },
    ],
  },
  {
    id: "t011",
    name: "Nomvula Dlamini",
    subjects: ["Foundation Phase", "English", "Mathematics"],
    grades: ["Grade R", "Grade 1", "Grade 2", "Grade 3"],
    qualifications: [
      "B.Ed Foundation Phase",
      "Early Childhood Development Cert",
    ],
    certifications: ["Montessori Level 1", "SAFE Certificate"],
    yearsExperience: 3,
    country: "South Africa",
    nationality: "South African",
    availabilityStatus: "Available",
    employmentType: "Full-Time",
    workPermitStatus: "Citizen",
    profileVisible: true,
    employmentHistory: [
      {
        employer: "Curro Waterfall",
        role: "Foundation Phase Teacher",
        startYear: 2021,
      },
    ],
  },
  {
    id: "t012",
    name: "Alexander Petrov",
    subjects: ["Economics", "Business Studies", "Accounting"],
    grades: ["Grade 10", "Grade 11", "Grade 12"],
    qualifications: ["BCom Economics", "PGCE Commerce"],
    certifications: ["Cambridge A-Level Examiner", "SAFE Certificate"],
    yearsExperience: 14,
    country: "South Africa",
    nationality: "Russian",
    availabilityStatus: "Inactive",
    employmentType: "Contract",
    workPermitStatus: "Permanent Resident",
    profileVisible: false,
    employmentHistory: [
      {
        employer: "St Stithians College",
        role: "Head of Commerce",
        startYear: 2010,
        endYear: 2024,
      },
    ],
  },
];

export const sampleJobListings: SampleJobListing[] = [
  {
    id: "j001",
    title: "Senior Mathematics Teacher",
    region: "Johannesburg North",
    country: "South Africa",
    schoolType: "Private Independent",
    roleOverview:
      "We are seeking an experienced Mathematics teacher for Grades 10-12. The successful candidate will be responsible for advanced Maths and Further Maths. Strong IB or A-Level background preferred.",
    subjectsNeeded: ["Mathematics", "Further Mathematics"],
    gradesNeeded: ["Grade 10", "Grade 11", "Grade 12"],
    status: "Open",
    salaryRange: "R35,000 – R48,000/month",
  },
  {
    id: "j002",
    title: "Primary English Teacher",
    region: "Dubai",
    country: "United Arab Emirates",
    schoolType: "International School",
    roleOverview:
      "Exciting opportunity at a leading international school in Dubai for an enthusiastic English teacher with primary experience. TEFL certification required. Accommodation provided.",
    subjectsNeeded: ["English", "English as Additional Language"],
    gradesNeeded: ["Grade 4", "Grade 5", "Grade 6"],
    status: "Open",
    salaryRange: "AED 10,000 – 15,000/month + benefits",
  },
  {
    id: "j003",
    title: "Life Sciences & Biology Teacher",
    region: "Cape Town",
    country: "South Africa",
    schoolType: "Private Independent",
    roleOverview:
      "Well-established independent school seeks a passionate Life Sciences teacher for the Senior Phase. Cambridge curriculum experience advantageous.",
    subjectsNeeded: ["Life Sciences", "Biology"],
    gradesNeeded: ["Grade 9", "Grade 10", "Grade 11"],
    status: "Open",
    salaryRange: "R28,000 – R38,000/month",
  },
  {
    id: "j004",
    title: "IB Computer Science Teacher",
    region: "Singapore",
    country: "Singapore",
    schoolType: "International Baccalaureate",
    roleOverview:
      "International IB school seeking a dedicated Computer Science teacher for the Diploma Programme. Experience with IB curriculum mandatory. Relocation package available.",
    subjectsNeeded: ["Computer Science", "Information Technology"],
    gradesNeeded: ["Grade 11", "Grade 12"],
    status: "Open",
    salaryRange: "SGD 5,000 – 7,500/month",
  },
  {
    id: "j005",
    title: "Head of Social Sciences",
    region: "Pretoria East",
    country: "South Africa",
    schoolType: "Independent School",
    roleOverview:
      "Leadership opportunity for an experienced Social Sciences educator to head a dynamic department. Must have management experience and strong CAPS curriculum knowledge.",
    subjectsNeeded: ["Social Sciences", "History", "Geography"],
    gradesNeeded: ["Grade 7", "Grade 8", "Grade 9"],
    status: "Filled",
    salaryRange: "R40,000 – R55,000/month",
  },
  {
    id: "j006",
    title: "Foundation Phase Teacher",
    region: "Sandton",
    country: "South Africa",
    schoolType: "Private School",
    roleOverview:
      "Nurturing, experienced Foundation Phase teacher required for a premium private school in Sandton. Montessori-influenced approach. Small class sizes.",
    subjectsNeeded: ["Foundation Phase", "English", "Mathematics"],
    gradesNeeded: ["Grade R", "Grade 1", "Grade 2"],
    status: "Open",
    salaryRange: "R22,000 – R30,000/month",
  },
];

export const sampleTalentPools: SampleTalentPool[] = [
  {
    id: "pool001",
    name: "Social Sciences Teachers",
    description:
      "Qualified History, Geography, and Social Sciences educators for all phases.",
    filters: '{"subjects":["Social Sciences","History","Geography"]}',
    icon: "🌍",
    subjectTag: "Social Sciences",
    count: 3,
  },
  {
    id: "pool002",
    name: "Life Sciences Specialists",
    description:
      "Biology, Life Sciences, and Environmental Science teachers with strong laboratory skills.",
    filters: '{"subjects":["Life Sciences","Biology","Environmental Science"]}',
    icon: "🔬",
    subjectTag: "Life Sciences",
    count: 2,
  },
  {
    id: "pool003",
    name: "High School Mathematics",
    description:
      "Senior phase Maths and Further Mathematics teachers, many with IB examiner credentials.",
    filters:
      '{"subjects":["Mathematics","Further Mathematics"],"grades":["Grade 10","Grade 11","Grade 12"]}',
    icon: "📐",
    subjectTag: "Mathematics",
    count: 2,
  },
  {
    id: "pool004",
    name: "Primary Phase (Grade 1–6)",
    description:
      "Foundation and intermediate phase specialists experienced with young learners.",
    filters:
      '{"grades":["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"]}',
    icon: "🎒",
    count: 4,
  },
  {
    id: "pool005",
    name: "Urgent Availability",
    description:
      "Teachers actively available and ready to start within 2–4 weeks.",
    filters: '{"availabilityStatus":"Available"}',
    icon: "⚡",
    availabilityTag: "Available",
    count: 8,
  },
  {
    id: "pool006",
    name: "International School Specialists",
    description:
      "Teachers with IB, Cambridge, or international curriculum experience.",
    filters:
      '{"certifications":["IB Examiner","Cambridge Educator","Cambridge A-Level Examiner"]}',
    icon: "✈️",
    count: 5,
  },
];

export const samplePipelineEntries = [
  {
    id: "pe001",
    candidateId: "t001",
    jobId: "j001",
    stage: "Screening",
    candidateName: "Sarah Mitchell",
    jobTitle: "Senior Mathematics Teacher",
  },
  {
    id: "pe002",
    candidateId: "t002",
    jobId: "j001",
    stage: "Interview",
    candidateName: "James Okonkwo",
    jobTitle: "Senior Mathematics Teacher",
  },
  {
    id: "pe003",
    candidateId: "t003",
    jobId: "j003",
    stage: "Offer",
    candidateName: "Emma van der Berg",
    jobTitle: "Life Sciences Teacher",
  },
  {
    id: "pe004",
    candidateId: "t004",
    jobId: "j002",
    stage: "Sourced",
    candidateName: "Marcus Chen",
    jobTitle: "Primary English Teacher",
  },
  {
    id: "pe005",
    candidateId: "t010",
    jobId: "j004",
    stage: "Interview",
    candidateName: "Ravi Krishnamurthy",
    jobTitle: "IB Computer Science Teacher",
  },
  {
    id: "pe006",
    candidateId: "t006",
    jobId: "j005",
    stage: "Placed",
    candidateName: "Thomas Müller",
    jobTitle: "Head of Social Sciences",
  },
  {
    id: "pe007",
    candidateId: "t007",
    jobId: "j002",
    stage: "Screening",
    candidateName: "Fatima Al-Rashid",
    jobTitle: "Primary English Teacher",
  },
];
