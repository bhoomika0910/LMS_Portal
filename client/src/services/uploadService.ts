import { api } from './api';

export const uploadService = {
  uploadVideo: (formData: FormData) =>
    api.post('/upload/video', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  uploadThumbnail: (formData: FormData) =>
    api.post('/upload/thumbnail', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  uploadAvatar: (formData: FormData) =>
    api.post('/upload/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};
