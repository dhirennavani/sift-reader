import Svg, { Path, Circle } from 'react-native-svg';

/**
 * Elegant hand-drawn icons.
 *
 * Design language: organic curves with slightly uneven proportions,
 * variable stroke width via SVG paths (not uniform strokeWidth),
 * graceful and calligraphic — like a fountain pen on fine paper.
 *
 * Each icon is a single continuous-feeling path for that
 * "drawn in one stroke" quality.
 */

type IconProps = {
  size?: number;
  color?: string;
  filled?: boolean;
};

export function SketchHome({ size = 24, color = '#000', filled = false }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.8 10.8L12 4l8.2 6.8c.1.1.2.3.2.4V20c0 .7-.5 1.2-1.1 1.2H15v-5.5c0-.5-.3-.9-.8-.9h-4.4c-.5 0-.8.4-.8.9v5.5H5c-.6 0-1.1-.5-1.1-1.2v-8.8c0-.1 0-.3.1-.4z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
      />
    </Svg>
  );
}

export function SketchBook({ size = 24, color = '#000', filled = false }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Open book — two pages meeting at spine */}
      <Path
        d="M12 6.8C10.8 5.5 8.5 4.5 5.5 4.8c-.4 0-.7.3-.7.7v11.8c0 .4.3.7.7.7 2.8-.2 5.2.5 6.5 1.8"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
      />
      <Path
        d="M12 6.8c1.2-1.3 3.5-2.3 6.5-2c.4 0 .7.3.7.7v11.8c0 .4-.3.7-.7.7-2.8-.2-5.2.5-6.5 1.8"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
      />
      <Path
        d="M12 6.8v13"
        stroke={color}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SketchFeed({ size = 24, color = '#000', filled = false }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Radio waves — three arcs emanating from a dot */}
      <Circle
        cx="5" cy="19" r="1.8"
        fill={filled ? color : color}
        stroke={color}
        strokeWidth="0.5"
      />
      <Path
        d="M4 13.5c2.8-.1 5.5 1 7.5 3.2"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <Path
        d="M4 7.8c5-.2 9.8 1.5 13 5.5"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SketchHeadphones({ size = 24, color = '#000', filled = false }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Headphone band — organic arc */}
      <Path
        d="M4.2 16.5V12c0-4.3 3.5-7.8 7.8-7.8s7.8 3.5 7.8 7.8v4.5"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Left ear cup */}
      <Path
        d="M3 16c0-.7.5-1.2 1.1-1.2h.8c.3 0 .6.2.6.6v5.2c0 .6-.4 1.1-1 1.1h-.4c-.6 0-1.1-.5-1.1-1.1V16z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
      />
      {/* Right ear cup */}
      <Path
        d="M18.5 16c0-.7.5-1.2 1.1-1.2h.8c.3 0 .6.2.6.6v5.2c0 .6-.4 1.1-1 1.1h-.4c-.6 0-1.1-.5-1.1-1.1V16z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
      />
    </Svg>
  );
}

export function SketchSearch({ size = 24, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Magnifying glass — slightly organic circle + angled handle */}
      <Circle
        cx="10.5" cy="10.5" r="6"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <Path
        d="M15.2 15.5l5 4.8"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SketchUser({ size = 24, color = '#000', filled = false }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Head */}
      <Circle
        cx="12" cy="8.2" r="3.8"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        fill={filled ? color : 'none'}
      />
      {/* Shoulders — gentle arc */}
      <Path
        d="M5 20.5c.2-3.5 3.2-6.2 7-6.2s6.8 2.7 7 6.2"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        fill={filled ? color : 'none'}
      />
    </Svg>
  );
}

/** Section icons — used inline with section headers */

export function SketchBookOpen({ size = 20, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 5.5c2.5-.8 5.5-.5 7.8.8 1 .6 1.6 1.2 2.2 2"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <Path
        d="M22 5.5c-2.5-.8-5.5-.5-7.8.8-1 .6-1.6 1.2-2.2 2"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <Path d="M12 8.3v12" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
      <Path
        d="M2 5.5v13c2.5-.5 5.5-.2 7.8 1 1 .5 1.6 1 2.2 1.5"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <Path
        d="M22 5.5v13c-2.5-.5-5.5-.2-7.8 1-1 .5-1.6 1-2.2 1.5"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SketchHeadphone({ size = 20, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.5 16V12c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5v4"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <Path
        d="M3.5 15.5c0-.5.4-1 .9-1h.6c.3 0 .5.2.5.5v5c0 .5-.3.8-.7.8h-.5c-.5 0-.8-.4-.8-.8v-4.5z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.5 15.5c0-.5.4-1 .9-1h.6c.3 0 .5.2.5.5v5c0 .5-.3.8-.7.8h-.5c-.5 0-.8-.4-.8-.8v-4.5z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
