import { useState, useEffect } from 'react';
import TestForm from '../components/TestForm';
import { calculateMBTI, mbtiDescriptions } from '../utils/mbtiCalculator';
import { createTestResult } from '../api/testResults';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../api/auth';

const TestPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      getUserProfile(storedUserId)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error(error);
          navigate('/login');
        });
    } else {
      console.error('사용자 정보가 없음');
      navigate('/login');
    }
  }, [navigate]);

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    console.log('계산된 MBTI 결과: ', mbtiResult);

    if (!user) {
      console.error('유저 정보가 없음');
      return;
    }

    try {
      await createTestResult({
        userId: user.id,
        result: mbtiResult,
        nickname: user.nickname,
      });
      setResult(mbtiResult);
    } catch (error) {
      console.error('결과 저장 중 오류 발생:', error);
    }
  };

  const handleResults = () => {
    navigate('/testresult');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-lg p-4">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              테스트 결과: {result}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                '해당 성격 유형에 대한 설명이 없습니다.'}
            </p>
            <button
              onClick={handleResults}
              className="w-full bg-[#FF5A5F] text-white py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-300 hover:text-[#FF5A5F]"
            >
              결과 페이지로 이동하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
