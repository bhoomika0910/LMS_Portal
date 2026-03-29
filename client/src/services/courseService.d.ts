export declare const courseService: {
    list: (params?: Record<string, unknown>) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    getCourseBySlug: (slug: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    getInstructorCourses: () => Promise<import("axios").AxiosResponse<any, any, {}>>;
};
