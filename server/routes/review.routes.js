import { Router } from 'express';
import { placeholder } from '../controllers/placeholderController.js';

const router = Router();

router.post('/:courseId', placeholder('REVIEW :: submit review'));
router.put('/:reviewId', placeholder('REVIEW :: edit review'));
router.delete('/:reviewId', placeholder('REVIEW :: delete review'));
router.get('/:courseId', placeholder('REVIEW :: list course reviews'));
router.post('/:reviewId/reply', placeholder('REVIEW :: instructor reply'));

export default router;
