export interface FeedItem {
  id: string;
  title: string;
  source: string;
  author: string;
  time: string;
  status: 'unseen' | 'seen';
}

export interface Feed {
  id: string;
  title: string;
  iconColor: string;
  rssUrl?: string;
  items: FeedItem[];
}

export interface FeedFolder {
  id: string;
  name: string;
  feeds: Feed[];
}

export const feedFolders: FeedFolder[] = [
  {
    id: 'ff1',
    name: 'Tech News',
    feeds: [
      {
        id: 'f1',
        title: 'Hacker News - Top',
        iconColor: '#ff6600',
        rssUrl: 'https://news.ycombinator.com/rss',
        items: [
          { id: 'fi1', title: 'Show HN: I built a tool to generate API docs from code', source: 'github.com', author: 'dsmith', time: '2h', status: 'unseen' },
          { id: 'fi2', title: 'Why SQLite is so fast (2024)', source: 'sqlite.org', author: 'drh', time: '4h', status: 'unseen' },
          { id: 'fi3', title: 'The future of web development in 2026', source: 'blog.vercel.com', author: 'rauchg', time: '5h', status: 'seen' },
        ],
      },
      {
        id: 'f2',
        title: 'TechCrunch',
        iconColor: '#0a8f00',
        rssUrl: 'https://techcrunch.com/feed/',
        items: [
          { id: 'fi4', title: 'AI startup raises $200M to build next-gen coding tools', source: 'techcrunch.com', author: 'Kate Clark', time: '1h', status: 'unseen' },
          { id: 'fi5', title: 'Apple announces new developer tools at WWDC', source: 'techcrunch.com', author: 'Brian Heater', time: '3h', status: 'unseen' },
        ],
      },
    ],
  },
  {
    id: 'ff2',
    name: 'Engineering Blogs',
    feeds: [
      {
        id: 'f3',
        title: 'Netflix Tech Blog',
        iconColor: '#e50914',
        rssUrl: 'https://netflixtechblog.com/feed',
        items: [
          { id: 'fi6', title: 'How we scaled our recommendation engine to 300M users', source: 'netflixtechblog.com', author: 'Netflix Eng', time: '1d', status: 'unseen' },
        ],
      },
    ],
  },
  {
    id: 'ff3',
    name: 'Newsletters',
    feeds: [
      {
        id: 'f4',
        title: 'The Pragmatic Engineer',
        iconColor: '#4A90D9',
        rssUrl: 'https://pragmaticengineer.com/rss',
        items: [
          { id: 'fi7', title: 'Inside the AI hiring boom: what companies actually look for', source: 'pragmaticengineer.com', author: 'Gergely Orosz', time: '8h', status: 'unseen' },
        ],
      },
    ],
  },
];
