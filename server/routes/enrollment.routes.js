import { Router } from 'express';
import { placeholder } from '../controllers/placeholderController.js';

const router = Router();

router.post('/', placeholder('ENROLLMENT :: enroll in a course'));
router.get('/my', placeholder('ENROLLMENT :: list student enrollments'));
router.get('/:courseId/progress', placeholder('ENROLLMENT :: course progress'));
router.post('/:courseId/lessons/:lessonId/complete', placeholder('ENROLLMENT :: mark lesson complete'));
router.post('/:courseId/notes', placeholder('ENROLLMENT :: save note'));
router.get('/:courseId/notes', placeholder('ENROLLMENT :: get notes'));
router.get('/:courseId/certificate', placeholder('ENROLLMENT :: certificate'));

export default router;
