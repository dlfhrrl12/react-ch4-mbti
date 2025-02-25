import axios from 'axios';

const API_URL = 'http://localhost:5000'; // 올바른 API URL로 수정

export const createTestResult = async ({ userId, result, nickname }) => {
  try {
    const response = await axios.post(`${API_URL}/testResults`, {
      userId,
      result,
      nickname,
    });

    if (response.status !== 201) {
      throw new Error('Failed to save test result');
    }

    return response.data;
  } catch (error) {
    console.error('Error saving test result:', error);
    throw error;
  }
};

// 모든 테스트 결과를 가져오는 함수
export const getAllTestResults = async () => {
  try {
    const response = await axios.get(`${API_URL}/testResults`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
