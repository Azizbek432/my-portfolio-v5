export interface Article {
  slug: string;
  title: { UZ: string; EN: string; RU: string };
  description: { UZ: string; EN: string; RU: string };
  date: string;
  readTime: string;
  tags: string[];
  views: number;
}

export const articles: Article[] = [
  {
    slug: "ai-era-review-workflow",
    title: {
      UZ: "The AI Era Needs a Better Review Workflow",
      EN: "The AI Era Needs a Better Review Workflow",
      RU: "The AI Era Needs a Better Review Workflow",
    },
    description: {
      UZ: "AI agentlar minglab qatorlik PR'larni bir necha daqiqada yozadi, code review esa bosh og'riq bo'lishni boshladi.",
      EN: "AI agents write thousands of lines of PRs in minutes, and code review is becoming a bottleneck.",
      RU: "ИИ-агенты пишут тысячи строк PR за минуты, а код-ревью становится узким горлышком.",
    },
    date: "August 7, 2026",
    readTime: "6 min read",
    tags: ["ai", "github", "code-review", "workflow"],
    views: 0,
  },
];