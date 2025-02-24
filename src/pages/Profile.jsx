import { useEffect, useState } from "react";
import { getUserProfile } from "../api/auth";  // getUserProfile 함수 수정 필요
import axios from "axios";

const Profile = () => {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 프로필 데이터를 불러오는 useEffect
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setNickname(profile.nickname);  // 프로필 정보 설정
      } catch (error) {
        console.error("프로필을 불러오는 데 실패했습니다:", error);

        // 서버 오류 코드가 있을 경우 메시지를 구체화
        if (error.response && error.response.status === 404) {
          setMessage('프로필을 찾을 수 없습니다.');
        } else {
          setMessage('프로필을 불러오는 데 실패했습니다. 다시 시도해주세요.');
        }
      }
    };

    fetchUserProfile();
  }, []);

  // 프로필 업데이트 처리
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("accessToken");

    // 토큰이 없으면 로그인 페이지로 리디렉션
    if (!token) {
      setMessage("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
      // 예를 들어, 로그인 페이지로 리디렉션
      window.location.href = "/login";  // 또는 React Router를 사용해 리디렉션
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(
        "https://www.nbcamp-react-auth.link/profile",  // 프로필 업데이트 경로
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // 인증 토큰 추가
          },
        }
      );

      if (response.data.success) {
        setMessage('닉네임이 성공적으로 변경되었습니다.');
      } else {
        setMessage('닉네임 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error("Failed to update nickname:", error);
      setMessage('프로필 업데이트에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-black mb-4">프로필 수정</h1>

        {/* 메시지 표시 */}
        {message && (
          <div className={`mb-4 ${message.includes('성공') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}

        <p className="font-bold mb-2">닉네임</p>
        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-lg mb-3"
          placeholder="수정할 닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button
          className={`w-full p-3 rounded-lg text-white text-lg transition ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#FF5A5F] hover:text-[#FF5A5F] hover:bg-white'}`}
          onClick={handleUpdateProfile}
          disabled={loading} // 로딩 중에는 버튼 비활성화
        >
          {loading ? '저장 중...' : '프로필 업데이트'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
