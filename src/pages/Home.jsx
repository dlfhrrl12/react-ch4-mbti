import { toast } from 'react-toastify';
import { toastConfig } from '../styles/toastifyStyles';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleTestPage = () => {
    if (!token) {
      toast.warning('로그인이 필요합니다!', toastConfig);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      navigate('/testresult');
    }
  };
  return (
    <main className="container mx-auto pt-10 main">
      <div className="w-full flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-5xl font-bold text-gray-700 mb-6">
          무료 성격 테스트
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              성격 유형 검사
            </h2>
            <p className="text-gray-600">
              자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을
              미치는지 알아보세요.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              성격 유형 이해
            </h2>
            <p className="text-gray-600">
              다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              팀 평가
            </h2>
            <p className="text-gray-600">
              팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을
              배워보세요.
            </p>
          </div>
        </div>
        <button
          className="inline-block bg-[#FF5A5F] md-4 text-white py-2 px-6 rounded-full hover:bg-gray-100 transition mb-4 hover:text-[#FF5A5F]"
          onClick={handleTestPage}
        >
          내 성격 알아보러 가기
        </button>
      </div>
    </main>
  );
};

export default Home;
