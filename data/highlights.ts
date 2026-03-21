export interface Highlight {
  id: string;
  highlightText: string;
  sourceTitle: string;
  sourceId: string;
  sourceType: 'article' | 'podcast';
  notePreview?: string;
  tags: string[];
  createdAt: string;
}

export const highlights: Highlight[] = [
  {
    id: 'h1',
    highlightText: 'The best engineers I have worked with do not read code line by line. They build mental models.',
    sourceTitle: 'In defense of not reading the code',
    sourceId: '1',
    sourceType: 'article',
    notePreview: 'This resonates — focus on understanding systems, not syntax.',
    tags: ['engineering', 'mental-models'],
    createdAt: '2 hours ago',
  },
  {
    id: 'h2',
    highlightText: 'When you read code with a model in mind, you notice when reality diverges from your expectations.',
    sourceTitle: 'In defense of not reading the code',
    sourceId: '1',
    sourceType: 'article',
    tags: ['engineering'],
    createdAt: '2 hours ago',
  },
  {
    id: 'h3',
    highlightText: 'The companies that will thrive are those building durable advantages that compound over time.',
    sourceTitle: 'The Software Shakeout',
    sourceId: '3',
    sourceType: 'article',
    notePreview: 'Think about what compounds in our product.',
    tags: ['strategy', 'product'],
    createdAt: '5 hours ago',
  },
  {
    id: 'h4',
    highlightText: 'Evals are not just about accuracy — they are about understanding where your system fails and why.',
    sourceTitle: 'Application-Centric AI Evals',
    sourceId: '4',
    sourceType: 'article',
    tags: ['ai', 'engineering'],
    createdAt: 'Yesterday',
  },
  {
    id: 'h5',
    highlightText: 'The shift from copilot to agent is not incremental — it fundamentally changes the developer workflow.',
    sourceTitle: 'The end of the Copilot era',
    sourceId: '7',
    sourceType: 'article',
    notePreview: 'Agentic workflows require rethinking how we structure tasks.',
    tags: ['ai', 'product'],
    createdAt: '2 days ago',
  },
  {
    id: 'h6',
    highlightText: 'The most important thing is to ship something that works. You can always iterate later.',
    sourceTitle: 'Head of Claude Code: What happens after coding is solved?',
    sourceId: 'e1',
    sourceType: 'podcast',
    tags: ['product', 'shipping'],
    createdAt: '3 days ago',
  },
];
