import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export const usePlayerStore = create()(devtools((set) => ({
    currentCourseId: null,
    currentLessonId: null,
    isPlaying: false,
    playbackRate: 1,
    loadLesson: (courseId, lessonId) => set({ currentCourseId: courseId, currentLessonId: lessonId }),
    setPlaying: (value) => set({ isPlaying: value }),
    setPlaybackRate: (rate) => set({ playbackRate: rate }),
})));
