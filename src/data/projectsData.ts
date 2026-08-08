export interface Project {
  id: string;
  title: string;
  description: {
    UZ: string;
    EN: string;
    RU: string;
  };
  category: "web" | "mobile" | "systems";
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: "trackcast",
    title: "TrackCast Telemetry Platform",
    description: {
      UZ: "SQLite bazasi va foto/video sessiyalar tarixini saqlovchi mobil telemetriya ilovasi.",
      EN: "Mobile telemetry application integrating local SQLite databases to capture media session history.",
      RU: "Мобильное приложение телеметрии с интеграцией SQLite для сохранения истории медиа-сессий.",
    },
    category: "mobile",
    techStack: ["React Native", "TypeScript", "SQLite", "Expo"],
    githubUrl: "https://github.com/Azizbek433/TrackCast",
    featured: true,
  },
  {
    id: "educode-hub",
    title: "EduCode Hub Platform",
    description: {
      UZ: "Interaktiv ta'lim va dasturlash topshiriqlarini bajarish uchun mo'ljallangan LMS platforma.",
      EN: "Interactive LMS platform designed for coding tutorials and interactive tech learning.",
      RU: "Интерактивная LMS платформа для обучения программированию и выполнения задач.",
    },
    category: "web",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    githubUrl: "https://github.com/Azizbek433/educode-hub",
    demoUrl: "https://educode-hub.vercel.app",
    featured: true,
  },
  {
    id: "dino-runner-cpp",
    title: "2D Dino Runner Engine",
    description: {
      UZ: "SFML 3 grafik kutubxonasi yordamida C++ da yozilgan va optimallashtirilgan 2D o'yin dvigateli.",
      EN: "High-performance 2D runner game engine built in C++ using SFML 3 library.",
      RU: "Высокопроизводительный 2D игровой движок на C++ с использованием библиотеки SFML 3.",
    },
    category: "systems",
    techStack: ["C++", "SFML 3", "OOP", "Game Loop"],
    githubUrl: "https://github.com/Azizbek433/Dino-Runner-CPP",
    featured: true,
  },
  {
    id: "study-mate-bot",
    title: "StudyMate UZ Telegram Bot",
    description: {
      UZ: "O'quv rejalari va vazifalarni avtomatlashtiruvchi intellektual Telegram yordamchi boti.",
      EN: "Automated Telegram assistant bot for managing study schedules and task workflows.",
      RU: "Автоматизированный Telegram-бот для управления учебными расписаниями и задачами.",
    },
    category: "web",
    techStack: ["Python", "aiogram", "SQLite", "Asyncio"],
    githubUrl: "https://github.com/Azizbek432/My_Python-backend-projects",
    featured: false,
  },
];