// src/utils/api.js
// Axios instance with interceptors, ready for any backend

import axios from 'axios';

/* ─── Axios Instance ───────────────────────────────────────── */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.whizzcomputer.com/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/* ─── Request Interceptor ──────────────────────────────────── */

api.interceptors.request.use(
  (config) => {
    // Attach token from localStorage if available
    const token = localStorage.getItem('whizz_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/* ─── Response Interceptor ─────────────────────────────────── */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized — clear token, redirect
      localStorage.removeItem('whizz_token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/* ─── Course Endpoints ─────────────────────────────────────── */

export const getCourses = () => api.get('/courses');
export const getCourseById = (id) => api.get(`/courses/${id}`);
export const searchCourses = (query) => api.get(`/courses/search?q=${query}`);

/* ─── Student Endpoints ────────────────────────────────────── */

export const getEnrolledCourses = (userId) =>
  api.get(`/students/${userId}/courses`);

export const getDashboardStats = (userId) =>
  api.get(`/students/${userId}/stats`);

/* ─── Contact Endpoints ────────────────────────────────────── */

export const submitContactForm = (data) => api.post('/contact', data);

/* ─── Auth Endpoints ───────────────────────────────────────── */

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (data) => api.post('/auth/register', data);
export const logout = () => api.post('/auth/logout');

/* ─── Mock Data (for demo without backend) ─────────────────── */

export const getMockCourses = () => {
  return Promise.resolve({
    data: {
      courses: [
        {
          id: 1,
          slug: 'advanced-computer-ms-office',
          title: 'MS Office Mastery',
          category: 'Productivity',
          duration: '6 weeks',
          students: 1240,
          rating: 4.9,
          price: 2999,
          level: 'Beginner',
          color: '#6e3bff',
          icon: '📊',
          description: 'Word, Excel, PowerPoint — become an Office power user',
        },
        {
          id: 2,
          slug: 'python-programming',
          title: 'Python Programming',
          category: 'Development',
          duration: '10 weeks',
          students: 892,
          rating: 4.8,
          price: 4999,
          level: 'Intermediate',
          color: '#00f5d4',
          icon: '🐍',
          description: 'From basics to automation and data analysis',
        },
        {
          id: 3,
          slug: 'web-development',
          title: 'Web Design Pro',
          category: 'Design',
          duration: '8 weeks',
          students: 643,
          rating: 4.7,
          price: 3999,
          level: 'Beginner',
          color: '#fb7185',
          icon: '🎨',
          description: 'HTML, CSS, Figma — design modern websites',
        },
        {
          id: 4,
          slug: 'tally-accounting',
          title: 'Tally & Accounting',
          category: 'Finance',
          duration: '6 weeks',
          students: 511,
          rating: 4.6,
          price: 2499,
          level: 'Beginner',
          color: '#fbbf24',
          icon: '💰',
          description: 'GST, TDS, payroll with Tally Prime',
        },
        {
          id: 5,
          slug: 'digital-marketing',
          title: 'Digital Marketing',
          category: 'Marketing',
          duration: '8 weeks',
          students: 730,
          rating: 4.8,
          price: 3499,
          level: 'Intermediate',
          color: '#7c3aed',
          icon: '📱',
          description: 'SEO, social media, Google Ads mastery',
        },
        {
          id: 6,
          slug: 'graphic-design',
          title: 'Graphic Design',
          category: 'Design',
          duration: '10 weeks',
          students: 420,
          rating: 4.9,
          price: 4499,
          level: 'All Levels',
          color: '#10b981',
          icon: '✏️',
          description: 'Photoshop, Illustrator, CorelDRAW',
        },
      ],
    },
  });
};

export const getMockStats = () => {
  return Promise.resolve({
    data: {
      stats: {
        completedCourses: 3,
        hoursLearned: 48,
        certificates: 2,
        streak: 7,
        progressPercent: 68,
      },
    },
  });
};

export default api;
