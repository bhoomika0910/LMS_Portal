import mongoose from 'mongoose';

const { Schema } = mongoose;

const progressSchema = new Schema(
  {
    percent: { type: Number, default: 0 },
    completedLessons: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
      default: [],
    },
    lastLesson: { type: Schema.Types.ObjectId, ref: 'Lesson' },
    notes: String,
  },
  { _id: false },
);

const certificateSchema = new Schema(
  {
    code: String,
    issuedAt: Date,
    expiresAt: Date,
    downloadUrl: String,
  },
  { _id: false },
);

const enrollmentSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    status: {
      type: String,
      enum: ['active', 'completed', 'dropped', 'refunded', 'expired'],
      default: 'active',
    },
    startedAt: { type: Date, default: Date.now },
    completedAt: Date,
    lastAccessedAt: Date,
    progress: { type: progressSchema, default: () => ({}) },
    certificate: { type: certificateSchema, default: () => ({}) },
    source: { type: String, enum: ['organic', 'coupon', 'bulk', 'internal'], default: 'organic' },
  },
  { timestamps: true },
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
enrollmentSchema.index({ status: 1 });

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
