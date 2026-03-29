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
export declare const usePlayerStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<PlayerState & PlayerActions>, "setState"> & {
    setState<A extends string | {
        type: string;
    }>(partial: (PlayerState & PlayerActions) | Partial<PlayerState & PlayerActions> | ((state: PlayerState & PlayerActions) => (PlayerState & PlayerActions) | Partial<PlayerState & PlayerActions>), replace?: boolean | undefined, action?: A | undefined): void;
}>;
export {};
