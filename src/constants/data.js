export const skillGroups = [
  { label: "core_java", items: ["Java", "JDBC", "JSP", "Servlets"] },
  { label: "spring_stack", items: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Cloud", "Hibernate", "JPA", "Microservices"] },
  { label: "apis_tools", items: ["REST APIs", "Swagger", "Postman", "Kafka", "OpenFeign", "Eureka"] },
  { label: "databases", items: ["Oracle", "MySQL", "PostgreSQL", "H2"] },
  { label: "cloud_devops", items: ["AWS", "Docker", "Jenkins", "SonarQube", "Maven", "Git"] },
  { label: "testing", items: ["JUnit", "Mockito", "JMeter"] },
  { label: "frontend", items: ["HTML", "CSS", "JavaScript", "React.js"] },
];

export const projects = [
  {
    name: "PharmaGo",
    desc: "Online medicine ordering platform with OCR-based prescription search, secure uploads, and real-time reminders.",
    stack: ["Java", "Spring Boot", "Hibernate", "PostgreSQL", "React", "JWT", "OCR"],
    link: "https://github.com/deepalij371/PharmaGo",
  },
  {
    name: "Blog Application",
    desc: "Full-stack blogging platform with secure authentication, role-based authorization, and a responsive React UI.",
    stack: ["Spring Boot", "Spring Data JPA", "MySQL", "Spring Security", "React.js"],
    link: "https://github.com/deepalij371/blogapplication1.git",
  },
  {
    name: "Online Food Delivery",
    desc: "Microservices-based delivery system: independent User, Restaurant, Order, and Payment services with Eureka + API Gateway.",
    stack: ["Spring Cloud", "Eureka", "API Gateway", "OpenFeign", "Docker", "React.js"],
    link: "https://github.com/deepalij371/Food-Delivery-Project.git",
  },
  {
    name: "Global Carbon Warrior",
    desc: "Climate-tech platform for startups and investors. Built REST APIs, JWT security, OTP verification, S3 uploads, Kafka scheduling.",
    stack: ["Spring Boot", "JWT", "AWS S3", "Kafka"],
    link: null,
    note: "Built during internship at Nexturn India",
  },
];

export const experience = [
  {
    title: "Java Developer Intern",
    org: "Nexturn India Private Limited",
    time: "Nov 2024 — Jul 2025",
    points: [
      "Developed Spring Boot REST APIs for Global Carbon Warrior, with JWT security and OTP email verification.",
      "Built AWS S3 file upload, Excel export, and paginated filtering modules.",
      "Integrated Kafka streaming and scheduled reminder jobs via Spring Scheduler.",
    ],
  },
  {
    title: "Full Stack Java Training",
    org: "Naresh IT, Hyderabad",
    time: "Training program",
    points: [
      "Backend: Core Java, Advanced Java, Spring, Spring Boot, Hibernate.",
      "Database: Oracle. Frontend: HTML, CSS, JavaScript.",
    ],
  },
];

export const education = [
  {
    title: "B.Tech, Computer Science and Engineering",
    org: "Govt. College of Engineering, Kalahandi — BPUT University",
    time: "2020 — 2023",
    detail: "CGPA: 8.1 / 10",
  },
  {
    title: "Diploma in Information Technology",
    org: "Bhubanananda Odisha School of Engineering — SCTEVT, Odisha",
    time: "2017 — 2020",
    detail: "Percentage: 81%",
  },
  {
    title: "HSC (10th)",
    org: "Bidyadharpur Girls High School — BSE, Odisha",
    time: "2017",
    detail: "Percentage: 71%",
  },
];

export const NAV_ITEMS = [
  { id: "home", label: "HOME" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "education", label: "EDUCATION" },
  { id: "contact", label: "CONTACT" },
];

export const ROLES = [
  "JAVA DEVELOPER",
  "SPRING BOOT ENGINEER",
  "MICROSERVICES BUILDER",
  "REST API DEVELOPER",
];

export const STATS = [
  { label: "yrs experience", value: "1+" },
  { label: "projects shipped", value: "4" },
  { label: "cgpa", value: "8.1" },
  { label: "technologies", value: "30+" },
];

export const DEFAULT_BIO =
  "Specializing in Spring Boot, microservices, and secure REST APIs. Merging backend architecture with production-grade engineering.";
