
import { Project, SkillCategory, Experience } from './types';

/**
 * ASSET PATHS
 * 'assets/' is the standard relative path from the root index.html.
 * IMPORTANT: Filenames are case-sensitive on most servers. 
 * If your file is 'Profile.JPG', this must match exactly.
 */
export const resumeFilePath = 'assets/EiThinzarMyo_Resume.pdf';
export const profileImg = 'assets/profile.jpg';

const rocklandImg = 'assets/rockland.jpg';
const cleaningServiceImg = 'assets/cleaning_service.jpg';
const housePriceImg = 'assets/house_price.jpg';
const mlSecurityImg = 'assets/ml_security.jpg';
const aiPerformanceImg = 'assets/ai_model_performance.jpg';
const weatherImg = 'assets/weather.jpg';

export const RESUME_DATA = {
  name: "Ei Thinzar Myo",
  location: "Singapore",
  email: "sly.eithinzarmyo@gmail.com",
  phone: "+65 88938384",
  linkedin: "linkedin.com/in/eithinzarmyo",
  portfolio: "eithinzarmyo.com",
  summary: "Junior UI/UX Designer and Frontend Developer with a background in Computer Science and Big Data. Passionate about creating structured, user-centered digital experiences that bridge the gap between complex data and intuitive design.",
  education: [
    {
      degree: "Bachelor of Computer Science (Big Data)",
      school: "University of Wollongong (SIM Global Education)",
      period: "2022 - 2025",
      details: "Specialized in data analysis, visualization, and system design."
    }
  ],
  skills: [
    "UI/UX Design (Figma, Wireframing, Prototyping)",
    "Frontend Development (HTML, CSS, JavaScript, React)",
    "Data Visualization (Python, Matplotlib, Seaborn)",
    "System Design (UML, Agile Methodologies)",
    "Project Management (Jira, Leadership)"
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'rockland',
    title: 'Rockland — Mobile Rock Discovery',
    role: 'Lead UI/UX Designer · System Designer · Frontend Developer',
    duration: 'Oct 2025 - Present',
    category: 'Mobile',
    image: rocklandImg,
    description: 'A mobile application designed to help users explore, identify, and learn about rocks through a structured and user-friendly experience.',
    tools: ['Figma', 'Android Studio', 'Java', 'Firebase', 'Jira'],
    details: [
      'Designed wireframes and high-fidelity UI screens in Figma',
      'Created role-based user flows and dashboards',
      'Implemented the Android frontend using Android Studio',
      'Collaborated with the team using Agile workflows and Jira'
    ]
  },
  {
    id: 'cleaning-service',
    title: 'Online Cleaning Service Platform',
    role: 'Group Leader · UI/UX Designer · Frontend Developer',
    duration: 'March 2025 - May 2025',
    category: 'Web',
    image: cleaningServiceImg,
    description: 'A multi-role platform that allows homeowners to book cleaning services while enabling cleaners and platform managers to manage jobs efficiently.',
    tools: ['Figma', 'HTML', 'CSS', 'JavaScript', 'UML'],
    details: [
      'Defined user roles and user journeys',
      'Designed wireframes and UI screens in Figma',
      'Created use cases and system workflows',
      'Developed frontend interfaces for different roles',
      'Coordinated team tasks and supported Agile collaboration'
    ]
  },
  {
    id: 'house-price',
    title: 'House Price Prediction Dashboard',
    role: 'Lead UI/UX Designer · System Designer · Frontend Developer',
    duration: 'Oct 2024 - Dec 2024',
    category: 'Dashboard',
    image: housePriceImg,
    description: 'An interactive dashboard designed to present house price prediction results in a clear and accessible way for non-technical users.',
    tools: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    details: [
      'Designed dashboard layout and visual hierarchy',
      'Selected appropriate charts for readability',
      'Implemented data visualizations using Python',
      'Transformed complex ML results into understandable visual insights'
    ]
  }
];

export const OTHER_PROJECTS: Project[] = [
  {
    id: 'adversarial-ml',
    title: 'Adversarial ML Security Visualization',
    role: 'UI Designer · Data Vis Developer',
    duration: '1 Month',
    category: 'Dashboard',
    image: mlSecurityImg,
    description: 'An interactive visualization showing how adversarial attacks affect neural networks through comparisons and heatmaps.',
    tools: ['PyTorch', 'Matplotlib', 'NumPy', 'Python', 'Figma'],
    details: [
      'Conceptual Design: Visual metaphors for adversarial perturbations',
      'Information Design: Layouts for before/after image comparisons',
      'Development: Implemented FGSM and PGD attack visualizations'
    ]
  },
  {
    id: 'ai-performance-dashboard',
    title: 'AI Model Performance Dashboard',
    role: 'Data Vis Designer · Frontend Developer',
    duration: '2 Months',
    category: 'Dashboard',
    image: aiPerformanceImg,
    description: 'An interactive dashboard comparing CNN activation functions through clear charts and visual metrics.',
    tools: ['TensorFlow', 'Keras', 'Matplotlib', 'Python'],
    details: [
      'Content Strategy: Visualized model accuracy and training loss curves',
      'Visual Design: Grid-based layout for side-by-side performance comparison',
      'Outcome: Communicated complex research findings effectively'
    ]
  },
  {
    id: 'weather-app',
    title: 'Minimal Weather App',
    role: 'Frontend Developer · UI Designer',
    duration: 'Feb 2024',
    category: 'Mobile',
    image: weatherImg,
    description: 'A functional minimalist weather application focusing on high-end typography and clear, glassmorphic UI elements.',
    tools: ['HTML', 'CSS', 'JavaScript'],
    details: [
      'Developed a clean, glassmorphic UI layout using HTML/CSS',
      'Integrated OpenWeather API for real-time data synchronization using JavaScript',
      'Focused on accessible typography and visual hierarchy'
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'UI/UX Design',
    icon: 'fa-bezier-curve',
    skills: ['Figma', 'Wireframing', 'High-Fidelity UI', 'Prototyping', 'Information Architecture', 'User Stories']
  },
  {
    title: 'Frontend Development',
    icon: 'fa-code',
    skills: ['HTML', 'CSS', 'JavaScript', 'React (Basic)', 'Android Studio']
  },
  {
    title: 'System & Process',
    icon: 'fa-diagram-project',
    skills: ['UML Diagrams', 'Agile / Scrum', 'Technical Documentation']
  },
  {
    title: 'Data & Visualization',
    icon: 'fa-chart-pie',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'MySQL']
  }
];

export const LEADERSHIP: Experience[] = [
  {
    title: 'Logistics Subcommittee & Lighting Team Leader',
    organization: 'MYSIM Myanmar Community Club (CCA)',
    period: 'April 2024 - April 2025',
    bullets: [
      'Coordinated logistics and operations for major cultural events, improving participation.',
      'Led lighting team, managing setup, live coordination, and technical execution.',
      'Recognized with the Impetus Award (Student Leader 2024/2025).'
    ]
  }
];
