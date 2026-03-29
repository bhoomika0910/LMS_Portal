import mongoose from 'mongoose';

const { Schema } = mongoose;

const mediaSchema = new Schema(
  {
    thumbnailUrl: String,
    coverImageUrl: String,
    promoVideo: {
      url: String,
      publicId: String,
      duration: Number,
      thumbnailUrl: String,
    },
    resources: { type: [String], default: [] },
  },
  { _id: false },
);

const pricingSchema = new Schema(
  {
    currency: { type: String, default: 'USD' },
    basePrice: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    saleStartsAt: Date,
    saleEndsAt: Date,
    discountable: { type: Boolean, default: true },
    accessType: { type: String, enum: ['lifetime', 'subscription'], default: 'lifetime' },
  },
  { _id: false },
);

const statsSchema = new Schema(
  {
    totalSections: { type: Number, default: 0 },
    totalLessons: { type: Number, default: 0 },
    totalMinutes: { type: Number, default: 0 },
    totalEnrollments: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
  },
  { _id: false },
);

const settingsSchema = new Schema(
  {
    visibility: { type: String, enum: ['public', 'unlisted', 'private'], default: 'public' },
    status: { type: String, enum: ['draft', 'review', 'published', 'archived'], default: 'draft' },
    isFeatured: { type: Boolean, default: false },
    dripEnabled: { type: Boolean, default: false },
    certificateEnabled: { type: Boolean, default: true },
    qnaEnabled: { type: Boolean, default: true },
    discussionEnabled: { type: Boolean, default: true },
    maxStudents: Number,
    releaseDate: Date,
  },
  { _id: false },
);

const seoSchema = new Schema(
  {
    metaTitle: String,
    metaDescription: String,
    keywords: { type: [String], default: [] },
  },
  { _id: false },
);

const courseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    language: { type: String, default: 'en' },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'all'], default: 'all' },
    category: { type: String, required: true },
    subcategory: String,
    tags: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    learningOutcomes: { type: [String], default: [] },
    targetAudience: { type: [String], default: [] },
    instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    coInstructors: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    media: { type: mediaSchema, default: () => ({}) },
    pricing: { type: pricingSchema, required: true },
    stats: { type: statsSchema, default: () => ({}) },
    settings: { type: settingsSchema, default: () => ({}) },
    seo: { type: seoSchema, default: () => ({}) },
    publishedAt: Date,
    archivedAt: Date,
    lastReviewedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const slugify = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

courseSchema.pre('validate', function deriveSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }
  next();
});

courseSchema.index({ slug: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ 'settings.status': 1, createdAt: -1 });

export const Course = mongoose.model('Course', courseSchema);
