import React from "react";

export default function ChatInput() {
  return (
    <div className="border-t bg-base-100 p-4">
      <form>
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex items-center rounded-lg bg-base-100/50 px-3 py-2">
          {/* 이미지 업로드 버튼 */}
          <button
            type="button"
            className="inline-flex cursor-pointer justify-center rounded-lg p-2 text-base-content/60 hover:bg-base-200 hover:text-base-content"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                fill="currentColor"
                d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
              />
              <path
                d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
              <path
                d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
              />
            </svg>
            <span className="sr-only">Upload image</span>
          </button>

          {/* 이모지 버튼 */}
          <button
            type="button"
            className="cursor-pointer rounded-lg p-2 text-base-content/60 hover:bg-base-200 hover:text-base-content"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
              />
            </svg>
            <span className="sr-only">Add emoji</span>
          </button>

          {/* 입력창 */}
          <textarea
            id="chat"
            rows={1}
            className="mx-4 block w-full rounded-lg border border-base-300 bg-base-100 p-2.5 text-sm text-base-content placeholder:text-base-content/50 focus:border-primary focus:ring-primary"
            placeholder="Your message..."
          ></textarea>

          {/* 전송 버튼 */}
          <button
            type="submit"
            className="inline-flex cursor-pointer justify-center rounded-full p-2 text-primary hover:bg-primary/20"
          >
            <svg
              className="h-5 w-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
  );
}
