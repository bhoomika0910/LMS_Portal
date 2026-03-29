import mongoose from 'mongoose';

const { Schema } = mongoose;

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: String,
    type: { type: String, enum: ['percent', 'fixed'], default: 'percent' },
    value: { type: Number, required: true, min: 0 },
    maxDiscountAmount: Number,
    minPurchaseAmount: { type: Number, default: 0 },
    usageLimit: Number,
    usagePerUserLimit: Number,
    usageCount: { type: Number, default: 0 },
    startsAt: Date,
    expiresAt: Date,
    isActive: { type: Boolean, default: true },
    autoApply: { type: Boolean, default: false },
    stackable: { type: Boolean, default: false },
    applicableCourses: { type: [{ type: Schema.Types.ObjectId, ref: 'Course' }], default: [] },
    applicableRoles: { type: [String], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true },
);

couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1, expiresAt: 1 });

export const Coupon = mongoose.model('Coupon', couponSchema);
