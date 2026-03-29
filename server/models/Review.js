import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: String,
    body: String,
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    status: { type: String, enum: ['pending', 'published', 'flagged', 'removed'], default: 'pending' },
    likes: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    reply: {
      author: { type: Schema.Types.ObjectId, ref: 'User' },
      message: String,
      createdAt: Date,
    },
    flaggedReasons: { type: [String], default: [] },
    editedAt: Date,
  },
  { timestamps: true },
);

reviewSchema.index({ course: 1, status: 1 });
reviewSchema.index({ student: 1, course: 1 }, { unique: true });

export const Review = mongoose.model('Review', reviewSchema);
