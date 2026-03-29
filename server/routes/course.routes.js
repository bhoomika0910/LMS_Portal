import { Router } from 'express';
import { placeholder } from '../controllers/placeholderController.js';

const router = Router();

router.get('/', placeholder('COURSE :: list published courses'));
router.post('/', placeholder('COURSE :: create draft'));
router.put('/:id', placeholder('COURSE :: update course'));
router.delete('/:id', placeholder('COURSE :: delete course'));
router.post('/:id/submit', placeholder('COURSE :: submit for approval'));
router.post('/:id/approve', placeholder('COURSE :: approve course'));
router.post('/:id/reject', placeholder('COURSE :: reject course'));
router.get('/instructor/my-courses', placeholder('COURSE :: instructor courses'));
router.get('/admin/all', placeholder('COURSE :: admin list all'));
router.post('/:id/sections', placeholder('COURSE :: add section'));
router.post('/:id/sections/:sid/lessons', placeholder('COURSE :: add lesson'));
router.put('/:id/sections/:sid/lessons/:lid', placeholder('COURSE :: update lesson'));
router.delete('/:id/sections/:sid/lessons/:lid', placeholder('COURSE :: delete lesson'));
router.get('/:slug', placeholder('COURSE :: get course by slug'));

export default router;
