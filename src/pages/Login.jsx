import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { toast } from 'react-toastify';
import { toastConfig } from '../styles/toastifyStyles';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = { id, password };
      const response = await login(userData);

      if (response.accessToken && response.userId) {
        // 로그인 성공 후 토큰을 localStorage에 저장
        localStorage.setItem('accessToken', response.accessToken);  // 토큰 저장
        localStorage.setItem('userId', response.userId);  // userId도 저장 (필요하다면)
        
        toast.success('로그인 성공!', toastConfig);
        navigate('/');  // 홈 페이지로 리다이렉트
      } else {
        // 토큰 또는 사용자 정보가 없다면 에러 처리
        throw new Error('로그인 실패: 토큰이나 사용자 정보가 없습니다.');
      }
    } catch (error) {
      console.error(error);  // 디버깅을 위한 콘솔 로그
      const errorMessage = error.response?.data?.message || error.message || '로그인에 실패했습니다.';
      toast.error(errorMessage, toastConfig);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-600 mb-6">로그인</h1>
        <form
          onSubmit={handleLogin}
          className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            name="id"
            placeholder="아이디"
            required
            className="w-full p-4 border border-gray-300 rounded-lg"
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            className="w-full p-4 border border-gray-300 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-[#FF5A5F] text-white py-3 rounded-lg hover:bg-gray-50 transition hover:text-[#FF5A5F]"
          >
             {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <div className="mt-4">
          <p className="text-gray-600">
            계정이 없으신가요?
            <Link to="/signup" className="text-[#FF5A5F] hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
