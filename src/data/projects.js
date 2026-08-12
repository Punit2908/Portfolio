const projects = [
  {
    id: "eventra",
    number: "01",
    title: "Eventra Weddings",
    category: "Full Stack Platform",
    description:
      "A modern wedding services platform designed to connect users with vendors and services for their special events.",
    tech: ["React", "Node.js", "Express", "MongoDB"],

    image: "/Eventra.png",
    mobileImage: "/EventraMobile.png",

    secondaryImages: [
      "/EventraMobile2.png",
      "/EventraVendors.png",
    ],

    github:
      "https://github.com/Punit2908/EventraWeddings-FrontEnd",

    live:
      "https://eventra-weddings-front-end.vercel.app/",

    theme: "rose",
    type: "event",
  },

  {
    id: "netflix",
    number: "02",
    title: "Netflix Clone",
    category: "Frontend Experience",
    description:
      "A responsive Netflix-inspired streaming interface focused on cinematic layouts, responsive design and modern UI presentation.",
    tech: ["React", "JavaScript", "CSS"],

    image: "/Netflix.png",
    mobileImage: "/NetflixMobile.png",

    secondaryImages: [],

    github:
      "https://github.com/Punit2908/Netflix-clone-site",

    live:
      "https://netflix-clone-site-peach.vercel.app/",

    theme: "red",
    type: "cinema",
  },

  {
    id: "hasc-notes",
    number: "03",
    title: "HASC Notes",
    category: "Learning Platform",
    description:
      "A digital notes platform created to make learning resources easier for HASC students to access and organize.",
    tech: ["HTML", "CSS", "JavaScript"],

    image: "/HASC-Notes.png",
    mobileImage: null,

    secondaryImages: [],

    github:
      "https://github.com/Punit2908/HASC-Notes",

    live: null,

    theme: "cyan",
    type: "notes",
  },

  {
    id: "elib",
    number: "04",
    title: "eLib",
    category: "Full Stack E-Library",
    description:
      "A full-stack digital library concept for discovering, purchasing, reading and accessing books online.",
    tech: ["MongoDB", "Express", "React", "Node.js"],

    image: null,
    mobileImage: null,

    secondaryImages: [],

    github: null,
    live: null,

    theme: "violet",
    type: "library",

    status: "Rebuilding",
  },

  {
    id: "backend",
    number: "05",
    title: "Backend Project",
    category: "Backend Development",
    description:
      "An early backend development project focused on server architecture, routing and API development.",
    tech: ["Node.js", "Express", "JavaScript"],

    image: null,
    mobileImage: null,

    secondaryImages: [],

    github:
      "https://github.com/Punit2908/first-backend-project",

    live: null,

    theme: "green",
    type: "terminal",
  },
];

export default projects;