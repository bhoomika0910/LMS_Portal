export declare const usePlayer: () => {
    currentCourseId: string | null;
    currentLessonId: string | null;
    isPlaying: boolean;
    playbackRate: number;
} & {
    loadLesson: (courseId: string, lessonId: string) => void;
    setPlaying: (value: boolean) => void;
    setPlaybackRate: (rate: number) => void;
};
