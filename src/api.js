// src/api.js
import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: 'https://crypto-store-server.vercel.app'
});

// automatically attach token
api.interceptors.request.use(async config => {
  const current = auth.currentUser;
  if (current) {
    const token = await current.getIdToken(/* forceRefresh */ false);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
