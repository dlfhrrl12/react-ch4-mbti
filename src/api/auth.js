import axios from 'axios';

const API_URL = 'https://www.nbcamp-react-auth.link';

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error.response?.data || error.message);
    throw error.response?.data?.message || '회원가입 실패';
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log('서버 응답:', response.data);

    // 서버 응답에서 accessToken이 정상적으로 있는지 확인
    if (response.status === 200 && response.data && response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
      console.log('로그인 성공, 토큰 저장됨:', response.data.accessToken);
    } else {
      throw new Error('토큰을 받을 수 없습니다. 서버 응답을 확인해주세요.');
    }

    return response.data;
  } catch (error) {
    console.error('로그인 중 에러 발생:', error.response?.data || error.message);
    throw error.response?.data?.message || '로그인 실패. 서버 응답을 확인하세요.';
  }
};

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('로그인되지 않았습니다.');
    }

    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('프로필 조회 중 에러 발생:', error.response?.data || error.message);
    throw error.response?.data?.message || '프로필 조회 실패';
  }
};

export const updateProfile = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('로그인되지 않았습니다.');
    }

    const response = await axios.put(`${API_URL}/profile`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('프로필 업데이트 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('프로필 수정 중 에러 발생:', error.response?.data || error.message);
    throw error.response?.data?.message || '프로필 수정 실패';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
