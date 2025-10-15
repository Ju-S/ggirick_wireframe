import React, { useState } from "react";
import "flowbite";
import { Button, Dropdown, Pagination, TextInput } from "flowbite-react";
import { PenSquare, Plus } from "lucide-react";

export default function Contacts() {
  const [activeTab, setActiveTab] = useState("company");
  const [selectedFilter, setSelectedFilter] = useState("title_content");
  const [currentPage, setCurrentPage] = useState(1);

  const filters = [
    { value: "title_content", label: "제목+내용+작성자" },
    { value: "title", label: "제목" },
    { value: "content", label: "내용" },
    { value: "author", label: "작성자" },
  ];

  return (
    <main className="min-h-screen max-h-screen flex flex-col p-4 pt-20 md:ml-64 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 grid grid-cols-6 gap-4">
        {/* ------------------- 사이드 네비게이션 ------------------- */}
        <aside className="col-span-1 rounded-lg border bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 p-4 flex flex-col shadow-sm">
          {/* 주소록 추가 버튼 */}
          <button className="text-gray-700 dark:text-white px-3 py-2 mb-4 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition">
            <PenSquare className="h-4 w-4" />
            주소록 추가
          </button>

          {/* 즐겨찾기 탭 */}
          <div className="flex flex-col gap-2 text-sm">
            <button
              onClick={() => setActiveTab("company")}
              className={`px-3 py-2 text-left rounded-md transition ${
                activeTab === "company"
                  ? "bg-gray-100 font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              즐겨찾기
            </button>

            {/* 회사 내부 그룹 드롭다운 */}
            <div>
              <div className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <button
                  onClick={() => setActiveTab("group")}
                  className={`text-left ${
                    activeTab === "group"
                      ? "font-semibold text-gray-900 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  ggirick company
                </button>
                <Plus className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
              </div>

              {/* 그룹 리스트 */}
              {activeTab === "group" && (
                <div className="ml-3 mt-1 flex flex-col gap-1 text-sm">
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    개발팀
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    디자인팀
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    마케팅팀
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    경리팀
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    인사팀
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    수출팀
                  </button>
                </div>
              )}
            </div>

            {/* 회사 내부 그룹 드롭다운 */}
            <div>
              <div className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <button
                  onClick={() => setActiveTab("group")}
                  className={`text-left ${
                    activeTab === "group"
                      ? "font-semibold text-gray-900 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  other company
                </button>
                <Plus className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
              </div>

              {/* 그룹 리스트 */}
              {activeTab === "group" && (
                <div className="ml-3 mt-1 flex flex-col gap-1 text-sm">
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    신진무역
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    삼성
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    애플
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    레드불
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    나사
                  </button>

                </div>
              )}
            </div>
          </div>
        </aside>



        {/* ------------------- 게시글 목록 ------------------- */}
        <section className="col-span-5 rounded-lg border bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 p-5 flex flex-col shadow-sm">
          {/* 검색창 + 필터 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TextInput
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-80 md:w-96 focus:ring-gray-300 focus:border-gray-300 dark:focus:ring-gray-600 dark:focus:border-gray-600"
                sizing="sm"
              />
            </div>
          </div>

          {/* 게시글 목록 */}
          <div className="flex-1 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                <th className="py-3 px-4">이름</th>
                <th className="py-3 px-4 w-24 text-center">이메일</th>
                <th className="py-3 px-4 w-32 text-center">전화번호</th>
                <th className="py-3 px-4 w-32 text-center">회사</th>
                <th className="py-3 px-4 w-32 text-center">태그</th>
              </tr>
              </thead>
              <tbody>
              {Array.from({ length: 10 }, (_, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 transition"
                >
                  <td className="py-3 px-4">이름{i + 1}</td>
                  <td className="py-3 px-4 text-center">test{i+1}@ggirick.com</td>
                  <td className="py-3 px-4 text-center">010-1234-5678</td>
                  <td className="py-3 px-4 text-center">ggrick comp</td>
                  <td className="py-3 px-4 text-center">영업부</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              onPageChange={page => setCurrentPage(page)}
              totalPages={5}
              showIcons
              className="[&>nav>ul>li>button]:text-gray-600 [&>nav>ul>li>button:hover]:bg-gray-100 dark:[&>nav>ul>li>button]:text-gray-300 dark:[&>nav>ul>li>button:hover]:bg-gray-800"
            />
          </div>
        </section>
      </div>
    </main>
  );
}