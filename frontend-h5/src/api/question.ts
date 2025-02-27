import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

export const getQuestions = (params: { page: number, size: number }) => 
  instance.get('/api/questions', { params });

export const getQuestionDetail = (id: number) =>
  instance.get(`/api/questions/${id}`); 