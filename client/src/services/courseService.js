import { api } from './api';
export const courseService = {
    list: (params) => api.get('/courses', { params }),
    getCourseBySlug: (slug) => api.get(`/courses/${slug}`),
    getInstructorCourses: () => api.get('/courses/instructor/my-courses'),
};
