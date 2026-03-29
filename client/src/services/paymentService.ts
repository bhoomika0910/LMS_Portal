import { api } from './api';

export const paymentService = {
  createCheckoutSession: (payload: { courseId: string; coupon?: string }) =>
    api.post('/payments/create-checkout-session', payload),
  verify: (payload: Record<string, unknown>) => api.post('/payments/verify', payload),
  refund: (orderId: string) => api.post(`/payments/refund/${orderId}`),
};
