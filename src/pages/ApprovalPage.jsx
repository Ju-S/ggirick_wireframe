import { useState } from "react";
import { Button, Dropdown, TextInput, Pagination } from "flowbite-react";
import { Plus, PenSquare } from "lucide-react";

export default function ApprovalPage() {
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
          {/* 게시글 작성 버튼 */}
          <button className="text-gray-700 dark:text-white px-3 py-2 mb-4 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition">
            <PenSquare className="h-4 w-4" />
            결재 문서 작성
          </button>

          {/* 전사 / 그룹 게시판 탭 */}
          <div className="flex flex-col gap-2 text-sm">
            <button
              onClick={() => setActiveTab("company")}
              className={`px-3 py-2 text-left rounded-md transition ${
                activeTab === "company"
                  ? "bg-gray-100 font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setActiveTab("wait")}
              className={`px-3 py-2 text-left rounded-md transition ${
                activeTab === "wait"
                  ? "bg-gray-100 font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              대기
            </button>
            <button
              onClick={() => setActiveTab("success")}
              className={`px-3 py-2 text-left rounded-md transition ${
                activeTab === "success"
                  ? "bg-gray-100 font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              승인
            </button>
            <button
              onClick={() => setActiveTab("fail")}
              className={`px-3 py-2 text-left rounded-md transition ${
                activeTab === "fail"
                  ? "bg-gray-100 font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              반려
            </button>

            {/* 그룹 게시판 드롭다운 */}
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
                  보관함
                </button>
                <Plus className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
              </div>

              {/* 그룹 리스트 */}
              {activeTab === "group" && (
                <div className="ml-3 mt-1 flex flex-col gap-1 text-sm">
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    보관함1
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    보관함2
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:underline text-left">
                    보관함3
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
              <Dropdown
                label={filters.find(f => f.value === selectedFilter)?.label}
                dismissOnClick={true}
                size="sm"
                color="light"
                className="focus:ring-gray-300 focus:border-gray-300"
              >
                {filters.map(f => (
                  <Dropdown.Item key={f.value} onClick={() => setSelectedFilter(f.value)}>
                    {f.label}
                  </Dropdown.Item>
                ))}
              </Dropdown>

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
                <th className="py-3 px-4">제목</th>
                <th className="py-3 px-4 w-24 text-center">진행상황</th>
                <th className="py-3 px-4 w-32 text-center">작성자</th>
              </tr>
              </thead>
              <tbody>
              {Array.from({ length: 10 }, (_, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 transition"
                >
                  <td className="py-3 px-4">결재서류 {i + 1}</td>
                  <td className="py-3 px-4 text-center">{i > 3 ? "승인" : "반려"}</td>
                  <td className="py-3 px-4 text-center">홍길동</td>
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
