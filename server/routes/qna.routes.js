import { Router } from 'express';
import { placeholder } from '../controllers/placeholderController.js';

const router = Router();

router.post('/:courseId', placeholder('QNA :: post question'));
router.get('/:courseId', placeholder('QNA :: list questions'));
router.post('/:questionId/answers', placeholder('QNA :: answer question'));
router.put('/:questionId/resolve', placeholder('QNA :: mark resolved'));
router.put('/:questionId/pin', placeholder('QNA :: pin question'));

export default router;
