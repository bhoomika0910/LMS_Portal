import mongoose from 'mongoose';

const { Schema } = mongoose;

const sectionSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true, trim: true },
    description: String,
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    releaseDate: Date,
    durationMinutes: { type: Number, default: 0 },
    lessonCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

sectionSchema.index({ course: 1, order: 1 }, { unique: true });

export const Section = mongoose.model('Section', sectionSchema);
