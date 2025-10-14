import ChatRoom from "../../../../Users/keduit/Downloads/ggirick_wireframe-master/src/commons/components/chat/ChatRoom.jsx";
import SidebarChannels from "../../../../Users/keduit/Downloads/ggirick_wireframe-master/src/commons/components/chat/SidebarChannels.jsx";
import SidebarWorkspaces from "../../../../Users/keduit/Downloads/ggirick_wireframe-master/src/commons/components/chat/SidebarWorkspaces.jsx";

export default function ChatPage() {
  return(
    <div className="flex h-screen p-4 pt-20 md:ml-64 bg-gray-50">
      {/* 워크스페이스 사이드바 */}
      <SidebarWorkspaces />

      {/* 채널 사이드바 */}
      <SidebarChannels />

      {/* 채팅 메인 */}
      <ChatRoom />
    </div>
  );
}
