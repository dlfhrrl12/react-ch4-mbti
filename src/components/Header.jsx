import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout= () => {
    localStorage.removeItem('token');
    navigate('/')
  }
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
          {token ? (
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
                onClick={handleLogout}
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
