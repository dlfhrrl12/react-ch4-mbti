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

export const getTestResultUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/testResults?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
