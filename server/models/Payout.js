import mongoose from 'mongoose';

const { Schema } = mongoose;

const courseBreakdownSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    amount: { type: Number, default: 0 },
    enrollments: { type: Number, default: 0 },
  },
  { _id: false },
);

const payoutSchema = new Schema(
  {
    instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'processing', 'paid', 'failed'], default: 'pending' },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    method: { type: String, enum: ['stripe', 'paypal', 'bank'], default: 'stripe' },
    transferId: String,
    statementDescriptor: String,
    estimatedDepositDate: Date,
    processedAt: Date,
    failureReason: String,
    notes: String,
    courses: { type: [courseBreakdownSchema], default: [] },
    totals: {
      gross: { type: Number, default: 0 },
      fees: { type: Number, default: 0 },
      net: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

payoutSchema.index({ instructor: 1, createdAt: -1 });
payoutSchema.index({ status: 1 });

export const Payout = mongoose.model('Payout', payoutSchema);
