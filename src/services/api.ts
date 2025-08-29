import axios from 'axios';

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';

// API 엔드포인트 구성
const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
  },
  COMMON: {
    HEALTH: '/health',
    VERSION: '/version',
  },
} as const;

// axios 인스턴스 생성
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 로깅 (개발 환경에서만)
if (process.env.NODE_ENV === 'development') {
  api.interceptors.request.use(request => {
    console.log('🚀 API Request:', request.method?.toUpperCase(), request.url);
    return request;
  });
}

// 요청 인터셉터 (토큰 추가 등)
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리 등)
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그아웃 처리
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API 함수들
export const authAPI = {
  login: (email: string, password: string) =>
    api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password }),

  register: (email: string, password: string, name: string) =>
    api.post(API_ENDPOINTS.AUTH.REGISTER, { email, password, name }),

  refreshToken: (refreshToken: string) =>
    api.post(API_ENDPOINTS.AUTH.REFRESH, { refresh_token: refreshToken }),

  logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),
};

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export const userAPI = {
  getProfile: () => api.get<UserProfile>(API_ENDPOINTS.USER.PROFILE),
  updateProfile: (data: Partial<UserProfile>) =>
    api.put<UserProfile>(API_ENDPOINTS.USER.UPDATE_PROFILE, data),
  changePassword: (oldPassword: string, newPassword: string) =>
    api.post(API_ENDPOINTS.USER.CHANGE_PASSWORD, { old_password: oldPassword, new_password: newPassword }),
};

export const commonAPI = {
  healthCheck: () => api.get(API_ENDPOINTS.COMMON.HEALTH),
  getVersion: () => api.get(API_ENDPOINTS.COMMON.VERSION),
};

// API 상태 확인 함수
export const checkAPIConnection = async (): Promise<boolean> => {
  try {
    const response = await commonAPI.healthCheck();
    return response.status === 200;
  } catch (error) {
    console.error('❌ API 연결 실패:', error);
    return false;
  }
};

export default api;
