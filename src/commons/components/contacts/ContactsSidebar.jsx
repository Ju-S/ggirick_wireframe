import React from "react";
import FileUploadModal from "../drive/FileUploadModal.jsx";
import { FolderPlus, Upload } from "lucide-react";


export default function ContactsSidebar(){
  return (
    <aside className="flex w-64 flex-col border border-gray-500 bg-white">
      <div className="border-b p-4 flex items-center justify-between ">
        <h2 className="text-lg font-semibold text-gray-700">주소록</h2>

      </div>
      <div className="p-4 flex flex-col justify-between">
        <button
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          <FolderPlus />
          <span className="ml-3">  새폴더</span>
        </button>
        <button
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center  me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          <Upload />
          <span className="ml-3">  파일 업로드</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2">
        <h3 className="mb-2 text-xs text-gray-500 uppercase">저장공간 사용량</h3>
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          {/* width를 설정하기 위해 인라인 스타일을 사용합니다.
        React에서는 style 속성에 JavaScript 객체를 전달해야 합니다.
      */}
          <div
            className="bg-gray-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `50%` }}
          >
            {`50%`}
          </div>
        </div>

        <h3 className="mt-4 mb-2 text-xs text-gray-500 uppercase">
          빠른 링크
        </h3>
        <ul className="space-y-1">
          <li className="cursor-pointer rounded px-3 py-2 hover:bg-gray-100">
            최근 파일
          </li>
          <li className="cursor-pointer rounded px-3 py-2 hover:bg-gray-100">
            공유된 파일
          </li>
          <li className="cursor-pointer rounded px-3 py-2 hover:bg-gray-100">
            휴지통
          </li>
        </ul>
      </nav>
    </aside>
  );
}