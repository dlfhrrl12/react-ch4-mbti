import { Link } from 'react-router-dom';
import useStore from '../zustand/useStore';

const Header = () => {
  const { isAuthenticated, logout } = useStore();
  return (
    <header className="bg-gray-100 p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center text-white">
        <Link
          to="/"
          className="text-lg font-semibold text-[#FF5A5F] hover:text-gray-300"
        >
          홈
        </Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-lg font-semibold text-[#FF5A5F] hover:text-gray-300"
              >
                프로필
              </Link>
              <Link
                to="/testpage"
                className="text-lg font-semibold text-[#FF5A5F] hover:text-gray-300"
              >
                테스트
              </Link>
              <Link
                to="/testresult"
                className="text-lg font-semibold text-[#FF5A5F] hover:text-gray-300"
              >
                결과 보기
              </Link>
              <button
                onClick={logout}
                to="/profile"
                className="bg-[#FF5A5F] p-2 rounded-lg text-white transition hover:text-[#FF5A5F] hover:bg-gray-100"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login" className="text-[#FF5A5F] hover:text-gray-300">
              로그인
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
