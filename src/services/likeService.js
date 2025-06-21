import axiosInstance from '../api/axiosInstance';

export const likePost = (postId) => axiosInstance.post(`/likes/${postId}/like`);
export const unlikePost = (postId) => axiosInstance.delete(`/likes/${postId}/unlike`);
export const getLikes = (postId) => axiosInstance.get(`/likes/${postId}/likes`);
