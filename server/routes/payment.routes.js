import { Router } from 'express';
import { placeholder } from '../controllers/placeholderController.js';

const router = Router();

router.post('/create-checkout-session', placeholder('PAYMENT :: create checkout session'));
router.post('/webhook', placeholder('PAYMENT :: webhook handler'));
router.post('/verify', placeholder('PAYMENT :: verify payment'));
router.get('/history', placeholder('PAYMENT :: history'));
router.post('/refund/:orderId', placeholder('PAYMENT :: refund order'));

export default router;
