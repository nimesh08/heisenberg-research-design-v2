export const siteContent = {
  brand: {
    name: "Heisenberg Research",
    marks: {
      cream: "/assets/brand/mark-cream.png",
      espresso: "/assets/brand/mark-espresso.png",
      orange: "/assets/brand/mark-orange.png",
      header: "/assets/brand/mark-illustrated-espresso.png",
      hero: "/assets/brand/mark-illustrated-orange.png",
      footer: "/assets/brand/mark-illustrated-orange.png",
      work: "/assets/brand/work-mark.png"
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
      "Quantum has been 5 years away for the past 20 years. We aim to help tackle consequential challenges of our time by unlocking useful quantum computing.",
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
      eyebrow: "The problem with today’s hardware",
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
          "We are designing an architecture that works across multiple quantum modalities, matching each part of a workload to the qubit system best suited to it. We’re building an adaptive hybrid quantum-classical stack to accelerate AI and other computationally demanding workloads.",
        icon: "/assets/research/research-architecture.png",
        iconStyle: "logo"
      },
      {
        title: "Interconnect",
        body:
          "We are developing hardware interconnects designed to link different quantum processors so they can communicate and operate as one system.",
        icon: "/assets/research/research-interconnect.png",
        iconStyle: "logo-dark"
      },
      {
        title: "Quilt Compiler",
        body:
          "Quilt is our software stack for partitioning workloads and coordinating execution across different quantum processors.",
        icon: "/assets/research/research-quilt-compiler.png",
        iconStyle: "logo"
      }
    ]
  },
  applications: {
    eyebrow: "Applications",
    title: "What could quantum computing unlock?",
    intro:
      "Useful quantum computing could help researchers understand and predict the behaviour of molecules and materials that are extremely difficult for today’s computers to simulate.",
    items: [
      {
        number: "01",
        title: "New medicines",
        description:
          "Accelerate the search for new medicines by simulating the interactions between new molecules."
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
        action: "partner",
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
        id: "cambridge",
        name: "University of Cambridge",
        logo: "/assets/team/team-cambridge-color.svg",
        tone: "adaptive"
      },
      {
        id: "psiquantum",
        name: "PsiQuantum",
        logo: "/assets/team/team-psiquantum.png",
        tone: "adaptive"
      },
      {
        id: "iit-madras",
        name: "Indian Institute of Technology Madras",
        logo: "/assets/team/team-iit-madras.png",
        tone: "adaptive"
      },
      {
        id: "max-planck",
        name: "Max Planck Society",
        logo: "/assets/team/team-max-planck.svg"
      },
      {
        id: "berkeley-lab",
        name: "Lawrence Berkeley National Laboratory",
        logo: "/assets/team/team-berkeley-lab.svg"
      },
      {
        id: "nit-warangal",
        name: "National Institute of Technology Warangal",
        logo: "/assets/team/team-nit-warangal.png"
      },
      {
        id: "columbia",
        name: "Columbia University",
        logo: "/assets/team/team-columbia.svg"
      },
      {
        id: "google",
        name: "Google",
        logo: "/assets/team/team-google.png"
      }
    ]
  },
  partnerForm: {
    eyebrow: "Partnerships",
    title: "Partner with Heisenberg Research",
    intro: "Tell us what becomes possible if we build it together.",
    fields: [
      {
        name: "full_name",
        label: "Name",
        type: "text",
        placeholder: "Jane Doe",
        autoComplete: "name",
        minLength: 2,
        maxLength: 120,
        error: "Enter your name."
      },
      {
        name: "role_title",
        label: "Role / title",
        type: "text",
        placeholder: "Machine Learning Researcher",
        autoComplete: "organization-title",
        minLength: 2,
        maxLength: 120,
        error: "Enter your role or title."
      },
      {
        name: "company_name",
        label: "Company",
        type: "text",
        placeholder: "Stark Industries",
        autoComplete: "organization",
        minLength: 2,
        maxLength: 160,
        error: "Enter your company name."
      },
      {
        name: "company_website",
        label: "Company website",
        type: "url",
        placeholder: "https://starkindustries.com",
        autoComplete: "url",
        maxLength: 2048,
        error: "Enter a valid URL, including https://."
      },
      {
        name: "company_building",
        label: "What is your company building?",
        type: "textarea",
        placeholder: "We're working to make ... possible.",
        minLength: 20,
        maxLength: 3000,
        error: "Tell us what your company is building."
      },
      {
        name: "future_need",
        label: "What does the future need that we could build together?",
        type: "textarea",
        placeholder:
          "What are you trying to make real with us — and what's held it back so far?",
        minLength: 20,
        maxLength: 3000,
        error: "Tell us what we could build together."
      },
      {
        name: "work_email",
        label: "Work email",
        type: "email",
        placeholder: "jane@company.com",
        autoComplete: "email",
        maxLength: 254,
        error: "Enter a valid work email."
      }
    ],
    submitLabel: "Send partnership inquiry",
    submittingLabel: "Sending…",
    successTitle: "Thank you.",
    successBody: "Your partnership inquiry has been received. We’ll be in touch.",
    configurationError:
      "The partnership form is not connected yet. Please try again later.",
    errorMessage: "We couldn’t save your inquiry. Please try again.",
    disclosure:
      "By submitting, you agree that Heisenberg Research may use this information to respond to your inquiry."
  },
  footer: {
    copyright: "© 2026 Heisenberg Research. All rights reserved.",
    rightsNotice:
      "Logos & brand marks © 2026 Camille Stavrakas. All rights reserved."
  }
};
