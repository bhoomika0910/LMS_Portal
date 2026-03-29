import { Router } from 'express';
import { placeholder } from '../controllers/placeholderController.js';

const router = Router();

router.post('/video', placeholder('UPLOAD :: video to Cloudinary'));
router.post('/thumbnail', placeholder('UPLOAD :: course thumbnail'));
router.post('/avatar', placeholder('UPLOAD :: user avatar'));
router.delete('/resource/:publicId', placeholder('UPLOAD :: delete resource'));

export default router;
