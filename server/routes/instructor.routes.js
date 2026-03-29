import { Router } from 'express';
import { placeholder } from '../controllers/placeholderController.js';

const router = Router();

router.get('/dashboard', placeholder('INSTRUCTOR :: dashboard KPIs'));
router.get('/students', placeholder('INSTRUCTOR :: students roster'));
router.get('/revenue', placeholder('INSTRUCTOR :: revenue breakdown'));
router.get('/reviews', placeholder('INSTRUCTOR :: reviews overview'));
router.put('/profile', placeholder('INSTRUCTOR :: update profile'));
router.get('/notifications', placeholder('INSTRUCTOR :: notifications list'));
router.put('/notifications/:id/read', placeholder('INSTRUCTOR :: mark notification'));
router.get('/analytics', placeholder('INSTRUCTOR :: analytics'));

export default router;
