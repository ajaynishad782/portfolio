/**
 * Centralized portfolio data — the single source of truth for all personal content.
 *
 * ▶ EDIT THIS FILE to make the site yours. Replace every `[YOUR ...]` placeholder
 *   and the sample entries below with your real information. No personal data is
 *   hardcoded anywhere else in the UI — components read exclusively from here.
 *
 * Notes:
 *  - Leave a section's array empty (`[]`) to hide that section entirely.
 *  - `avatar` and `resume` point at files in /public. Add public/profile.jpg and
 *    public/resume.pdf to activate them (the UI degrades gracefully without them).
 */

import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Layers,
  Network,
  Sparkles,
} from "lucide-react";

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter?: string;
  website?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  problem?: string;
  solution?: string;
  technologies: string[];
  image?: string; // e.g. "/projects/my-app.png"
  github?: string;
  demo?: string;
  featured?: boolean;
  highlights?: string[];
}

export interface EducationItem {
  degree: string;
  institution?: string;
  period: string;
  details?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year?: string;
  url?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Personal {
  name: string;
  shortName: string;
  title: string;
  intro: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  avatar: string;
  resume: string;
  availability: string;
}

export interface Portfolio {
  personal: Personal;
  social: SocialLinks;
  focus: string[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
}

/**
 * True when a string field holds a real value rather than a `[PLACEHOLDER]`.
 * Used across the UI to hide links/sections until real data is filled in.
 */
export function isSet(value?: string): boolean {
  return !!value && !value.startsWith("[");
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const portfolio: Portfolio = {
  personal: {
    name: "Ajay Nishad",
    /** Short label used in the browser tab / logo. */
    shortName: "Ajay Nishad",
    title: "Senior Full Stack Engineer",
    /** One-to-two sentence hero introduction. */
    intro:
      "I design and build production web and mobile applications — from scalable logistics platforms to AI-powered automation — with React, React Native, and Node.js.",
    /** Longer About paragraph. */
    summary:
      "Senior Full Stack Engineer with 6+ years of experience designing and delivering production web and mobile applications across logistics, fintech, healthcare, and business automation. I specialize in React.js, React Native, and Node.js (Express/NestJS) with MongoDB, PostgreSQL, and MySQL — building scalable architectures, well-designed APIs, real-time workflows, and secure authentication. I also lead frontend and mobile teams, mentor developers, and integrate AI capabilities using Azure OpenAI.",
    location: "Lucknow, India",
    email: "ajaynishad782@gmail.com",
    phone: "+91-7070360901",
    // Add public/profile.jpg, then set this to "/profile.jpg". While empty the
    // hero shows your initials as a placeholder (and avoids a 404 request).
    avatar: "",
    resume: "/resume.pdf",
    availability: "Available for opportunities",
  },

  social: {
    github: "https://github.com/ajaynishad782",
    linkedin: "https://www.linkedin.com/in/ajay-nishad-258828176/",
    // twitter: "[YOUR X/TWITTER URL]",
    // website: "[YOUR WEBSITE URL]",
  },

  /** Things you emphasize as an engineer — shown in the About section. */
  focus: [
    "Scalable architecture & modular design",
    "API design and real-time workflows",
    "Performance optimization",
    "Technical leadership & mentoring",
    "AI-powered application development",
  ],

  skills: [
    {
      id: "frontend",
      label: "Frontend",
      icon: Code2,
      items: [
        "React.js",
        "Next.js",
        "React Native",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Bootstrap",
      ],
    },
    {
      id: "backend",
      label: "Backend",
      icon: Server,
      items: ["Node.js", "Express.js", "NestJS"],
    },
    {
      id: "database",
      label: "Databases",
      icon: Database,
      items: ["MongoDB", "PostgreSQL", "MySQL"],
    },
    {
      id: "state-data",
      label: "State & Data",
      icon: Layers,
      items: ["Redux Toolkit", "Context API", "TanStack Query"],
    },
    {
      id: "api-architecture",
      label: "API & Architecture",
      icon: Network,
      items: [
        "REST APIs",
        "GraphQL",
        "JWT Authentication",
        "RBAC",
        "Modular Architecture",
        "Performance Optimization",
      ],
    },
    {
      id: "devops",
      label: "DevOps & Tools",
      icon: Cloud,
      items: ["Git", "GitHub", "CI/CD", "Docker", "Postman", "Jira"],
    },
    {
      id: "ai",
      label: "AI Application Development",
      icon: Sparkles,
      items: [
        "Azure OpenAI",
        "AI document processing",
        "LLM-assisted development",
        "Claude",
        "Gemini",
        "GitHub Copilot",
      ],
    },
  ] satisfies SkillCategory[],

  experience: [
    {
      role: "Software Developer",
      company: "DEVtrust Enterprises",
      period: "Mar 2023 – Present",
      location: "Lucknow, India",
      description:
        "Technical lead for frontend and mobile teams, driving scalable web and mobile applications across multiple business domains.",
      highlights: [
        "Lead architecture and development of scalable web and mobile applications supporting complex business workflows across multiple domains.",
        "Own end-to-end delivery from requirement analysis and technical design through development, testing, production deployment, and support.",
        "Act as technical lead for frontend and mobile teams, guiding architecture decisions, code quality, maintainability, and scalability.",
      ],
      technologies: [
        "React.js",
        "Next.js",
        "React Native",
        "Node.js",
        "NestJS",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    {
      role: "Software Developer",
      company: "Observance Solutions",
      period: "Sep 2022 – Feb 2023",
      description:
        "Built high-performance production applications with complex state management and secure APIs.",
      highlights: [
        "Built high-performance applications with complex state management and real-time data handling.",
        "Designed secure REST APIs and authentication systems for production applications.",
        "Improved UX and performance through code refactoring, load-time optimization, and targeted performance tuning.",
      ],
      technologies: ["React.js", "Node.js", "Express.js", "REST APIs", "JWT"],
    },
    {
      role: "Software Developer",
      company: "DEVtrust Enterprises",
      period: "Jan 2021 – Aug 2022",
      location: "Lucknow, India",
      description:
        "Developed full-stack MERN and cross-platform React Native applications with a focus on maintainable architecture.",
      highlights: [
        "Developed full-stack MERN applications and cross-platform React Native mobile applications.",
        "Implemented modular application architecture to improve maintainability, scalability, and delivery consistency.",
        "Diagnosed and resolved performance bottlenecks in high-traffic applications and production workflows.",
      ],
      technologies: [
        "React.js",
        "React Native",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
    },
    {
      role: "Web Developer",
      company: "Lead Scraper Technology",
      period: "Sep 2019 – Dec 2020",
      description:
        "Built custom WordPress solutions and MySQL-backed automation for business workflows.",
      highlights: [
        "Developed custom WordPress solutions with a focus on performance, responsive implementation, and SEO improvements.",
        "Integrated third-party APIs and automated business workflows using MySQL-backed applications.",
      ],
      technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
    },
  ] satisfies ExperienceItem[],

  projects: [
    {
      name: "Moveit4U – Transportation Management System",
      description:
        "A scalable logistics platform re-architected from an underperforming system, with role-based operational workflows and real-time tracking for logistics teams.",
      problem:
        "An existing transportation platform struggled with performance and scalability as operations grew.",
      solution:
        "Re-architected the system into a scalable logistics solution with role-based workflows and real-time tracking, improving stability across core operations.",
      technologies: [
        "React.js",
        "Node.js",
        "PostgreSQL",
        "React Native",
        "REST APIs",
      ],
      image: "",
      github: "[GITHUB URL]",
      demo: "[LIVE DEMO URL]",
      featured: true,
      highlights: [
        "Role-based operational workflows",
        "Real-time tracking for logistics teams",
        "System stability & performance improvements",
      ],
    },
    {
      name: "Invoice Bridge AI – AI Invoice Automation",
      description:
        "An AI-powered invoice processing solution using Azure OpenAI to automate invoice data extraction and integrate it into ERP workflows.",
      problem:
        "Manual invoice processing was slow and error-prone across business workflows.",
      solution:
        "Built automated document processing with Azure OpenAI to extract invoice data and feed it into ERP workflows, reducing manual effort.",
      technologies: ["Azure OpenAI", "Node.js", "React.js", "REST APIs"],
      image: "",
      github: "[GITHUB URL]",
      demo: "[LIVE DEMO URL]",
      featured: true,
      highlights: [
        "AI-powered invoice data extraction",
        "ERP workflow integration",
        "Reduced manual processing effort",
      ],
    },
    {
      name: "Ezeryeshiva – Appointment & Workflow Platform",
      description:
        "A purpose-built application that replaced Airtable-based workflows, improving data integrity, workflow control, and operational efficiency.",
      technologies: ["React.js", "Node.js", "MongoDB"],
      image: "",
      github: "[GITHUB URL]",
      demo: "[LIVE DEMO URL]",
      featured: true,
      highlights: [
        "Replaced Airtable-based workflows",
        "Improved data integrity & workflow control",
      ],
    },
    {
      name: "Quant Capital – Fintech Investment App",
      description:
        "A fintech investment mobile platform with trading integration, built with React Native.",
      technologies: ["React Native", "Node.js", "REST APIs"],
      image: "",
      github: "[GITHUB URL]",
      demo: "",
      featured: false,
    },
    {
      name: "Spero Institute – Therapy Management System",
      description:
        "Patient tracking and clinician workflow tools supporting day-to-day operational processes for a therapy practice.",
      technologies: ["React.js", "Node.js", "PostgreSQL"],
      image: "",
      github: "[GITHUB URL]",
      demo: "",
      featured: false,
    },
    {
      name: "The Park Gym – Member Management System",
      description:
        "Member and staff management for a boxing and fitness gym, available as both a web platform and a mobile application.",
      technologies: ["React.js", "React Native", "Node.js", "MongoDB"],
      image: "",
      github: "[GITHUB URL]",
      demo: "",
      featured: false,
    },
  ] satisfies ProjectItem[],

  education: [
    {
      degree: "B.Sc. Information Technology",
      period: "2016 – 2019",
    },
  ] satisfies EducationItem[],

  certifications: [
    // {
    //   name: "[CERTIFICATION NAME]",
    //   issuer: "[ISSUER]",
    //   year: "[YEAR]",
    //   url: "[VERIFICATION URL]",
    // },
  ],
};
