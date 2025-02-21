const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 ">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-black mb-4">프로필 수정</h1>
        <div className="nicknameResult">
          {/* 녹색 "프로필이 성공적으로 업데이트 되었습니다!" */}
        </div>
        <p className="font-bold mb-2">닉네임</p>
        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-lg mb-3"
          placeholder="수정할 닉네임"
        />
        <button className="w-full bg-[#FF5A5F] p-3 rounded-lg text-white text-lg transition hover:text-[#FF5A5F] hover:bg-white">
          프로필 업데이트
        </button>
      </div>
    </div>
  );
};

export default Profile;
