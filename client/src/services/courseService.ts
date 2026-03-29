import { api } from './api';

export const courseService = {
  list: (params?: Record<string, unknown>) => api.get('/courses', { params }),
  getCourseBySlug: (slug: string) => api.get(`/courses/${slug}`),
  getInstructorCourses: () => api.get('/courses/instructor/my-courses'),
};
