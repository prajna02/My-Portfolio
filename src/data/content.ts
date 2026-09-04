export const profile = {
  name: 'Prajna K',
  headline: 'MCA Graduate | Software Developer | AI/ML | QA & Testing',
  bio: 'Passionate about building practical software solutions and applying technology to solve real-world problems.',
  location: 'Puttur, Karnataka, India',
  email: 'prajnakaniya02@gmail.com',
  linkedin: 'https://www.linkedin.com/in/prajna-k-254b6b354/',
  github: 'https://github.com/prajna02',
  resumePath: '/Prajna_K_Resume.pdf',
  photo: '/profile.jpeg',
} as const

export const about = {
  paragraphs: [
    'I am an MCA graduate with hands-on experience in software development, AI/ML, and database management through my internship and academic projects. I enjoy building practical, reliable, and user-friendly applications that solve real-world problems. My experience includes working with Python, Flask, SQL, machine learning, web technologies, and application testing. Currently seeking entry-level full-time and internship opportunities in software development, AI/ML, and QA/testing.',
  ],
}

export const skillGroups = [
  {
    category: 'Programming',
    items: ['Python', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['React', 'Flask', 'Django', 'Bootstrap'],
  },
  {
    category: 'Data & ML',
    items: ['Pandas', 'NumPy', 'Scikit-learn', 'OpenCV'],
  },
  {
    category: 'Databases',
    items: ['SQL', 'MySQL', 'SQLite'],
  },
  {
    category: 'Tools',
    items: [
      'Git',
      'GitHub',
      'VS Code',
      'Cursor',
      'Vite',
      'Google Colab',
      'Jupyter',
      'XAMPP',
      'Excel',
    ],
  },
  {
    category: 'Testing',
    items: ['Manual Testing', 'Functional Testing', 'Debugging'],
  },
] as const

export const projects = [
  {
    number: '01',
    name: 'AI-Powered Grocery Expiry Prediction and Tracking System',
    summary:
      'A Flask-based grocery inventory system that uses OCR and OpenCV to extract product information and expiry dates from packaging images, with ML-based prediction, dashboard alerts, and automated status tracking.',
    role: 'Designed and developed the application, implemented OCR/image processing and machine learning models, and integrated the database and dashboard.',
    stack: [
      'Python',
      'Flask',
      'Machine Learning',
      'Scikit-learn',
      'OpenCV',
      'OCR',
      'SQLite',
    ],
    github: 'https://github.com/prajna02/Grocery_Expiry_Tracker',
    live: '',
    screenshots: [
    '/project-images/grocery-1.png',
    '/project-images/grocery-2.png',
    '/project-images/grocery-3.png',
    '/project-images/grocery-4.png',
  ],
    testing:
      'Tested model outputs and application functionality with different inputs and scenarios.',
  },
  {
    number: '02',
    name: 'FarmEasy',
    summary:
      'A full-stack farmer support platform providing crop guidance, weather forecasts, farming services, user authentication, and a digital marketplace.',
    role: 'Developed the full-stack application, including marketplace features, image uploads, shopping cart, order management, and API integration.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP', 'MySQL'],
    github: 'https://github.com/prajna02/FarmEasy',
    live: '',
    screenshots: [
  '/project-images/farmeasy-1.png',
  '/project-images/farmeasy-2.png',
  '/project-images/farmeasy-3.png',
  '/project-images/farmeasy-4.png',
  '/project-images/farmeasy-5.png',
],
    testing:
      'Tested frontend-backend communication, user workflows, marketplace functionality, and order management.',
  },
  {
    number: '03',
    name: 'Web-Based Bakery Management System',
    summary:
      'A full-stack bakery management and online ordering system with role-based authentication, product management, shopping cart, checkout, and order management.',
    role: 'Developed the application and implemented backend functionality, APIs, database operations, authentication, and security features.',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    github: 'https://github.com/prajna02/Bakery-Management-System',
    live: '',
    screenshots: [
  '/project-images/bakery-1.png',
  '/project-images/bakery-2.png',
  '/project-images/bakery-3.png',
  '/project-images/bakery-4.png',
  '/project-images/bakery-5.png',
],
    testing:
      'Tested authentication, CRUD operations, shopping cart, checkout, order workflows, and backend functionality.',
  },
] as const

export const experience = [
  {
    title: 'Data Science and AI/ML Intern',
    organization: 'ERA Foundation',
    location: 'Mangalore, India',
    dates: 'February 2026 – May 2026',
    bullets: [
      'Developed data science and AI/ML solutions using Python, including data preprocessing, feature preparation, model development, and evaluation.',
      'Built and tested a credit scoring and loan eligibility prediction application (Smart Lending Optimization System) using machine learning, and validated model outputs across different customer scenarios.',
      'Worked with SQLite databases, integrated trained machine learning models into applications, and performed testing and debugging.',
      'Collaborated on real-world AI/ML application development and gained hands-on experience in data science, machine learning, and software development.',
    ],
  },
] as const

export const education = [
  {
    degree: 'MCA (Master of Computer Applications)',
    school: 'Vivekananda College of Engineering & Technology (VCET)',
    location: 'Puttur, Karnataka',
    dates: 'December 2024 – June 2026',
    gpa: 'CGPA 8.92/10',
  },
  {
    degree: 'BCA (Bachelor of Computer Applications)',
    school: 'Vivekananda College of Arts, Science and Commerce',
    location: 'Puttur, Karnataka',
    dates: 'June 2021 – July 2024',
    gpa: 'CGPA 8.47/10',
  },
] as const

export const certifications = [
  {
    title: 'Data Science and AI/ML Internship Certificate',
    detail: 'ERA Foundation, Mangalore (2026)',
  },
  {
    title:
      'Paper Presentation: Machine Learning-Based Grocery Expiry Prediction and Tracking System',
    detail: 'TECHNOVA 2025',
  },
  {
    title: 'Internal Hackathon Certificate',
    detail: 'Department of MCA',
  },
] as const

export const contactIntro =
  "I am a recent MCA graduate looking for my first full-time role or internship in software development, AI/ML, QA, or testing. I would be grateful to connect with recruiters and teams hiring for entry-level positions."

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#certifications', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
] as const
