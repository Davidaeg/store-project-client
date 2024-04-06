import axios from 'axios';

export const storeService = axios.create({
  baseURL: `${import.meta.env.VITE_STORE_SERVICE}`
});

export const cloudinaryService = axios.create({
  baseURL: `${import.meta.env.VITE_CLOUDINARY_URL}`
});
