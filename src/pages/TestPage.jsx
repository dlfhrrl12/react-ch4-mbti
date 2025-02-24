import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { useState } from "react";

const TestPage = () => {
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  // 답변 변경 시 실행되는 함수
  const handleAnswerChange = (questionId, answer, type) => {
    setAnswers((prev) => {
      const updatedAnswers = [...prev];
      const index = updatedAnswers.findIndex((item) => item.id === questionId);
      if (index === -1) {
        updatedAnswers.push({ id: questionId, answer, type });
      } else {
        updatedAnswers[index] = { id: questionId, answer, type };
      }
      return updatedAnswers;
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const mbtiResult = calculateMBTI(answers);
    console.log('계산된 MBTI 결과: ', mbtiResult)
    navigate('/result', { state: { mbtiResult } });
  };

  return (
    <div className="flex justify-center flex-col w-full bg-gray-50 items-center p-14 rounded-lg shadow-lg">
      <div className="items-start">
        <h1 className="text-3xl font-bold">MBTI테스트</h1> <br />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {questions.map((question) => (
            <div key={question.id} className="flex gap-2 flex-col rounded-lg shadow-lg p-4 bg-white">
              <span className="mt-4">{question.question}</span>
              {question.options.map((option, index) => {
                const type = question.type;  // E/I, S/N, T/F, J/P 같은 타입을 가져오기
                return (
                  <div key={index} className="flex border rounded-lg p-3 gap-2">
                    <input
                      type="radio"
                      name={`question${question.id}`}
                      value={option}
                      checked={answers.find((ans) => ans.id === question.id)?.answer === option}
                      onChange={() => handleAnswerChange(question.id, option, type)}  // type을 함께 저장
                    />
                    <label htmlFor={`question${question.id}_${index}`}>{option}</label>
                  </div>
                );
              })}
            </div>
          ))}
          <div className="flex justify-center mt-4 items-center">
            <button
              type="submit"
              disabled={answers.length !== questions.length}
              className="text-center border cursor-pointer p-4 w-full bg-[#FF5A5F] text-white border-none rounded-lg transition hover:bg-white hover:text-[#FF5A5F]"
            >
              결과 보기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestPage;
