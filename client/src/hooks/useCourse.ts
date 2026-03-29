import { useQuery } from '@tanstack/react-query';
import { courseService } from '../services/courseService';

export const useCourse = (slug: string) => {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: () => courseService.getCourseBySlug(slug),
    enabled: Boolean(slug),
  });
};
