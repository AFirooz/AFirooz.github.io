// Single source of truth for everything the site renders.
// Mirrors the MS CS variant of the LaTeX resume (Resume/src/resume/*.tex).
// Wrap text in **double asterisks** to bold it.

export const profile = {
  name: 'Ali Firooz',
  role: 'Software Engineer',
  focus: 'AI & Cloud Infra',
  motto: ['Code Curiously', 'Create Tomorrow'],
  degrees: 'Computer Science, MS · Chemical Engineering, MS',
  // Rotating words after "I build" in the hero. Keep each under ~23 characters.
  builds: [
    'agentic AI workflows',
    'deep learning models',
    'clinical data pipelines',
    'RAG & GraphRAG agents',
    'observable cloud infra',
  ],
  tagline:
    'Interdisciplinary scientist with proven expertise in **data science, ML, AI,** and **chemical engineering,** passionate about building solutions to make a positive dent in human lives.',
  location: 'State College, PA',
  availability: 'Open to relocate',
  email: 'coziest-09sand@icloud.com',
  github: 'https://github.com/AFirooz',
  linkedin: 'https://linkedin.com/in/ali-firooz',
  site: 'https://afirooz.github.io',
  repo: 'https://github.com/AFirooz/AFirooz.github.io',
};

export const summary = [
  '**3+ years** of experience delivering **ML/DL** and **GenAI** solutions, including agentic AI workflows, alongside **ETL pipelines, SQL/NoSQL databases,** and advanced data processing for complex, high-throughput datasets.',
  'Solid understanding of software engineering best practices including **clean code principles, CI/CD pipelines, cloud infrastructure, DevSecOps controls (SCA/SAST), observability,** and **agile methodologies** for scalable applications.',
];

// num counts up on scroll; it renders as num.toFixed(decimals) + suffix.
export const stats = [
  { num: 6.9, decimals: 1, suffix: 'B+', label: 'mass spectrometry data points processed in parallel' },
  { num: 93.5, decimals: 1, suffix: '%', label: 'Dice score for aortic segmentation with TransONet' },
  { num: 10, decimals: 0, suffix: 'K+', label: 'clinical records modeled in a SQL database' },
  { num: 60, decimals: 0, suffix: '+', label: 'defects auto-resolved by SCA/SAST pull request checks' },
];

// Scrolling strip under the hero. Every entry also appears in `skills` below.
export const stack = [
  'Python',
  'PyTorch',
  'LangGraph',
  'LangChain',
  'Azure',
  'OpenTelemetry',
  'Docker',
  'GitHub Actions',
  'Neo4j',
  'MongoDB',
  'SQL',
  'Scikit-learn',
  'XGBoost',
  'Bicep',
  'LangSmith',
  'Google ADK',
  'SHAP',
  'Flask',
  'Bash',
];

export const experience = [
  {
    company: 'Just in Time GCP',
    mark: 'JIT',
    highlights: [
      { value: '60+', label: 'defects auto-resolved' },
      { value: '8K+', label: 'documents stress-tested' },
      { value: '14K+', label: 'legacy lines removed' },
    ],
    role: 'Software Engineer (AI & Cloud Infra)',
    start: 'Aug 2025',
    end: 'Present',
    location: 'Philadelphia, PA, US',
    note: 'Full-time · Fully remote',
    bullets: [
      'Designed a multi-agent AI development architecture with project-specific rules, MCPs, tools, and skills, improving code consistency while lowering LLM usage costs.',
      'Engineered a centralized, GxP-compliant audit logging system by integrating OpenTelemetry with a serverless Azure Functions pipeline to ingest Azure Monitor alerts and persist events in immutable Blob Storage.',
      'Strengthened security and release reliability by implementing GitHub Actions pipelines with mandatory SCA/SAST pull request checks, automatically resolving 60+ defects.',
      'Validated scalability by stress-testing the deployment pipeline across 8K+ documents while refactoring the codebase and removing 14K+ legacy lines.',
    ],
    tags: ['Multi-agent AI', 'MCP', 'OpenTelemetry', 'Azure Functions', 'GitHub Actions', 'SCA/SAST'],
  },
  {
    company: 'Prisma Health Cancer Institute & School of Medicine Greenville',
    mark: 'PH',
    highlights: [
      { value: '10K+', label: 'clinical records' },
      { value: '65', label: 'drug combinations classified' },
      { value: '4', label: 'evaluation metrics' },
    ],
    role: 'Data Scientist',
    start: 'Jul 2022',
    end: 'Dec 2024',
    location: 'Remote, SC, US',
    note: '',
    bullets: [
      'Implemented a SQL database with **10K+ clinical records** using ORM & migration tools, improving reliability and query performance.',
      'Developed a modular **Python ETL pipeline** to parse, clean, validate, and ingest clinical datasets, improving data reliability.',
      'Conducted **ML/DL experiments** to classify patient responses across 65 drug combinations, addressing anomalies, class imbalance, and missingness with a **4-metric evaluation framework**.',
      'Applied **XAI (SHAP)** to provide clinicians with transparent model explanations for informed decisions.',
    ],
    tags: ['Python', 'SQL', 'ETL', 'ML/DL', 'SHAP'],
  },
  {
    company: 'University of South Carolina',
    mark: 'USC',
    highlights: [
      { value: '6.9B+', label: 'data points processed' },
      { value: '78', label: 'raw instrument files' },
      { value: '93.5%', label: 'Dice score' },
    ],
    role: 'Graduate Research Assistant',
    start: 'Jan 2022',
    end: 'Dec 2024',
    location: 'Columbia, SC, US',
    note: '',
    bullets: [
      'Processed **over 6.9 billion** mass spectrometry data points in parallel from 78 raw instrument files, used async ingestion to store results in MySQL, significantly reducing pipeline latency.',
      'Co-developed TransONet: a **ResNet-Transformer-UNet** hybrid approach, achieving 93.5% Dice score for aortic segmentation in CT scans.',
    ],
    tags: ['Multiprocessing', 'Async ingestion', 'MySQL', 'PyTorch', 'Computer vision'],
  },
];

export const projects = [
  {
    title: 'Hybrid GraphRAG agent',
    icon: 'nodes',
    description:
      'Designed and deployed a **Hybrid GraphRAG agent** using **LangGraph,** LangSmith, Neo4j, and vision LLMs; extracted structured data from PDFs and implemented semantic-similarity chunking with ingestion progress tracking.',
    tags: ['LangGraph', 'LangSmith', 'Neo4j', 'Vision LLMs'],
  },
  {
    title: 'Domain-specific RAG agent',
    icon: 'book',
    description:
      'Implemented a **domain-specific RAG agent** for question answering over research papers with prompt versioning, vector stores, semantic similarity, and LLM-as-a-judge evaluation.',
    tags: ['RAG', 'Vector stores', 'Prompt versioning', 'LLM-as-a-judge'],
  },
  {
    title: 'RAG chatbot · USC Hackathon',
    icon: 'bot',
    description:
      'Prototyped a RAG-based chatbot for USC Hackathon using **LangChain,** LangSmith, and **MongoDB** Atlas Vector DB.',
    tags: ['LangChain', 'LangSmith', 'MongoDB Atlas'],
  },
];

export const skills = [
  { group: 'Programming', icon: 'code', items: ['Python', 'Bash', 'SQL'], familiar: ['C++', 'JS/TS'] },
  {
    group: 'GenAI / AI Stack',
    icon: 'bot',
    items: ['Agentic AI Workflows', 'Memory', 'Context Engineering', 'Guardrails', 'Observability', 'Evaluation'],
  },
  {
    group: 'ML & DL',
    icon: 'nodes',
    items: ['PyTorch', 'Computer Vision', 'Tabular ML', 'XAI (SHAP)', 'Traditional ML (Scikit-learn, XGBoost, RF, etc.)'],
  },
  {
    group: 'Data Engineering',
    icon: 'database',
    items: ['ETL Pipelines', 'Multiprocessing & Async Data Processing', 'Data Quality & Validation'],
  },
  {
    group: 'Cloud & MLOps',
    icon: 'cloud',
    items: [
      'Azure',
      'Bicep (IaC)',
      'OpenTelemetry',
      'CI/CD (GitHub Actions)',
      'Docker',
      'Exploratory data analysis (EDA)',
      'Detecting Data Drift',
    ],
  },
  {
    group: 'Dev Tools',
    icon: 'terminal',
    items: ['Git/GitHub', 'MongoDB', 'Neo4j', 'Google ADK', 'LangChain LCEL', 'LangGraph', 'LangSmith', 'Arize', 'Flask'],
  },
  { group: 'Soft Skills', icon: 'flask', items: ['High-Throughput Data Processing', 'Scientific Research', 'DOE (Design-Expert)'] },
];

export const education = [
  {
    school: 'University of South Carolina (USC)',
    degree: 'MS, Computer Science',
    start: 'Jan 2022',
    end: 'Dec 2024',
    location: 'Columbia, SC, US',
    details: [
      'GPA: 3.72 / 4',
      'Relevant coursework: Advanced Algorithms, Artificial Intelligence, Deep Learning, Database System Design',
    ],
  },
  {
    school: 'Chemistry and Chemical Engineering Research Center of Iran (CCERCI)',
    degree: 'MS, Chemical Engineering',
    start: 'Sep 2016',
    end: 'Mar 2019',
    location: 'Tehran, Iran',
    details: [],
  },
  {
    school: 'Arak University',
    degree: 'BS, Chemical Engineering',
    start: 'Sep 2012',
    end: 'Aug 2016',
    location: 'Arak, Iran',
    details: [],
  },
];

export const publications = [
  {
    authors: 'A. B. Rajeoni, B. Pederson, **A. Firooz**, et al.',
    title: 'TransONet: Automatic Segmentation of Vasculature in Computed Tomographic Angiograms Using Deep Learning',
    venue: '2023 International Conference on Computational Science and Computational Intelligence (CSCI)',
    year: '2023',
    url: 'https://doi.org/10.48550/arXiv.2311.10328',
  },
  {
    authors: 'B. K. Austin, **A. Firooz**, et al.',
    title: 'An Updated Overview of Existing Cancer Databases and Identified Needs',
    venue: 'Biology, vol. 12, no. 8',
    year: '2023',
    url: '',
  },
  {
    authors: '**A. Firooz**, A. T. Funkhouser, et al.',
    title: 'Comprehensive and User-Analytics-Friendly Cancer Patient Database for Physicians and Researchers',
    venue:
      '2022 International Conference on Computational Science and Computational Intelligence (CSCI), pp. 1615–1621',
    year: '2022',
    url: '',
  },
  {
    authors: '**A. Firooz**, A. T. Funkhouser, et al.',
    title:
      'Analysis of cancer patients’ molecular and clinical data using artificial intelligence and machine learning approaches',
    venue: 'Cancer Research, vol. 83, no. 7 Supplement, pp. 5425–5425',
    year: '2023',
    url: '',
  },
  {
    authors: '**A. Firooz**, S. M. Noblitt, et al.',
    title: 'Application of machine learning in predicting breast cancer patient outcome',
    venue: 'BMC Proceedings, vol. 17, no. 19, pp. O11',
    year: '2023',
    url: 'https://doi.org/10.1186/s12919-023-00281-y',
  },
];

export const honors = [
  { title: 'AACR Associate', issuer: 'The American Association for Cancer Research', year: '2023' },
  { title: 'First Place in the Cancer Category', issuer: 'INBRE SE IDeA Conference', year: '2023' },
  { title: 'Highest Scoring Graduate Student', issuer: 'INBRE SE IDeA Conference', year: '2023' },
];

export const certificates = [
  {
    title: '5-Day GenAI Intensive Course with Google',
    issuer: 'Google',
    year: '2025',
    url: 'https://www.kaggle.com/certification/badges/seali33/96',
  },
  {
    title: 'Building RAG Agents with LLMs',
    issuer: 'Nvidia',
    year: '2025',
    url: 'https://learn.nvidia.com/certificates?id=_YzkKBj9QJiD-pqJ-hFLdg',
  },
  {
    title: 'Deep Learning for Computer Vision',
    issuer: 'DataCamp',
    year: '2025',
    url: 'https://www.datacamp.com/statement-of-accomplishment/course/1961cfcf80c3faab26f009fe3a5938fd352f8f7e?raw=1',
  },
  {
    title: 'Generative AI with LLMs',
    issuer: 'DeepLearning.AI',
    year: '2024',
    url: 'https://www.coursera.org/account/accomplishments/verify/GJ8B2ZK8NAXL',
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'Stanford University',
    year: '2023',
    url: 'https://www.coursera.org/account/accomplishments/specialization/UED4Q5KFZZM8',
  },
  {
    title: 'Deep Learning with PyTorch',
    issuer: 'DataCamp',
    year: '2023',
    url: 'https://www.datacamp.com/statement-of-accomplishment/course/432e350924c6a7474e5202570621ebc6e19155ed',
  },
  {
    title: 'Advanced Learning Algorithms',
    issuer: 'Stanford University',
    year: '2023',
    url: 'https://coursera.org/verify/FKVKJHSWHHTA',
  },
  {
    title: 'Biomedical Investigator',
    issuer: 'CITI Program',
    year: '2023',
    url: 'https://www.citiprogram.org/verify/?wcff7d1e2-7985-4cf3-bcf4-9d18a99ac9c8-55658490',
  },
];

export const leadership = [
  {
    text: 'Supervised 2 undergrads in building a **secure Flask web interface** with input validation and parameterized queries preventing SQL injection.',
    year: '2023',
  },
  { text: 'Voluntarily graded and provided feedback for Advanced C++ Programming Techniques course.', year: '2023' },
  {
    text: 'Taught **Linux workshop** with 20 participants, at SC INBRE Bioinformatics Core Summer Workshops.',
    year: '2022',
  },
  { text: 'Assisted 20+ first-year CS students with Web Development in HTML, CSS, and JavaScript.', year: '2022' },
];
