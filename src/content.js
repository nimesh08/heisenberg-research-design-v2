export const siteContent = {
  brand: {
    name: "Heisenberg Research",
    marks: {
      cream: "/assets/brand/mark-cream.png",
      espresso: "/assets/brand/mark-espresso.png",
      orange: "/assets/brand/mark-orange.png"
    }
  },
  navigation: [
    { label: "Research", href: "#research" },
    { label: "Thesis", href: "#thesis" },
    { label: "Applications", href: "#applications" },
    { label: "Work with us", href: "#work" }
  ],
  links: {
    careers:
      "mailto:atharv@heisenberg-research.com?subject=Careers%20at%20Heisenberg%20Research",
    partnerships:
      "mailto:atharv@heisenberg-research.com?subject=Partner%20with%20Heisenberg%20Research",
    rights:
      "mailto:atharv@heisenberg-research.com?subject=Video%20removal%20request",
    linkedin: "https://www.linkedin.com/company/heisenberg-research/"
  },
  hero: {
    eyebrow: "The frontier lab",
    title: "Scaling quantum computing.",
    description:
      "Quantum has been 5 years away for the past 20 years. We aim to solve humanity’s hardest challenges by unlocking useful quantum computing.",
    primaryCta: "Explore the research",
    secondaryCta: "Work with us",
    investorLabel: "Backed by",
    investors: [
      {
        name: "Entrepreneur First",
        logo: "/assets/backers/investor-entrepreneur-first-new.png"
      },
      {
        name: "Transpose Platform",
        logo: "/assets/backers/investor-transpose-platform-black.png"
      }
    ]
  },
  thesis: {
    problem: {
      eyebrow: "The problem",
      title:
        "Most quantum systems are built around a single qubit technology.",
      body:
        "Every modality has different strengths and tradeoffs, so a single-modality system inherits the limitations of that hardware."
    },
    answer: {
      eyebrow: "Our thesis",
      title: "Useful quantum computing will require heterogeneous systems.",
      body:
        "We are building the architecture and interconnects that let different quantum processors work together, allowing each part of a workload to run on the technology best suited to it."
    }
  },
  research: {
    eyebrow: "Explore the research",
    title: "Introducing heterogeneous quantum computing.",
    body:
      "Different quantum technologies are good at different jobs: some are faster at processing, some preserve information for longer, and photonics can move it between systems. Heterogeneous quantum computing connects these specialized processors in one architecture, allowing each part of a workload to run on the technology best suited to it. This approach combines their strengths instead of forcing one quantum technology to do every job.",
    pillars: [
      {
        title: "Architecture",
        body:
          "Designed to work across multiple quantum modalities and AI accelerators, matching each part of a workload to the system best suited to it.",
        tone: "orange"
      },
      {
        title: "Interconnect",
        body:
          "We are developing hardware interconnects designed to link different quantum processors so they can communicate and operate as one system.",
        tone: "espresso"
      },
      {
        title: "Mosaic",
        body:
          "Our software stack for partitioning workloads and coordinating execution across different quantum processors.",
        tone: "orange"
      }
    ]
  },
  applications: {
    eyebrow: "Applications",
    title: "What could quantum computing unlock?",
    intro:
      "Useful quantum computing could help researchers model molecules and materials that are extremely difficult for today’s computers to simulate.",
    items: [
      {
        number: "01",
        title: "New medicines",
        description:
          "Accelerate the search for new medicines by modelling molecules that are extremely difficult for today’s computers to simulate."
      },
      {
        number: "02",
        title: "New materials",
        description:
          "Enable the discovery of materials with new properties beyond the practical reach of classical simulation."
      },
      {
        number: "03",
        title: "Scientific discovery",
        description:
          "Help solve complex scientific and industrial challenges that cannot be addressed efficiently today."
      }
    ]
  },
  work: {
    eyebrow: "Work with us",
    title: "Work with us.",
    cards: [
      {
        title: "Careers — Hiring soon",
        body:
          "We are assembling a world-class team with the expertise needed to build groundbreaking, scalable systems. Our team includes leading researchers, infrastructure experts, and engineers. If your background aligns and you are excited by our mission, please get in touch.",
        cta: "Join the team",
        hrefKey: "careers",
        tone: "orange"
      },
      {
        title: "Partnerships",
        body:
          "We are onboarding early quantum hardware companies and enterprises with high-compute workloads to our heterogeneous architecture. If our work resonates with your technical needs, please reach out.",
        cta: "Partner with us",
        hrefKey: "partnerships",
        tone: "espresso"
      },
      {
        title: "Neutral by design",
        body:
          "As a neutral company, we collaborate with multiple quantum hardware companies across modalities rather than competing with them.",
        tone: "white"
      }
    ]
  },
  team: {
    eyebrow: "Built by a team from",
    institutions: [
      {
        name: "University of Cambridge",
        logo: "/assets/team/team-cambridge-color.svg"
      },
      { name: "PsiQuantum", logo: "/assets/team/team-psiquantum.png" },
      {
        name: "Indian Institute of Technology Madras",
        logo: "/assets/team/team-iit-madras.png"
      },
      {
        name: "Max Planck Society",
        logo: "/assets/team/team-max-planck.svg"
      },
      {
        name: "Lawrence Berkeley National Laboratory",
        logo: "/assets/team/team-berkeley-lab.svg"
      },
      {
        name: "National Institute of Technology Warangal",
        logo: "/assets/team/team-nit-warangal.png"
      },
      {
        name: "Columbia University",
        logo: "/assets/team/team-columbia.svg"
      },
      { name: "Google", logo: "/assets/team/team-google.png" }
    ]
  },
  footer: {
    copyright: "© 2026 Heisenberg Research. All rights reserved.",
    rightsNotice:
      "If you are a rights holder and would like a video removed, please email us.",
    rightsLabel: "Email us"
  }
};
