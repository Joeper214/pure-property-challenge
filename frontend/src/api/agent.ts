import axios from 'axios';
import type { Agent } from '../types/agent';

const apiClient = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const upsertAgent = (agent: Agent) => {
  return apiClient.post<Agent>('/agents', agent);
};
