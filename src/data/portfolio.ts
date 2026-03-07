export interface Project {
  name: string
  description: string
  tech: string[]
  url: string
  urlLabel: string
  launchDate: string
  images: string[]
  rating?: string
  ratingReason?: string
}

export interface Skill {
  name: string
  level: number // 0-100
  category: 'frontend' | 'backend' | 'devops' | 'language'
}

export interface PortfolioData {
  name: string
  title: string
  email: string
  github: string
  linkedin: string
  bio: string
  projects: Project[]
  workProjects: Project[]
  skills: Skill[]
}

export const portfolio: PortfolioData = {
  name: 'Harun',
  title: 'Full-Stack Software Engineer',
  email: 'harunabdi8@gmail.com',
  github: 'https://github.com/harun',
  linkedin: 'https://www.linkedin.com/in/harun-abdi/?skipRedirect=true',
  bio: 'I build things for the web — from real-time systems to native apps. Focused on clean architecture and shipping fast.',
  projects: [
    {
      name: 'AskPDFs',
      description: 'Designed and developed an AI-powered document Q&A platform from scratch, focusing on intuitive UX and fast retrieval, enabling users to communicate with their PDFs seamlessly.',
      tech: ['Next.js', 'Supabase', 'AI/ML'],
      url: 'https://askpdfs.io',
      urlLabel: 'askpdfs.io',
      launchDate: '07.2024',
      images: [
        '/projects/askpdfs-app.png',
        '/projects/askpdfs-landing.png',
      ],
      rating: '10/10',
      ratingReason: 'Most technically ambitious — combined AI, real-time search, and a polished UI into one cohesive product.',
    },
    {
      name: 'BilligBid',
      description: 'Built a location-based deal finder for discounted groceries, featuring real-time price tracking, push notifications, and a seamless mobile experience for budget-conscious shoppers.',
      tech: ['React Native', 'Node.js', 'Hetzner'],
      url: '#',
      urlLabel: 'iOS App',
      launchDate: '03.2024',
      images: [
        '/projects/billigbid.png',
      ],
      rating: '10/10',
      ratingReason: 'Solved a real everyday problem — seeing people actually save money with it is the best feeling.',
    },
    {
      name: 'Dagenslands.dk',
      description: 'Created a daily geography puzzle game inspired by Wordle, with interactive maps, streak tracking, and social sharing — attracting thousands of daily players across Scandinavia.',
      tech: ['Web Game', 'JavaScript', 'CSS'],
      url: 'https://dagenslands.dk',
      urlLabel: 'dagenslands.dk',
      launchDate: '11.2023',
      images: [
        '/projects/dagensland-logo.png',
        '/projects/dagensland-story.png',
      ],
      rating: '10/10',
      ratingReason: 'Pure fun to build — went viral in Denmark and proved a simple idea can have massive reach.',
    },
    {
      name: 'exifm',
      description: 'Developed a lightweight Node.js toolkit for reading and manipulating EXIF metadata on images, published as an open-source NPM package with a clean CLI interface.',
      tech: ['Node.js', 'NPM Package', 'CLI'],
      url: 'https://npmjs.com/package/exifm',
      urlLabel: 'npm package',
      launchDate: '01.2024',
      images: [
        'https://picsum.photos/seed/exifm1/600/400',
      ],
      rating: '10/10',
      ratingReason: 'First open-source package — learned the art of clean APIs and developer experience.',
    },
  ],
  workProjects: [
    {
      name: 'Klimator — IoT Integration',
      description: 'Participated in integrating sensor data through the Danish Environmental Portal\'s IoT platform, helping Banedanmark improve railway monitoring and better prepare for climate challenges.',
      tech: ['IoT', 'Sensor Data', 'Banedanmark'],
      url: '#',
      urlLabel: 'Klimator',
      launchDate: '2024',
      images: [
        'https://picsum.photos/seed/banedanmark1/600/400',
        'https://picsum.photos/seed/banedanmark2/600/400',
      ],
    },
    {
      name: 'WordWorks',
      description: 'Sole developer responsible for full-stack development, creating and integrating RAG systems for intelligent document processing and natural language workflows.',
      tech: ['Full-Stack', 'RAG', 'AI/ML'],
      url: '#',
      urlLabel: 'WordWorks',
      launchDate: '2024',
      images: [
        'https://picsum.photos/seed/wordworks1/600/400',
        'https://picsum.photos/seed/wordworks2/600/400',
      ],
    },
    {
      name: 'Klimator — PDF Automation',
      description: 'Developed a semi-automatic monitoring system that generates and sends PDFs automatically via email, saving the installation team up to 6 hours of manual work weekly.',
      tech: ['Automation', 'Node.js', 'Email'],
      url: '#',
      urlLabel: 'Klimator',
      launchDate: '2024',
      images: [
        'https://picsum.photos/seed/klimator-pdf1/600/400',
        'https://picsum.photos/seed/klimator-pdf2/600/400',
      ],
    },
    {
      name: 'Klimator — FTP Security',
      description: 'Wrote an article on developing a solution to enhance FTP security for legacy systems using inotify on Linux for secure, real-time file monitoring.',
      tech: ['Linux', 'inotify', 'Security'],
      url: '#',
      urlLabel: 'Klimator',
      launchDate: '2024',
      images: [
        'https://picsum.photos/seed/klimator-ftp1/600/400',
        'https://picsum.photos/seed/klimator-ftp2/600/400',
      ],
    },
    {
      name: 'Omika — UDRP Automation',
      description: 'Created an automated solution that helps lawyers fill out Uniform Domain-Name Dispute-Resolution Policies with higher quality and consistency, saving hours of manual work.',
      tech: ['Automation', 'Legal Tech', 'Full-Stack'],
      url: '#',
      urlLabel: 'Omika',
      launchDate: '2024',
      images: [
        'https://picsum.photos/seed/omika1/600/400',
        'https://picsum.photos/seed/omika2/600/400',
      ],
    },
  ],
  skills: [
    { name: 'TypeScript', level: 95, category: 'language' },
    { name: 'JavaScript', level: 95, category: 'language' },
    { name: 'Python', level: 75, category: 'language' },
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'Next.js', level: 88, category: 'frontend' },
    { name: 'React Native', level: 80, category: 'frontend' },
    { name: 'Tailwind CSS', level: 90, category: 'frontend' },
    { name: 'Node.js', level: 92, category: 'backend' },
    { name: 'PostgreSQL', level: 82, category: 'backend' },
    { name: 'Supabase', level: 85, category: 'backend' },
    { name: 'REST APIs', level: 90, category: 'backend' },
    { name: 'Docker', level: 75, category: 'devops' },
    { name: 'CI/CD', level: 78, category: 'devops' },
    { name: 'Linux/Hetzner', level: 80, category: 'devops' },
  ],
}
