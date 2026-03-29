import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const socialLinksSchema = new Schema(
  {
    website: String,
    twitter: String,
    linkedin: String,
    youtube: String,
    github: String,
  },
  { _id: false },
);

const profileSchema = new Schema(
  {
    avatarUrl: String,
    coverImageUrl: String,
    headline: String,
    bio: String,
    expertise: { type: [String], default: [] },
    languages: { type: [String], default: ['English'] },
    socialLinks: { type: socialLinksSchema, default: () => ({}) },
  },
  { _id: false },
);

const notificationPreferenceSchema = new Schema(
  {
    general: { type: Boolean, default: true },
    qna: { type: Boolean, default: true },
    marketing: { type: Boolean, default: false },
    productUpdates: { type: Boolean, default: true },
    payoutReminders: { type: Boolean, default: true },
  },
  { _id: false },
);

const preferenceSchema = new Schema(
  {
    timezone: { type: String, default: 'UTC' },
    locale: { type: String, default: 'en' },
    darkMode: { type: Boolean, default: true },
    autoplay: { type: Boolean, default: true },
    playbackSpeed: { type: Number, default: 1 },
    notificationPreferences: { type: notificationPreferenceSchema, default: () => ({}) },
  },
  { _id: false },
);

const statsSchema = new Schema(
  {
    enrollments: { type: Number, default: 0 },
    teachingCourses: { type: Number, default: 0 },
    totalMinutesLearned: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    totalPayouts: { type: Number, default: 0 },
    lifetimeValue: { type: Number, default: 0 },
    ratingAverage: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { _id: false },
);

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

const payoutSchema = new Schema(
  {
    stripeAccountId: String,
    paypalEmail: String,
    bankName: String,
    accountLast4: String,
    preferredMethod: { type: String, enum: ['stripe', 'paypal', 'bank'], default: 'stripe' },
    taxFormOnFile: { type: Boolean, default: false },
  },
  { _id: false },
);

const deviceSchema = new Schema(
  {
    deviceId: String,
    platform: String,
    appVersion: String,
    ip: String,
    lastSeenAt: Date,
    location: String,
  },
  { _id: false },
);

const refreshTokenSchema = new Schema(
  {
    token: String,
    userAgent: String,
    ip: String,
    createdAt: { type: Date, default: Date.now },
    expiresAt: Date,
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
    status: { type: String, enum: ['active', 'suspended', 'invited', 'pending'], default: 'active' },
    profile: { type: profileSchema, default: () => ({}) },
    preferences: { type: preferenceSchema, default: () => ({}) },
    stats: { type: statsSchema, default: () => ({}) },
    onboarding: {
      isCompleted: { type: Boolean, default: false },
      stepsCompleted: { type: [String], default: [] },
    },
    payoutSettings: { type: payoutSchema, default: () => ({}) },
    billingAddress: { type: addressSchema, default: () => ({}) },
    devices: { type: [deviceSchema], default: [] },
    refreshTokens: { type: [refreshTokenSchema], default: [], select: false },
    emailVerifiedAt: Date,
    emailVerificationToken: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    lastLoginAt: Date,
    passwordChangedAt: Date,
    meta: {
      referralCode: { type: String, index: true },
      referredBy: String,
      notes: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual('fullName').get(function getFullName() {
  return `${this.firstName ?? ''} ${this.lastName ?? ''}`.trim();
});

// Hash any new or updated password values before persisting.
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  if (this.password && this.password.startsWith('$2')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toSafeObject = function toSafeObject() {
  const obj = this.toObject({ virtuals: true });
  delete obj.password;
  delete obj.refreshTokens;
  delete obj.passwordResetToken;
  delete obj.passwordResetExpires;
  delete obj.emailVerificationToken;
  delete obj.emailVerificationExpires;
  return obj;
};

userSchema.index({ role: 1, status: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ 'profile.expertise': 1 });

export const User = mongoose.model('User', userSchema);
