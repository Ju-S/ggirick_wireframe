import React from "react";
import ChatInput from "./ChatInput";

export default function ChatRoom() {

  const messages = [
    { id: 1, type: "user", sender: "Alice", text: "헤이, 프로젝트 진행이 얼마나 되었어 bro!", time: "10:12 AM" , like:3, viewer:7},
    { id: 2, type: "user", sender: "You", text: "나는 능이버섯이다 🍄", time: "10:14 AM", viewer:6,isMine: true },
    { id: 1, type: "user", sender: "Alice", text: "헤이 헤이!",like:7, viewer:4, time: "10:14 AM" },

    { id: 3, type: "system", text: "Charlie님이 채팅에서 나갔습니다.", time: "10:15 AM" },
  ];

  return (
    <main className="flex flex-1 flex-col bg-base-200 text-base-content">
      {/* 상단 채널 헤더 */}
      <header className="flex items-center justify-between border-b bg-base-100 p-4">
        <div>
          <h2 className="text-lg font-semibold text-base-content"># general</h2>
          <p className="text-sm text-base-content/60">일반 대화방입니다</p>
        </div>
        <button className="text-sm text-primary hover:underline">
          View Members
        </button>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg) =>
          msg.type === "user" ? (
            <div
              key={msg.id}
              className={`flex ${msg.isMine ? "justify-end" : "items-start"} space-x-3`}
            >
              {!msg.isMine && (
                <img
                  src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                  className="h-8 w-8 rounded-full"
                  alt={msg.sender}
                />
              )}
              <div className={`${msg.isMine ? "text-right" : ""}`}>
                {!msg.isMine && (
                  <div className="text-sm font-semibold text-base-content">
                    {msg.sender}{" "}
                    <span className="ml-2 text-xs text-base-content/50">
                  {msg.time}
                </span>
                  </div>
                )}
                <div
                  className={`mt-1 rounded-lg px-3 py-2 shadow ${
                    msg.isMine
                      ? "bg-primary text-primary-content"
                      : "border bg-base-100 text-base-content"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="mt-1 flex items-center space-x-3 text-xs text-base-content/50">
                  {msg.like ? (
                    <button className="hover:text-base-content/80">
                      👍 {msg.like}
                    </button>
                  ) : null}
                  {msg.viewer ? <span>읽음 {msg.viewer}</span> : null}
                </div>
              </div>
            </div>
          ) : (
            <div
              key={msg.id}
              className="text-center text-xs text-base-content/50 italic"
            >
              {msg.text}
            </div>
          ),
        )}
      </div>

      {/* 채팅 입력창 */}
      <ChatInput />
    </main>

  );
}
