import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth'; // 회원가입 API 호출
import { toast } from 'react-toastify';
import { toastConfig } from '../styles/toastifyStyles';

const Signup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate(); // 회원가입 성공 후 로그인 페이지로 이동

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { id, password, nickname };
      await register(userData); // 회원가입 API 요청
      toast.success('회원가입 성공! 로그인해주세요.', toastConfig);
      navigate('/login'); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      toast.error(error || '회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-gray-600 mb-6 text-center">
          회원가입
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            name="id"
            placeholder="아이디"
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-[#FF5A5F] text-white py-3 rounded-lg hover:bg-gray-50 transition duration-300 hover:text-[#FF5A5F]"
          >
            회원가입
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            이미 계정이 있으신가요?
            <Link to="/login" className="text-[#FF5A5F] hover:underline">
              {' '}
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
