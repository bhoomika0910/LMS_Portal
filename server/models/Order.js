import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    line1: String,
    line2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  { _id: false },
);

const lineItemSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: String,
    unitPrice: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    appliedCoupon: { type: Schema.Types.ObjectId, ref: 'Coupon' },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [lineItemSchema], default: [] },
    currency: { type: String, default: 'USD' },
    subtotal: { type: Number, required: true },
    discountTotal: { type: Number, default: 0 },
    taxTotal: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'requires_action', 'completed', 'failed', 'refunded', 'cancelled'],
      default: 'pending',
    },
    paymentProvider: { type: String, enum: ['stripe', 'manual', 'free'], default: 'stripe' },
    paymentIntentId: String,
    chargeId: String,
    receiptUrl: String,
    coupon: { type: Schema.Types.ObjectId, ref: 'Coupon' },
    metadata: Schema.Types.Mixed,
    paidAt: Date,
    refundedAt: Date,
    billingDetails: {
      name: String,
      email: String,
      address: { type: addressSchema, default: () => ({}) },
    },
  },
  { timestamps: true },
);

orderSchema.index({ student: 1, createdAt: -1 });
orderSchema.index({ status: 1 });

export const Order = mongoose.model('Order', orderSchema);
