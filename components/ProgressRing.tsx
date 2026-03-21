import Svg, { Circle } from 'react-native-svg';

export function ProgressRing({ progress, size = 28, color = '#4A90D9' }: { progress: number; size?: number; color?: string }) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
      <Circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
      <Circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="2.5" strokeDasharray={`${circumference}`} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
    </Svg>
  );
}
