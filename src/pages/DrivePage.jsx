
import React, { useState } from "react";
import {FolderPen,Star,Download,Share2,Trash2, Upload,FolderPlus,File, Folder, MoreVertical, } from 'lucide-react';
import SearchFile from "../commons/components/drive/SearchFile.jsx";
import FileUploadModal from "../commons/components/drive/FileUploadModal.jsx";

export default function DrivePage(){

  const [viewMode, setViewMode] = useState('grid');
  const files = [
    { id: 1, name: '프로젝트 제안서.pdf', type: 'file', size: '2.4 MB', date: '2024-10-10', starred: true },
    { id: 2, name: '디자인 자료', type: 'folder', items: 12, date: '2024-10-12', starred: false },
    { id: 3, name: '회의록.docx', type: 'file', size: '1.2 MB', date: '2024-10-13', starred: false },
    { id: 4, name: '이미지 폴더', type: 'folder', items: 45, date: '2024-10-11', starred: true },
    { id: 5, name: '분석 데이터.xlsx', type: 'file', size: '5.8 MB', date: '2024-10-14', starred: false },
    { id: 6, name: '백업 파일', type: 'folder', items: 8, date: '2024-10-09', starred: false },
    { id: 7, name: '발표자료.pptx', type: 'file', size: '8.3 MB', date: '2024-10-13', starred: true },
    { id: 8, name: '개발 문서', type: 'folder', items: 23, date: '2024-10-12', starred: false },
  ];


  return (

    <div className="flex h-screen bg-gray-50 p-4 pt-20 md:ml-64">
      <aside className="flex w-64 flex-col border border-gray-500 bg-white">
        <div className="border-b p-4 flex items-center justify-between ">
          <h2 className="text-lg font-semibold text-gray-700">파일함</h2>
         <FileUploadModal/>
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
      <main className="flex flex-1 flex-col bg-gray-50 border ml-5">
        <header className="border-b bg-white p-4">
          <div className="flex justify-between items-center ">

              <h2 className="text-lg font-semibold text-gray-800">김상무의 파일함</h2>

              <SearchFile />

          </div>
          <div className="flex items-center gap-6 mt-4">
            <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-2">
              전체 파일
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 pb-2">
              최근 항목
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 pb-2">
              즐겨찾기
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 pb-2">
              공유됨
            </button>
          </div>
        </header>
       <div className="h-screen overflow-auto  bg-white p-4">
         {/* Toolbar */}
         <div className="flex items-center justify-between mb-6">
           <p className="text-sm text-gray-600">총 {files.length}개 항목</p>
           <div className="flex items-center gap-2">
             <button
               type="button"
               className="point-cursortext-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center  "
             ><span> 정렬</span>
             </button>
             <button
               onClick={() => setViewMode('grid')}
               className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
             >
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm8-8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
               </svg>
             </button>
             <button
               onClick={() => setViewMode('list')}
               className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
             >
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
               </svg>
             </button>
           </div>
         </div>

         {/* Grid View */}
         {viewMode === 'grid' && (
           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
             {files.map((item) => (
               <div
                 key={item.id}
                 className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
               >
                 <div className="flex items-start justify-between mb-3">
                   <div className={`p-3 rounded-lg ${item.type === 'folder' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                     {item.type === 'folder' ? (
                       <Folder className="w-6 h-6 text-blue-600" />
                     ) : (
                       <File className="w-6 h-6 text-gray-600" />
                     )}
                   </div>
                   <div className="flex items-center gap-1">
                     {item.starred && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                     <button className="p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                       <MoreVertical className="w-4 h-4 text-gray-600" />
                     </button>
                   </div>
                 </div>
                 <h3 className="font-medium text-gray-900 truncate mb-1">{item.name}</h3>
                 <p className="text-xs text-gray-500">
                   {item.type === 'folder' ? `${item.items}개 항목` : item.size} · {item.date}
                 </p>
               </div>
             ))}
           </div>
         )}

         {/* List View */}
         {viewMode === 'list' && (
           <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
             <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
               <tr>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   이름
                 </th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   크기
                 </th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   수정일
                 </th>
                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                   작업
                 </th>
               </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
               {files.map((item) => (
                 <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className={`p-2 rounded ${item.type === 'folder' ? 'bg-blue-100' : 'bg-gray-100'} mr-3`}>
                         {item.type === 'folder' ? (
                           <Folder className="w-5 h-5 text-blue-600" />
                         ) : (
                           <File className="w-5 h-5 text-gray-600" />
                         )}
                       </div>
                       <div className="flex items-center gap-2">
                         <span className="text-sm font-medium text-gray-900">{item.name}</span>
                         {item.starred && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     {item.type === 'folder' ? `${item.items}개 항목` : item.size}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     {item.date}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <div className="flex items-center justify-end gap-2">
                       <button className="p-1.5 rounded hover:bg-gray-100" title="다운로드">
                         <Download className="w-4 h-4 text-gray-600" />
                       </button>
                       <button className="p-1.5 rounded hover:bg-gray-100" title="공유">
                         <Share2 className="w-4 h-4 text-gray-600" />
                       </button>
                       <button className="p-1.5 rounded hover:bg-gray-100" title="삭제">
                         <Trash2 className="w-4 h-4 text-gray-600" />
                       </button>
                     </div>
                   </td>
                 </tr>
               ))}
               </tbody>
             </table>
           </div>
         )}

       </div>
      </main>
    </div>
  );
}