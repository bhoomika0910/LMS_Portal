import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type PlayerState = {
  currentCourseId: string | null;
  currentLessonId: string | null;
  isPlaying: boolean;
  playbackRate: number;
};

type PlayerActions = {
  loadLesson: (courseId: string, lessonId: string) => void;
  setPlaying: (value: boolean) => void;
  setPlaybackRate: (rate: number) => void;
};

export const usePlayerStore = create<PlayerState & PlayerActions>()(
  devtools((set) => ({
    currentCourseId: null,
    currentLessonId: null,
    isPlaying: false,
    playbackRate: 1,
    loadLesson: (courseId, lessonId) => set({ currentCourseId: courseId, currentLessonId: lessonId }),
    setPlaying: (value) => set({ isPlaying: value }),
    setPlaybackRate: (rate) => set({ playbackRate: rate }),
  })),
);
