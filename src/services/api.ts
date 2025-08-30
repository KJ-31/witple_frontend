import axios from 'axios';

// 환경 변수에서 API URL 가져오기
const getAPIBaseURL = () => {
  // 프로덕션 환경에서 환경 변수 우선 사용
  if (process.env.REACT_APP_API_URL) {
    console.log('🌐 프로덕션 API URL 사용:', process.env.REACT_APP_API_URL);
    return process.env.REACT_APP_API_URL;
  }

  // 개발 환경에서 동적으로 API URL 결정
  if (process.env.NODE_ENV === 'development') {
    const hostname = window.location.hostname;
    const port = '8000'; // 백엔드 포트

    console.log('🔍 API URL 설정:', {
      hostname,
      port,
      fullURL: `http://${hostname}:${port}`,
      location: window.location.href,
      origin: window.location.origin,
    });

    // 핸드폰에서 접속한 경우 (IP 주소로 접속)
    if (window.location.href.includes('172.21.102.114')) {
      return 'http://172.21.102.114:8000';
    }

    // localhost인 경우 (데스크톱)
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `http://localhost:${port}`;
    }

    // IP 주소인 경우 (모바일 접속)
    if (hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
      return `http://${hostname}:${port}`;
    }

    // 기타 경우 (도메인 등)
    return `http://${hostname}:${port}`;
  }

  // 기본값
  return 'http://localhost:8000';
};

const API_BASE_URL = getAPIBaseURL();
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
    api.post(API_ENDPOINTS.USER.CHANGE_PASSWORD, {
      old_password: oldPassword,
      new_password: newPassword,
    }),
};

export const commonAPI = {
  healthCheck: () => api.get(API_ENDPOINTS.COMMON.HEALTH),
  getVersion: () => api.get(API_ENDPOINTS.COMMON.VERSION),
};

// API 상태 확인 함수
export const checkAPIConnection = async (): Promise<boolean> => {
  try {
    console.log('🔍 API 연결 확인 시작...');
    console.log('🌐 API Base URL:', API_BASE_URL);
    console.log(
      '🔗 Full API URL:',
      `${API_BASE_URL}/api/${API_VERSION}/health`
    );

    const response = await commonAPI.healthCheck();
    console.log('✅ API 연결 성공:', response.status);
    return response.status === 200;
  } catch (error: any) {
    console.error('❌ API 연결 실패:', error);
    console.error('🔍 에러 상세:', {
      message: error?.message,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      url: error?.config?.url,
    });
    return false;
  }
};

export default api;
