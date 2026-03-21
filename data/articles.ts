export interface Article {
  id: string;
  title: string;
  author: string;
  source: string;
  sourceType: 'article' | 'pdf' | 'tweet';
  readTime: string;
  progress: number;
  coverImage: string;
  accentColor: string;
  savedAt?: string;
  isRead?: boolean;
  tags?: string[];
  publishDate?: string;
  body?: string[];
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'In defense of not reading the code',
    author: 'Ben Shoemaker',
    source: 'benshoemaker.us',
    sourceType: 'article',
    readTime: '4 min',
    progress: 80,
    coverImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    accentColor: '#e07b27',
    savedAt: '2 hours ago',
    isRead: false,
    publishDate: 'Mar 10, 2026',
    body: [
      'There is a pervasive belief in software engineering that reading code is an essential skill. We are told that great engineers read code voraciously, that understanding a codebase requires reading every line, and that code review means carefully parsing each diff.',
      'I want to push back on this idea. Not because reading code is unimportant, but because we have elevated it to a status it does not deserve. Reading code is a tool, not a virtue.',
      'The best engineers I have worked with do not read code line by line. They build mental models. They understand systems at the architectural level first, then dive into specifics only when needed. They ask questions before they read. They form hypotheses and test them.',
      'When you sit down to understand a new codebase, resist the urge to start reading from the top of main.ts. Instead, ask yourself: what does this system do? What are its inputs and outputs? What are the key abstractions?',
      'Once you have a mental model, reading code becomes targeted. You know where to look. You know what matters and what is incidental complexity. You can skip the boilerplate and focus on the interesting parts.',
      'This approach is not just more efficient — it leads to deeper understanding. When you read code with a model in mind, you notice when reality diverges from your expectations. Those divergences are where the bugs live, where the design decisions matter.',
    ],
  },
  {
    id: '2',
    title: 'Thread: Why most developer tools fail',
    author: 'Boris Cherny',
    source: 'Twitter',
    sourceType: 'tweet',
    readTime: '2 min',
    progress: 30,
    coverImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
    accentColor: '#1d9bf0',
    savedAt: '3 hours ago',
    isRead: false,
    publishDate: 'Mar 9, 2026',
  },
  {
    id: '3',
    title: 'The Software Shakeout: What Is Durable and What Will Be Swept Away?',
    author: 'Dan Hockenmaier',
    source: "Dan Hock's Essays",
    sourceType: 'article',
    readTime: '6 min',
    progress: 10,
    coverImage: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
    accentColor: '#4A90D9',
    savedAt: '5 hours ago',
    isRead: false,
    publishDate: 'Mar 8, 2026',
  },
  {
    id: '4',
    title: 'Application-Centric AI Evals For Engineers and Technical PMs',
    author: 'Shreya Shankar',
    source: 'readwise.io',
    sourceType: 'pdf',
    readTime: '17 min',
    progress: 55,
    coverImage: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400',
    accentColor: '#10b981',
    savedAt: 'Yesterday',
    isRead: false,
    publishDate: 'Mar 5, 2026',
  },
  {
    id: '5',
    title: 'How to build a great engineering culture from scratch',
    author: 'Will Larson',
    source: 'lethain.com',
    sourceType: 'article',
    readTime: '12 min',
    progress: 100,
    coverImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
    accentColor: '#4A90D9',
    savedAt: '3 days ago',
    isRead: true,
    publishDate: 'Mar 1, 2026',
  },
  {
    id: '6',
    title: 'Attention Is All You Need - Transformer Architecture',
    author: 'Vaswani et al.',
    source: 'arxiv.org',
    sourceType: 'pdf',
    readTime: '45 min',
    progress: 15,
    coverImage: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400',
    accentColor: '#ef4444',
    savedAt: '4 days ago',
    isRead: false,
    publishDate: 'Feb 28, 2026',
  },
  {
    id: '7',
    title: 'The end of the Copilot era: Why agentic AI changes everything',
    author: 'Luca Rossi',
    source: 'Refactoring',
    sourceType: 'article',
    readTime: '8 min',
    progress: 0,
    coverImage: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
    accentColor: '#f59e0b',
    savedAt: '5 days ago',
    isRead: false,
    publishDate: 'Feb 25, 2026',
  },
  {
    id: '8',
    title: 'Hot take: The best code is the code you never wrote',
    author: 'Kelsey Hightower',
    source: 'Twitter',
    sourceType: 'tweet',
    readTime: '1 min',
    progress: 100,
    coverImage: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    accentColor: '#1d9bf0',
    savedAt: '5 days ago',
    isRead: true,
    publishDate: 'Feb 24, 2026',
  },
];

export const readingItems = articles.filter((a) => a.progress > 0 && a.progress < 100);
export const libraryItems = articles;
