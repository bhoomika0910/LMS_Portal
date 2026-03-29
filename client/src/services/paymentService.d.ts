export declare const paymentService: {
    createCheckoutSession: (payload: {
        courseId: string;
        coupon?: string;
    }) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    verify: (payload: Record<string, unknown>) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    refund: (orderId: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
};
