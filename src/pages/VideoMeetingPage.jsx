export default function VideoMeetingPage(){
  return (
    <main className="flex flex-col h-screen p-4 pt-20 md:ml-64 bg-gray-50">
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between p-4 bg-white border-b shadow">
        <h1 className="text-lg font-semibold text-gray-800">개발 팀 미팅</h1>
        <div className="flex items-center space-x-3">
          <button className="text-sm text-blue-600 hover:underline">Participants</button>
          <button className="text-sm text-blue-600 hover:underline">Chat</button>
        </div>
      </header>

      {/* 메인 영역: 비디오 + 사이드바 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 비디오 그리드 */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-y-auto">
          {/* 예시 비디오 박스 */}
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="relative bg-gray-200 rounded-lg overflow-hidden">
              {/* 사용자 이름 */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                User {idx + 1}
              </div>
              {/* 비디오 영역 (Placeholder) */}
              <img  src={`https://flowbite.com/docs/images/people/profile-picture-${(idx % 5) + 1}.jpg` } className="w-full h-full object-cover md:h-48 lg:h-56 bg-gray-300 flex items-center justify-center text-gray-500">

              </img>
              {/* 플레이어 설정 영역 */}

            </div>
          ))}
        </div>

        {/* 사이드바 */}
        <aside className="w-80 bg-white border-l p-4 flex flex-col">



          {/* 채팅 섹션 */}
          <div className="mt-4 flex flex-col h-full">
            <h2 className="font-semibold text-gray-800 mb-2">Chat</h2>

            {/* 메시지 리스트 */}
            <div className="flex-1 overflow-y-auto space-y-4 p-2 bg-gray-100 rounded-lg">
              {/* Alice 메시지 블록 */}
              <div className="flex items-start space-x-3">
                <img
                  src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                  className="w-6 h-6 rounded-full"
                  alt="Alice"
                />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-700">
                    Alice <span className="text-gray-400 ml-1">10:12 AM</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    <div className="bg-white px-2 py-1 rounded-lg shadow-sm text-sm">
                      프로젝트는 어떻게 되어가고 있어?
                    </div>
                    <div className="bg-white px-2 py-1 rounded-lg shadow-sm text-sm">
                      오늘 회의 후 정리해줄게
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                    <button className="hover:text-gray-700">👍 2</button>


                  </div>
                </div>
              </div>

              {/* You 메시지 블록 */}
              <div className="flex justify-end">
                <div className="flex flex-col items-end">
                  <div className="text-xs font-semibold text-gray-700 text-right">
                    You <span className="text-gray-400 ml-1">10:14 AM</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    <div className="bg-blue-500 text-white px-2 py-1 rounded-lg shadow text-sm">
                      이해했어! 👍
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">

                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <img
                  src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                  className="w-6 h-6 rounded-full"
                  alt="Alice"
                />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-700">
                    Alice <span className="text-gray-400 ml-1">10:12 AM</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    <div className="bg-white px-2 py-1 rounded-lg shadow-sm text-sm">
                      아니 어떻게 되고 있냐고
                    </div>
                   
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">

                  </div>
                </div>
              </div>
            </div>

            {/* 입력창 */}
            <div className="mt-2">
              <input
                type="text"
                placeholder="메시지 입력..."
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </aside>
      </div>

      {/* 하단 컨트롤 */}
      <footer className="p-4 bg-white border-t shadow">
        <div className="flex justify-between items-center w-full">
          {/* 중앙 제어 버튼들 */}
          <div className="flex justify-center flex-1 space-x-4">
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">🎤 마이크</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">📷 카메라</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">🖥️ 화면공유</button>
            <button className="px-4 py-2 bg-yellow-200 rounded-lg hover:bg-yellow-300">🖖 손들기</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">🚪 떠나기</button>
          </div>

          {/* 오른쪽 제어 버튼들 */}
          <div className="flex items-center space-x-4 ml-4">
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">👥 참가자</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">💬 채팅</button>
          </div>
        </div>
      </footer>

    </main>

  )
}