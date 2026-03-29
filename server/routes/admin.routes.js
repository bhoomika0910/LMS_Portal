import { Router } from 'express';
import { placeholder } from '../controllers/placeholderController.js';

const router = Router();

router.get('/stats', placeholder('ADMIN :: platform KPIs'));
router.get('/users', placeholder('ADMIN :: list users'));
router.put('/users/:id/ban', placeholder('ADMIN :: ban user'));
router.put('/users/:id/role', placeholder('ADMIN :: change role'));
router.get('/orders', placeholder('ADMIN :: orders'));
router.get('/revenue', placeholder('ADMIN :: revenue analytics'));
router.post('/coupons', placeholder('ADMIN :: create coupon'));
router.get('/coupons', placeholder('ADMIN :: list coupons'));
router.delete('/coupons/:id', placeholder('ADMIN :: delete coupon'));
router.get('/audit-logs', placeholder('ADMIN :: audit logs'));
router.post('/payouts/:instructorId', placeholder('ADMIN :: trigger payout'));

export default router;
