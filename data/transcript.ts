export interface TranscriptSegment {
  id: string;
  startTime: string;
  endTime: string;
  text: string;
  isHighlighted?: boolean;
  speaker?: string;
}

export const sampleTranscript: TranscriptSegment[] = [
  { id: 't1', startTime: '00:00', endTime: '00:42', speaker: 'Host', text: "Welcome back to the show. Today I'm sitting down with someone who's been at the center of one of the most interesting shifts in software engineering." },
  { id: 't2', startTime: '00:42', endTime: '01:15', speaker: 'Host', text: "So let's start with the big question — what happens when coding itself becomes solved? What does the job of a software engineer look like?" },
  { id: 't3', startTime: '01:15', endTime: '02:03', speaker: 'Guest', text: "That's the question we think about every day. I think the honest answer is: we don't fully know. But I can tell you what we're seeing." },
  { id: 't4', startTime: '02:03', endTime: '02:48', speaker: 'Guest', text: "Engineers are spending less time on the mechanics of writing code and more time on understanding problems deeply. The skill shifts from syntax to systems thinking.", isHighlighted: true },
  { id: 't5', startTime: '02:48', endTime: '03:30', speaker: 'Host', text: "That's fascinating. So it's not that engineers become irrelevant — they become more important but in a different way?" },
  { id: 't6', startTime: '03:30', endTime: '04:15', speaker: 'Guest', text: "Exactly. The most important thing is to ship something that works. You can always iterate later. But you need to understand the problem well enough to know what 'works' means.", isHighlighted: true },
  { id: 't7', startTime: '04:15', endTime: '05:02', speaker: 'Host', text: "How do you think about the build vs buy decision now? With AI making building easier, does the calculus change?" },
  { id: 't8', startTime: '05:02', endTime: '05:45', speaker: 'Guest', text: "It changes dramatically. The cost of building has dropped so much that the bar for buying is much higher now. You need a really compelling reason to take on a dependency." },
  { id: 't9', startTime: '05:45', endTime: '06:30', speaker: 'Guest', text: "We've found that the best approach is to start simple, ship fast, and let real usage tell you where to invest. Most of the time, the features you think matter don't." },
  { id: 't10', startTime: '06:30', endTime: '07:15', speaker: 'Host', text: "What advice would you give to someone just starting their career in software engineering today?" },
  { id: 't11', startTime: '07:15', endTime: '08:00', speaker: 'Guest', text: "Focus on understanding problems, not just solutions. Learn to communicate clearly. And most importantly, build things — the best way to learn is by doing." },
  { id: 't12', startTime: '08:00', endTime: '08:45', speaker: 'Guest', text: "I think curiosity is the most underrated skill. The engineers who thrive are the ones who ask 'why' relentlessly and aren't satisfied with surface-level answers." },
];
