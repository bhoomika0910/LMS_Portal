import mongoose from 'mongoose';

const { Schema } = mongoose;

const attachmentSchema = new Schema(
  {
    label: String,
    url: String,
  },
  { _id: false },
);

const answerSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isInstructor: { type: Boolean, default: false },
    attachments: { type: [attachmentSchema], default: [] },
    upvotes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const qnaSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson' },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: String, required: true },
    details: String,
    status: { type: String, enum: ['open', 'answered', 'resolved', 'archived'], default: 'open' },
    tags: { type: [String], default: [] },
    upvotes: { type: Number, default: 0 },
    watchers: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },
    isResolved: { type: Boolean, default: false },
    resolvedAt: Date,
    resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    lastActivityAt: { type: Date, default: Date.now },
    answers: { type: [answerSchema], default: [] },
  },
  { timestamps: true },
);

qnaSchema.index({ course: 1, lesson: 1 });
qnaSchema.index({ status: 1, lastActivityAt: -1 });

export const QnA = mongoose.model('QnA', qnaSchema);
