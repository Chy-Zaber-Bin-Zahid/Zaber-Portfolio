import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  name: "Zaber Bin Zahid",
  initials: "CZ",
  url: "https://github.com/",
  location: "Mirpur-6, Dhaka, Bangladesh",
  locationLink: "https://www.google.com/maps/place/Mirpur+6,+Dhaka",
  description:
    "Full-Stack Software Engineer with 1+ year of professional experience in web development and AI, specializing in building scalable applications and solving real-world problems.",
  summary:
    "I'm a Full-Stack Software Engineer currently working as an Associate Software Engineer at [FIGLAB](#work), where I build scalable web applications and explore AI-powered tooling. Previously, I interned at [Monstarlab](#work) on production HRMS software. I graduated from [BRAC University](#education) with a B.Sc. in Computer Science. I love building things across the stack — from Next.js page-builders and Electron desktop apps to backend APIs with Node, Nest, and Postgres — and I'm always experimenting with new tools and ideas.",
  avatarUrl: "/me.jpeg",
  skills: [
    { name: "TypeScript", icon: Typescript },
    { name: "JavaScript", icon: null },
    { name: "Python", icon: Python },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Node.js", icon: Nodejs },
    { name: "Express", icon: null },
    { name: "NestJS", icon: null },
    { name: "Tailwind CSS", icon: null },
    { name: "Redux", icon: null },
    { name: "Zustand", icon: null },
    { name: "TanStack Query", icon: null },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "MySQL", icon: null },
    { name: "MongoDB", icon: null },
    { name: "Redis", icon: null },
    { name: "Supabase", icon: null },
    { name: "Firebase", icon: null },
    { name: "Docker", icon: Docker },
    { name: "Electron", icon: null },
    { name: "Jest", icon: null },
    { name: "REST", icon: null },
    { name: "GraphQL", icon: null },
    { name: "JWT", icon: null },
    { name: "CI/CD", icon: null },
    { name: "AWS (EC2, RDS, S3)", icon: null },
    { name: "Cloudflare R2", icon: null },
    { name: "Git", icon: null },
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "chowdhury.zaber.bin.zahid@gmail.com",
    tel: "+8801741978190",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:chowdhury.zaber.bin.zahid@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "FIGLAB",
      href: "#",
      badges: [],
      location: "Dhaka, Bangladesh",
      title: "Associate Software Engineer",
      logoUrl: "",
      start: "November 2025",
      end: "Present",
      description:
        "Building scalable full-stack web applications and AI-powered tooling.",
    },
    {
      company: "Monstarlab",
      href: "#",
      badges: [],
      location: "Dhaka, Bangladesh",
      title: "Software Engineering Intern",
      logoUrl: "",
      start: "July 2025",
      end: "October 2025",
      description:
        "Worked on the existing Next.js frontend of MonstarPeople (HRMS), focusing on usability and stability improvements. Implemented subscription-based workflows and frontend integrations. Researched and selected localization solutions for scalable multi-language support. Collaborated through Git and GitHub using rebasing, cherry-picking, pull requests, merges, and code reviews.",
    },
  ],
  education: [
    {
      school: "BRAC University",
      href: "https://www.bracu.ac.bd/",
      degree: "B.Sc. in Computer Science (CGPA: 3.52 / 4.00)",
      logoUrl: "",
      start: "2020",
      end: "2024",
    },
  ],
  projects: [
    {
      title: "Klasio",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "AI-powered LMS. Enhanced a custom Next.js page-builder with reusable blocks for better user customization. Conducted R&D on prebuilt blocks, enabling drag-and-drop of blocks containing other blocks with automatic unique ID generation to prevent JSON conflicts. Fixed a long-standing Next.js progress bar issue by upgrading incompatible dependencies to support Next.js 15. Enabled SPA-like interactions by integrating Inertia.js and converting Laravel Blade views to React.",
      technologies: [
        "Next.js",
        "TypeScript",
        "React",
        "Inertia.js",
        "Laravel",
        "Tailwind CSS",
      ],
      links: [
        {
          type: "Live Site",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "MonstarPeople",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "Employee Attendance Tracking Software and HRMS. Worked on the existing Next.js frontend, focusing on usability and stability improvements. Implemented subscription-based workflows and frontend integrations. Researched and selected localization solutions for scalable multi-language support.",
      technologies: [
        "Next.js",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "i18n",
      ],
      links: [
        {
          type: "Live Site",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Elevate Education Exam Portal",
      href: "#",
      dates: "2024 - 2025",
      active: true,
      description:
        "Computer-Based IELTS Mock Test App. Developed a cross-platform IELTS exam app supporting offline (SQLite) and online (PostgreSQL/Supabase) modes with Cloudflare R2 storage. Optimized web performance with Redis caching for frequently accessed APIs. Implemented secure copy protection using unique machine IDs and a custom installer wizard. Built an auto-updater via GitHub Releases for seamless desktop updates.",
      technologies: [
        "Electron",
        "React",
        "TypeScript",
        "PostgreSQL",
        "SQLite",
        "Supabase",
        "Redis",
        "Cloudflare R2",
      ],
      links: [
        {
          type: "Client Page",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  hackathons: [],
} as const;
