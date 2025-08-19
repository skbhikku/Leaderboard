import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  _id: string;
  name: string;
  points: number;
  rank: number;
  createdAt: string;
}

export interface HistoryEntry {
  _id: string;
  userId: string;
  pointsAwarded: number;
  timestamp: string;
}

export interface ClaimResponse {
  user: User;
  pointsAwarded: number;
  leaderboard: User[];
}

// API functions
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = async (name: string): Promise<User> => {
  const response = await api.post('/users', { name });
  return response.data;
};

export const claimPoints = async (userId: string): Promise<ClaimResponse> => {
  const response = await api.post(`/claim/${userId}`);
  return response.data;
};

export const getUserHistory = async (userId: string): Promise<HistoryEntry[]> => {
  const response = await api.get(`/history/${userId}`);
  return response.data;
};

export default api;