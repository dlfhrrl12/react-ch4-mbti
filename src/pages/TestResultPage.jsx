import { useEffect, useState } from 'react';
import { getTestResultUserId } from '../api/testResults';
import { mbtiDescriptions } from '../utils/mbtiCalculator'; // mbti 설명

const TestResultPage = () => {
  const [userData, setUserData] = useState(null);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      // API에서 유저 데이터 가져오기
      getTestResultUserId(userId)
        .then((data) => {
          // data가 배열 형식이면 첫 번째 요소를 사용
          if (data && data.length > 0) {
            const userResult = data[0]; // 첫 번째 항목을 가져옴

            // 유저 데이터 설정
            setUserData({ nickname: userResult.nickname });

            // MBTI 설명을 result에서 가져오기
            const description =
              mbtiDescriptions[userResult.result] || '설명 없음';

            // resultData 상태 업데이트
            setResultData({
              mbtiType: userResult.result,
              description: description,
            });
          } else {
            console.error('No test results found for this user');
          }
        })
        .catch((error) => {
          console.error('Error fetching test result:', error);
        });
    }
  }, []);

  // 데이터가 로딩 중일 때 처리
  if (!userData || !resultData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="w-full bg-white text-center flex flex-col p-5">
      <h1 className="font-bold text-3xl mt-5 mb-5">모든 테스트 결과</h1>
      <div className="bg-cyan-950 flex flex-col items-start p-5 rounded-lg shadow-lg">
        <h2 className="text-white font-bold text-2xl mb-4">
          {userData.nickname}
        </h2>
        <hr className="w-full text-gray-900" />
        <h2 className="text-yellow-500 text-2xl font-bold mt-4 mb-4">
          {resultData.mbtiType}
        </h2>
        <div className="text-start">
          <span className="text-white">{resultData.description}</span>
        </div>
      </div>
    </div>
  );
};

export default TestResultPage;
