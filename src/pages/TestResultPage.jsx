import { useEffect, useState } from 'react';
import { getAllTestResults } from '../api/testResults'; // 모든 결과를 가져오는 함수
import { mbtiDescriptions } from '../utils/mbtiCalculator'; // MBTI 설명

const TestResultPage = () => {
  const [testResults, setTestResults] = useState([]); // 모든 테스트 결과 저장 상태

  useEffect(() => {
    // 모든 테스트 결과를 가져오는 함수 호출
    getAllTestResults()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestResults(data); // 데이터를 상태에 저장
        } else {
          console.error('No test results found');
        }
      })
      .catch((error) => {
        console.error('Error fetching test results:', error);
      });
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // 데이터가 로딩 중일 때 처리
  if (testResults.length === 0) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="w-full bg-white text-center flex flex-col p-5">
      <h1 className="font-bold text-3xl mt-5 mb-5">모든 테스트 결과</h1>
      {testResults.map((result) => {
        // MBTI 설명을 result에서 가져오기
        const description = mbtiDescriptions[result.result] || '설명 없음';

        return (
          <div
            key={result.id}
            className="bg-cyan-950 flex flex-col items-start p-5 rounded-lg shadow-lg mb-5 mt-5"
          >
            <h2 className="text-white font-bold text-2xl mb-4">
              {result.nickname}
            </h2>
            <hr className="w-full text-gray-900" />
            <h2 className="text-yellow-500 text-2xl font-bold mt-4 mb-4">
              {result.result}
            </h2>
            <div className="text-start">
              <span className="text-white">{description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestResultPage;
