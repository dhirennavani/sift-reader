export interface Episode {
  id: string;
  title: string;
  duration: string;
  publishedAt: string;
  progress: number;
  remaining: string;
  description?: string;
}

export interface Podcast {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  description?: string;
  episodes: Episode[];
}

export const subscribedPodcasts: Podcast[] = [
  {
    id: 'p1',
    title: "Lenny's Podcast",
    author: 'Lenny Rachitsky',
    coverImage: 'https://images.pexels.com/photos/7367/startup-photos.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'Business',
    episodes: [
      { id: 'e1', title: 'Head of Claude Code: What happens after coding is solved?', duration: '54 min', publishedAt: '2 days ago', progress: 45, remaining: '17 min left', description: 'Boris Power, head of Claude Code at Anthropic, joins Lenny to discuss how AI is transforming the role of software engineers. They explore what happens when writing code is no longer the bottleneck, and how the best engineers are shifting toward systems thinking and problem understanding.' },
      { id: 'e2', title: 'How Notion built a $10B company with product-led growth', duration: '1h 12 min', publishedAt: '1 week ago', progress: 0, remaining: '' },
    ],
  },
  {
    id: 'p2',
    title: 'Lex Fridman Podcast',
    author: 'Lex Fridman',
    coverImage: 'https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Science',
    episodes: [
      { id: 'e3', title: 'Sam Altman: OpenAI, GPT-5, Superintelligence', duration: '2h 14 min', publishedAt: '3 days ago', progress: 20, remaining: '1h 22 min left', description: 'Sam Altman returns to discuss the path to GPT-5, the challenges of building superintelligent systems, and his vision for how AI will reshape society. A wide-ranging conversation on safety, competition, and the future of intelligence.' },
    ],
  },
  {
    id: 'p3',
    title: 'My First Million',
    author: 'Sam Parr & Shaan Puri',
    coverImage: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Business',
    episodes: [
      { id: 'e4', title: 'Conviction vs. Permission: Why Most Founders Stay Broke', duration: '58 min', publishedAt: '1 day ago', progress: 70, remaining: '18 min left', description: 'Sam and Shaan break down why most founders wait for permission instead of acting on conviction, and how the most successful entrepreneurs bet on themselves before anyone else does.' },
    ],
  },
  {
    id: 'p4',
    title: 'a16z Podcast',
    author: 'Andreessen Horowitz',
    coverImage: 'https://images.pexels.com/photos/7792812/pexels-photo-7792812.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Technology',
    episodes: [
      { id: 'e5', title: 'AI and the Future of Enterprise Software', duration: '47 min', publishedAt: '4 days ago', progress: 5, remaining: '42 min left' },
    ],
  },
  {
    id: 'p5',
    title: 'Hard Fork',
    author: 'The New York Times',
    coverImage: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Technology',
    episodes: [
      { id: 'e6', title: 'Inside the AI arms race: who is winning?', duration: '1h 02 min', publishedAt: '2 days ago', progress: 60, remaining: '24 min left', description: 'Kevin and Casey dig into the escalating competition between AI labs, examining who is pulling ahead, what strategies are working, and whether the race is helping or hurting the technology.' },
    ],
  },
  {
    id: 'p6',
    title: 'Radiolab',
    author: 'WNYC Studios',
    coverImage: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Science',
    episodes: [
      { id: 'e7', title: 'Shorts: When the Salmon Came Back', duration: '22 min', publishedAt: '5 days ago', progress: 35, remaining: '14 min left' },
    ],
  },
  {
    id: 'p7',
    title: 'Huberman Lab',
    author: 'Andrew Huberman',
    coverImage: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Health',
    episodes: [
      { id: 'e8', title: 'Tools for Managing Stress & Anxiety', duration: '1h 45 min', publishedAt: '3 days ago', progress: 15, remaining: '1h 28 min left' },
    ],
  },
  {
    id: 'p8',
    title: 'On Being',
    author: 'Krista Tippett',
    coverImage: 'https://images.pexels.com/photos/3760137/pexels-photo-3760137.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Health',
    episodes: [
      { id: 'e9', title: 'The Inner Life of Rebellion', duration: '51 min', publishedAt: '1 week ago', progress: 0, remaining: '' },
    ],
  },
];

export const discoverPodcasts: Podcast[] = [
  { id: 'd1', title: 'The Vergecast', author: 'The Verge', coverImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Technology', description: 'Weekly tech news roundup and analysis from The Verge editors', episodes: [] },
  { id: 'd4', title: 'Darknet Diaries', author: 'Jack Rhysider', coverImage: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Technology', description: 'True stories from the dark side of the internet', episodes: [] },
  { id: 'd9', title: 'Syntax', author: 'Wes Bos & Scott Tolinski', coverImage: 'https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Technology', description: 'A podcast for web developers', episodes: [] },
  { id: 'd2', title: 'Acquired', author: 'Ben Gilbert & David Rosenthal', coverImage: 'https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Business', description: 'Deep dives into the greatest technology companies and acquisitions', episodes: [] },
  { id: 'd3', title: 'How I Built This', author: 'Guy Raz / NPR', coverImage: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Business', description: 'Innovators, entrepreneurs, and the stories behind their movements', episodes: [] },
  { id: 'd10', title: 'Masters of Scale', author: 'Reid Hoffman', coverImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Business', description: 'Surprising theories on how businesses grow', episodes: [] },
  { id: 'd5', title: 'The Daily', author: 'The New York Times', coverImage: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'News', description: 'The biggest stories of the day, told by the best journalists', episodes: [] },
  { id: 'd11', title: 'Up First', author: 'NPR', coverImage: 'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'News', description: 'NPR\'s Up First is the news you need to start your day', episodes: [] },
  { id: 'd12', title: 'Global News Podcast', author: 'BBC World Service', coverImage: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'News', description: 'The latest national and international news from the BBC', episodes: [] },
  { id: 'd6', title: 'Huberman Lab', author: 'Andrew Huberman', coverImage: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Health', description: 'Science and science-based tools for everyday life', episodes: [] },
  { id: 'd13', title: 'Feel Better, Live More', author: 'Dr Rangan Chatterjee', coverImage: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Health', description: 'Conversations to help you live a happier, healthier life', episodes: [] },
  { id: 'd14', title: 'Ten Percent Happier', author: 'Dan Harris', coverImage: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Health', description: 'Meditation and mindfulness for skeptics', episodes: [] },
  { id: 'd7', title: 'Radiolab', author: 'WNYC Studios', coverImage: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Science', description: 'Investigating a strange world where sound illuminates ideas', episodes: [] },
  { id: 'd15', title: 'StarTalk Radio', author: 'Neil deGrasse Tyson', coverImage: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Science', description: 'Science meets pop culture and comedy', episodes: [] },
  { id: 'd16', title: 'In Our Time', author: 'BBC Radio 4', coverImage: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Science', description: 'History of ideas explored through discussion', episodes: [] },
  { id: 'd8', title: '99% Invisible', author: 'Roman Mars', coverImage: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Culture', description: 'Design is everywhere in our lives', episodes: [] },
  { id: 'd17', title: 'Conan O\'Brien Needs a Friend', author: 'Conan O\'Brien', coverImage: 'https://images.pexels.com/photos/3419692/pexels-photo-3419692.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Culture', description: 'Conan O\'Brien, his producer Sona, and his assistant Gourley chat with celebrities', episodes: [] },
  { id: 'd18', title: 'Revisionist History', author: 'Malcolm Gladwell', coverImage: 'https://images.pexels.com/photos/1907784/pexels-photo-1907784.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Culture', description: 'Re-examining overlooked and misunderstood events from the past', episodes: [] },
];

export function groupPodcastsByCategory(podcasts: Podcast[]): Record<string, Podcast[]> {
  return podcasts.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, Podcast[]>);
}
