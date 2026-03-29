import { api } from './api';
export const paymentService = {
    createCheckoutSession: (payload) => api.post('/payments/create-checkout-session', payload),
    verify: (payload) => api.post('/payments/verify', payload),
    refund: (orderId) => api.post(`/payments/refund/${orderId}`),
};
