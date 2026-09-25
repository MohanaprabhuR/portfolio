import type { LucideIcon } from "lucide-react";
import { Code2, Layers3, Palette, Plug, Rocket, Users } from "lucide-react";

export const profile = {
  name: "Mohanaprabhu R",
  short: "Mohanaprabhu",
  initials: "MR",
  role: "Frontend Developer",
  tagline: "Senior Frontend Developer | UI/UX Designer",
  company: "Timeless Ventures",
  intro:
    "Senior Frontend Developer and UI/UX practitioner with 9+ years of experience designing and building responsive, accessible, high-performing web applications — including 5 years as a UI/UX designer — and currently leading a team of four developers.",
  about: [
    "I'm a Senior Frontend Developer and UI/UX practitioner at Timeless Ventures, with 9+ years spent designing and building responsive, accessible and high-performing web applications, including 5 years focused as a UI/UX designer.",
    "My day job is turning Figma and Photoshop designs into pixel-accurate, reusable UI components with React.js, Next.js, Svelte, HTML5, CSS3 and Tailwind CSS — and customising CMS platforms like WordPress when a client needs to run the site themselves.",
    "I lead a team of four developers, drive code quality through structured reviews, and work closely with designers and stakeholders to ship polished, user-centred products on schedule.",
  ],
  email: "prabhudhivya0721@gmail.com",
  phone: "+91 88836 60695",
  location: "India",
  linkedin: "https://linkedin.com/in/mohanaprabhu-r-327841139",
};

export const resumes = [
  { label: "Frontend Developer Resume", href: "/Mohanaprabhu-R-Frontend-Developer-CV.pdf" },
  { label: "Senior UI/UX Designer Resume", href: "/Mohanaprabhu-R-UI-UX-Designer-CV.pdf" },
];

export const stats = [
  { value: 9, suffix: "+", label: "Years of\nfrontend" },
  { value: 5, suffix: "+", label: "Years as\nUI/UX designer" },
  { value: 4, suffix: "", label: "Developers\nled" },
  { value: 20, suffix: "+", label: "Tools in the\ntoolkit" },
];

export const services: { n: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    n: "01",
    title: "Frontend Development",
    desc: "React.js, Next.js and Svelte applications built as reusable, component-based architectures — typed, responsive and fast across browsers.",
    icon: Code2,
  },
  {
    n: "02",
    title: "UI/UX & Design to Code",
    desc: "Wireframing, visual design and prototyping in Figma and Photoshop, then translating those files into pixel-accurate, reusable UI components.",
    icon: Palette,
  },
  {
    n: "03",
    title: "WordPress Builds",
    desc: "Custom sites with Elementor, Divi Builder and ACF, backed by PHP and MySQL where the page builder runs out of road.",
    icon: Layers3,
  },
  {
    n: "04",
    title: "Design Systems",
    desc: "Consistent UI patterns and reusable component libraries maintained across projects — Material UI, Ant Design, Headless UI and shadcn/ui.",
    icon: Plug,
  },
  {
    n: "05",
    title: "Performance & Accessibility",
    desc: "Responsive design, cross-browser consistency and UI performance optimisation, so interfaces hold up on real devices for real users.",
    icon: Rocket,
  },
  {
    n: "06",
    title: "Team Leadership",
    desc: "Managing and coordinating a team of four — task allocation, code and design reviews, technical mentorship and delivery quality.",
    icon: Users,
  },
];

export const skills = [
  { name: "HTML5 / CSS3", level: 95 },
  { name: "JavaScript", level: 90 },
  { name: "React.js", level: 92 },
  { name: "Next.js", level: 85 },
  { name: "Tailwind CSS", level: 93 },
  { name: "WordPress / PHP", level: 88 },
  { name: "Figma", level: 85 },
  { name: "Svelte", level: 75 },
];

export const skillGroups = [
  { title: "Frontend Development", items: ["React.js", "Next.js", "Svelte", "JavaScript", "jQuery"] },
  { title: "Web Technologies", items: ["HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] },
  { title: "UI/UX & Design", items: ["Figma", "Photoshop", "Wireframing", "Prototyping", "Design Systems"] },
  { title: "Component Libraries", items: ["Material UI", "Ant Design", "Headless UI", "shadcn/ui"] },
  { title: "State Management", items: ["Redux", "React Hooks"] },
  { title: "CMS & Websites", items: ["WordPress", "Elementor", "Divi Builder", "ACF"] },
  { title: "Backend & Database", items: ["PHP", "MySQL", "Supabase"] },
  { title: "Version Control", items: ["Git"] },
];

export const toolkit = skillGroups.flatMap((g) => g.items);

export const education = [
  {
    period: "2015",
    title: "Master of Computer Applications (MCA) — 84%",
    place: "Muthayammal Engineering College",
  },
  {
    period: "2011",
    title: "Bachelor of Computer Applications (BCA) — 74%",
    place: "Muthayammal College of Arts & Science",
  },
];

export const experience = [
  {
    period: "Present",
    title: "Senior Web Developer",
    place: "Timeless Ventures — frontend, UI/UX and team leadership",
  },
  {
    period: "9+ years",
    title: "Frontend & UI/UX Delivery",
    place: "Web applications and digital platforms across diverse business domains",
  },
];

export type ProjectTag = "frontend" | "fullstack" | "wordpress" | "uiux";

export type Project = {
  n: string;
  title: string;
  cat: string;
  tags: ProjectTag[];
  desc: string;
  role: string;
  stack: string[];
  url?: string;
};

export const projects: Project[] = [
  {
    n: "01",
    title: "Nextflix",
    cat: "Streaming Application",
    tags: ["frontend", "uiux"],
    desc: "Streaming app inspired by modern OTT platforms — content browsing, trailers, season and episode navigation, and interactive animations.",
    role: "Figma & Frontend Developer",
    stack: ["React", "Next.js", "Tailwind CSS", "Embla Carousel", "React Player"],
    url: "https://nextflix-blond.vercel.app",
  },
  {
    n: "02",
    title: "Sportytrip",
    cat: "Sports Experiences Platform",
    tags: ["frontend", "uiux"],
    desc: "Platform for discovering and booking sports-related travel, ticketing, accommodation, events and other customised experiences.",
    role: "Figma, UI & Functional Development",
    stack: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
    url: "https://sportytrip.tmls.dev",
  },
  {
    n: "03",
    title: "Plans",
    cat: "Insurance Platform",
    tags: ["frontend", "uiux"],
    desc: "Centralised insurance platform bringing multiple products and services into one app, with a structured flow for exploring options and managing policies.",
    role: "Figma, UI & Functional Development",
    stack: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    n: "04",
    title: "Mondo",
    cat: "Streaming Platform",
    tags: ["wordpress", "fullstack"],
    desc: "Multimedia streaming platform organising video content into categories for an intuitive, easy-to-navigate viewing experience.",
    role: "Figma & Web Developer",
    stack: ["WordPress", "Divi Builder", "ACF", "PHP", "Tailwind CSS"],
    url: "https://wpmondo.tmls.dev",
  },
  {
    n: "05",
    title: "Indee",
    cat: "Screening Platform",
    tags: ["wordpress", "fullstack"],
    desc: "Secure online platform for film and television screening, giving distributors an organised way to present and share content.",
    role: "Figma & Web Developer",
    stack: ["WordPress", "Divi Builder", "PHP", "Tailwind CSS"],
    url: "https://indee.tmls.dev",
  },
  {
    n: "06",
    title: "Scripbox",
    cat: "Financial Platform",
    tags: ["wordpress", "fullstack"],
    desc: "Mutual fund investment platform helping users manage their portfolio in line with personal financial goals.",
    role: "Figma & Web Developer",
    stack: ["WordPress", "Divi Builder", "PHP", "Tailwind CSS"],
    url: "https://scripbox-mf.tmls.dev",
  },
  {
    n: "07",
    title: "Bluematter",
    cat: "Multi-purpose Platform",
    tags: ["wordpress"],
    desc: "Multi-purpose digital platform covering marketing support, vendor marketplace services, staffing and professional training.",
    role: "Figma & Web Developer",
    stack: ["WordPress", "Divi Builder", "PHP", "phpMyAdmin"],
    url: "https://bluematter.tmls.dev",
  },
  {
    n: "08",
    title: "Sheakley",
    cat: "Consulting & Staffing",
    tags: ["wordpress"],
    desc: "Consulting and staffing platform covering employee benefits, workplace safety and unemployment management.",
    role: "Figma & Web Developer",
    stack: ["WordPress", "Divi Builder", "PHP", "HTML5", "CSS3"],
    url: "https://sheakley.tmls.dev",
  },
];

export const filters = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "uiux", label: "UI/UX" },
  { id: "wordpress", label: "WordPress" },
  { id: "fullstack", label: "Full Stack" },
] as const;

export const nav = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Skills", "#skills"],
  ["Resume", "#resume"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
] as const;
