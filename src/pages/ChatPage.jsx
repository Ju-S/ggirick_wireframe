import SidebarWorkspaces from "../commons/components/chat/SidebarWorkspaces.jsx";
import SidebarChannels from "../commons/components/chat/SidebarChannels.jsx";
import ChatRoom from "../commons/components/chat/ChatRoom.jsx";

export default function ChatPage() {
  return(
    <div className="flex h-screen p-4  pt-20 md:ml-64 bg-gray-50 dark:bg-gray-800">
      {/* 워크스페이스 사이드바 */}
      <SidebarWorkspaces />

      {/* 채널 사이드바 */}
      <SidebarChannels />

      {/* 채팅 메인 */}
      <ChatRoom />
    </div>
  );
}
