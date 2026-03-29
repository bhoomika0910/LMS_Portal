import mongoose from 'mongoose';

const { Schema } = mongoose;

const attachmentSchema = new Schema(
  {
    label: String,
    url: String,
    type: { type: String, enum: ['pdf', 'link', 'zip', 'code', 'image', 'other'], default: 'link' },
    size: Number,
  },
  { _id: false },
);

const videoSchema = new Schema(
  {
    url: String,
    publicId: String,
    duration: Number,
    thumbnailUrl: String,
    captions: { type: [String], default: [] },
    status: { type: String, enum: ['processing', 'ready', 'failed'], default: 'ready' },
  },
  { _id: false },
);

const lessonSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    section: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    title: { type: String, required: true },
    slug: { type: String, lowercase: true, trim: true },
    type: { type: String, enum: ['video', 'article', 'quiz', 'resource'], default: 'video' },
    description: String,
    content: String,
    transcript: String,
    order: { type: Number, default: 0 },
    durationMinutes: { type: Number, default: 0 },
    isPreview: { type: Boolean, default: false },
    video: videoSchema,
    attachments: { type: [attachmentSchema], default: [] },
    quiz: {
      questions: { type: [Schema.Types.Mixed], default: [] },
      passingScore: { type: Number, default: 70 },
    },
    stats: {
      viewCount: { type: Number, default: 0 },
      completionCount: { type: Number, default: 0 },
      averageWatchTime: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

lessonSchema.index({ course: 1, section: 1, order: 1 }, { unique: true });
lessonSchema.index({ slug: 1 });

export const Lesson = mongoose.model('Lesson', lessonSchema);
