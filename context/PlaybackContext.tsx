import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Podcast, Episode } from '../data/podcasts';

export const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export type SleepTimerOption = 15 | 30 | 45 | 60 | 'end' | null;

interface PlaybackState {
  currentPodcast: Podcast | null;
  currentEpisode: Episode | null;
  isPlaying: boolean;
  progress: number;
  playbackSpeed: number;
  sleepTimer: SleepTimerOption;
}

type PlaybackAction =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TOGGLE' }
  | { type: 'SKIP_FORWARD' }
  | { type: 'SKIP_BACK' }
  | { type: 'SET_SPEED'; speed: number }
  | { type: 'SET_EPISODE'; podcast: Podcast; episode: Episode }
  | { type: 'CLOSE' }
  | { type: 'SET_SLEEP_TIMER'; timer: SleepTimerOption }
  | { type: 'SET_PROGRESS'; progress: number };

const initialState: PlaybackState = {
  currentPodcast: null,
  currentEpisode: null,
  isPlaying: false,
  progress: 0,
  playbackSpeed: 1,
  sleepTimer: null,
};

function playbackReducer(state: PlaybackState, action: PlaybackAction): PlaybackState {
  switch (action.type) {
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'TOGGLE':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SKIP_FORWARD':
      return { ...state, progress: Math.min(100, state.progress + 5) };
    case 'SKIP_BACK':
      return { ...state, progress: Math.max(0, state.progress - 5) };
    case 'SET_SPEED':
      return { ...state, playbackSpeed: action.speed };
    case 'SET_EPISODE':
      return {
        ...state,
        currentPodcast: action.podcast,
        currentEpisode: action.episode,
        progress: action.episode.progress,
        isPlaying: true,
      };
    case 'CLOSE':
      return { ...initialState };
    case 'SET_SLEEP_TIMER':
      return { ...state, sleepTimer: action.timer };
    case 'SET_PROGRESS':
      return { ...state, progress: action.progress };
    default:
      return state;
  }
}

interface PlaybackContextValue extends PlaybackState {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  skipForward: () => void;
  skipBack: () => void;
  setSpeed: (speed: number) => void;
  setEpisode: (podcast: Podcast, episode: Episode) => void;
  close: () => void;
  setSleepTimer: (timer: SleepTimerOption) => void;
  setProgress: (progress: number) => void;
}

const PlaybackContext = createContext<PlaybackContextValue | null>(null);

export function PlaybackProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playbackReducer, initialState);

  const value: PlaybackContextValue = {
    ...state,
    play: () => dispatch({ type: 'PLAY' }),
    pause: () => dispatch({ type: 'PAUSE' }),
    toggle: () => dispatch({ type: 'TOGGLE' }),
    skipForward: () => dispatch({ type: 'SKIP_FORWARD' }),
    skipBack: () => dispatch({ type: 'SKIP_BACK' }),
    setSpeed: (speed) => dispatch({ type: 'SET_SPEED', speed }),
    setEpisode: (podcast, episode) => dispatch({ type: 'SET_EPISODE', podcast, episode }),
    close: () => dispatch({ type: 'CLOSE' }),
    setSleepTimer: (timer) => dispatch({ type: 'SET_SLEEP_TIMER', timer }),
    setProgress: (progress) => dispatch({ type: 'SET_PROGRESS', progress }),
  };

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback(): PlaybackContextValue {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error('usePlayback must be used within a PlaybackProvider');
  }
  return context;
}
