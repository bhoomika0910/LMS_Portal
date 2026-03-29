import mongoose from 'mongoose';

const { Schema } = mongoose;

const channelSchema = new Schema(
  {
    email: { type: Boolean, default: false },
    push: { type: Boolean, default: true },
    inApp: { type: Boolean, default: true },
  },
  { _id: false },
);

const notificationSchema = new Schema(
  {
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['system', 'course', 'qna', 'payment', 'reminder'], default: 'system' },
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: String,
    category: { type: String, default: 'general' },
    priority: { type: String, enum: ['low', 'normal', 'high', 'urgent'], default: 'normal' },
    channels: { type: channelSchema, default: () => ({}) },
    payload: Schema.Types.Mixed,
    isRead: { type: Boolean, default: false },
    readAt: Date,
    expiresAt: Date,
  },
  { timestamps: true },
);

notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1 });

export const Notification = mongoose.model('Notification', notificationSchema);
