import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiTailwindcss,
  SiRedux,
  SiReactquery,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiFirebase,
  SiDocker,
  SiElectron,
  SiJest,
  SiGraphql,
  SiGithubactions,
  SiCloudflare,
  SiGit,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { GiBearFace } from "react-icons/gi";

export const DATA = {
  name: "Zaber Bin Zahid",
  initials: "CZ",
  url: "https://github.com/",
  location: "Mirpur-6, Dhaka, Bangladesh",
  locationLink: "https://www.google.com/maps/place/Mirpur+6,+Dhaka",
  description:
    "Full-Stack Software Engineer with 1+ year of professional experience in web development and AI, specializing in building scalable applications and solving real-world problems.",
  summary:
    "Currently, I work as an Associate Software Engineer at [FIGLAB](#work), where I contribute to building and optimizing modern web solutions. Previously, I interned as a Software Engineering Intern at [Monstarlab](#work), worked as a Front-end Developer Intern at [6sense Technologies](#work), and served as a Junior Software Engineer at [W3 Engineers Ltd](#work), gaining valuable real-world development experience.",
  avatarUrl: "/me.jpeg",
  skills: [
    { name: "TypeScript", icon: SiTypescript },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Python", icon: SiPython },
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express", icon: SiExpress },
    { name: "NestJS", icon: SiNestjs },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Redux", icon: SiRedux },
    { name: "Zustand", icon: GiBearFace },
    { name: "TanStack Query", icon: SiReactquery },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MySQL", icon: SiMysql },
    { name: "SQLite", icon: SiSqlite },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Redis", icon: SiRedis },
    { name: "Supabase", icon: SiSupabase },
    { name: "Firebase", icon: SiFirebase },
    { name: "Docker", icon: SiDocker },
    { name: "Electron", icon: SiElectron },
    { name: "Jest", icon: SiJest },
    { name: "REST", icon: TbApi },
    { name: "GraphQL", icon: SiGraphql },
    { name: "CI/CD", icon: SiGithubactions },
    { name: "AWS (EC2, RDS, S3)", icon: FaAws },
    { name: "Cloudflare (R2, D1)", icon: SiCloudflare },
    { name: "Git", icon: SiGit },
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "chowdhury.zaber.bin.zahid@gmail.com",
    tel: "+8801741978190",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Chy-Zaber-Bin-Zahid",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/chowdhury-zaber-bin-zahid/",
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
      logoUrl: "/figlab.png",
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
      logoUrl: "/monstarlab_logo.jpeg",
      start: "July 2025",
      end: "October 2025",
      description:
        "Worked on the existing Next.js frontend of MonstarPeople (HRMS), focusing on usability and stability improvements. Implemented subscription-based workflows and frontend integrations. Researched and selected localization solutions for scalable multi-language support. Collaborated through Git and GitHub using rebasing, cherry-picking, pull requests, merges, and code reviews.",
    },
    {
      company: "W3 Engineers Ltd.",
      href: "#",
      badges: [],
      location: "Dhaka, Bangladesh (Onsite)",
      title: "Junior Software Engineer",
      logoUrl: "/w3engineers.jpeg",
      start: "November 2024",
      end: "May 2025",
      description:
        "Worked as a Junior Software Engineer building and maintaining production web applications.",
    },
    {
      company: "6sense HQ",
      href: "#",
      badges: [],
      location: "Dhaka, Bangladesh (Onsite)",
      title: "Front-end Developer Intern",
      logoUrl: "/6sense.png",
      start: "March 2024",
      end: "May 2024",
      description:
        "Front-end developer intern building and improving UI features for production web applications.",
    },
  ],
  education: [
    {
      school: "BRAC University",
      href: "https://www.bracu.ac.bd/",
      degree: "B.Sc. in Computer Science (CGPA: 3.52 / 4.00)",
      logoUrl: "/bracu.jpg",
      start: "May 2020",
      end: "June 2024",
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
    {
      title: "Campus Tutor",
      href: "https://github.com/Chy-Zaber-Bin-Zahid/Campus-Tutor",
      dates: "2025",
      active: true,
      description:
        "Web platform connecting students with campus tutors. Built with Next.js and TypeScript.",
      technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://campustutor.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Chy-Zaber-Bin-Zahid/Campus-Tutor",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Tech Companies in Bangladesh",
      href: "https://github.com/Chy-Zaber-Bin-Zahid/Tech-Companies-in-Bangladesh",
      dates: "2025",
      active: true,
      description:
        "Open-source web app that serves as a directory of technology companies in Bangladesh. Provides a searchable and sortable table of companies with names, office locations, technologies used, and links to their online presence — built to help developers find jobs.",
      technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://techcobd.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Chy-Zaber-Bin-Zahid/Tech-Companies-in-Bangladesh",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Video Chat App",
      href: "https://github.com/Chy-Zaber-Bin-Zahid/Video-chat-app",
      dates: "2025",
      active: true,
      description:
        "Simple peer-to-peer video chat app built with React, Node.js, and WebRTC. Connect with friends instantly by sharing a room ID — no registration required.",
      technologies: ["React", "Node.js", "WebRTC", "JavaScript"],
      links: [
        {
          type: "Website",
          href: "https://video-chat-app-gjy8.onrender.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Chy-Zaber-Bin-Zahid/Video-chat-app",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "CodeSync5",
      href: "https://github.com/Chy-Zaber-Bin-Zahid/CodeSync5",
      dates: "2024",
      active: true,
      description:
        "Marketing site for CodeSync5 — an IT company specializing in AI, web and mobile development, eCommerce, UI/UX, and graphic design. Designed to deliver tailored solutions blending creativity and technology.",
      technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://codesync5.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Chy-Zaber-Bin-Zahid/CodeSync5",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Hasan Here",
      href: "https://github.com/Chy-Zaber-Bin-Zahid/Hasan-Here",
      dates: "2024 - 2025",
      active: true,
      description:
        "Interactive IELTS preparation website providing users with practice tests for the Reading and Listening sections of the IELTS exam. Built with Next.js and React with a focus on creating an engaging and user-friendly experience for IELTS test-takers.",
      technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://hasanhere.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Chy-Zaber-Bin-Zahid/Hasan-Here",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Valorant Match Tracker",
      href: "https://github.com/Chy-Zaber-Bin-Zahid/Valorant-Match-Tracker",
      dates: "2024",
      active: true,
      description:
        "Web app that fetches and displays the last 9–10 match history of any Valorant player by providing their in-game name and tag, using the Riot Games API.",
      technologies: ["JavaScript", "React", "Riot API"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Chy-Zaber-Bin-Zahid/Valorant-Match-Tracker",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Smart Tech",
      href: "https://github.com/Chy-Zaber-Bin-Zahid/Smart-Tech",
      dates: "2024",
      active: true,
      description:
        "High-performance MERN-stack e-commerce web app inspired by Bangladesh's renowned Star Tech, featuring product listings, cart, and checkout flows built on MongoDB, Express.js, React, and Node.js.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "JavaScript",
      ],
      links: [
        {
          type: "Website",
          href: "https://smart-tech-47.netlify.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Chy-Zaber-Bin-Zahid/Smart-Tech",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  recommendations: [
    {
      name: "Azmul Hossain",
      avatarUrl: "/azmul.jpeg",
      title:
        "Senior Software Engineer with 9+ years' experience, built 10+ live websites using cutting-edge tech. Skilled in team leading and consulting, collaborated with developers in Europe, America, and Japan.",
      relationship: "Azmul was Chowdhury Zaber's mentor",
      date: "March 4, 2026",
      message:
        "I had the chance to work with and mentor Zaber during his 2.5-month internship at Monstarlab BD. During that time, he showed a lot of patience, dedication, and a strong sense of ownership in his work. For example, he would identify bugs or areas for improvement on his own, report them to the team, and start working on them immediately. He was proactive, reliable, and picked up tasks quickly, making him an excellent team member.",
    },
    {
      name: "Muhammad Abul Hasan",
      avatarUrl: "/hasan.png",
      title: "Founder & Director at Elevate Education",
      relationship: "Muhammad was Chowdhury Zaber's client",
      date: "February 23, 2026",
      message:
        "When I was looking to develop a software solution for my IELTS institute, where students could practice and take tests, I reached out to Zaber. From the very beginning, he agreed to take on the project with confidence and a positive attitude.\n\nAt that time, I was extremely busy and could only provide him with a basic outline of what I needed. Despite my limited availability, Zaber was incredibly patient and flexible. He even arranged late night meetings to accommodate my schedule, which I truly appreciated.\n\nTo be honest, I had some doubts about the final outcome, but those doubts disappeared the moment I saw the finished product. He not only followed all my instructions carefully but also went beyond them by adding valuable features after doing his own research. The final software was far better than I had initially expected.\n\nAfter implementing the software in our classes and mock tests, the feedback has been outstanding. Our students consistently mention that the experience feels very similar to the actual IELTS exam, which was exactly our goal.\n\nWhat impresses me even more is his ongoing support. Whenever I face any issues, he responds promptly and solves them with great patience. He has resolved several critical problems that we thought would be impossible to fix, yet he handled them with ease.\n\nWe have been using this software for the past few months, and it has had a significant positive impact on our institute. I am genuinely satisfied with Zaber's work and professionalism, and we are already planning to collaborate with him on future projects.\n\nI highly recommend Zaber to anyone looking for a skilled, dedicated, and dependable software developer.",
    },
  ],
  hackathons: [],
} as const;
