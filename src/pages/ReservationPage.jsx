import { useState } from "react";

export default function ReservationPage() {
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <main className="flex h-screen flex-col bg-gray-50 p-4 pt-20 md:ml-64">
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between border-b bg-white p-4">
        <h1 className="text-xl font-semibold">예약 관리</h1>
        <div className="flex gap-2">
          <button className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
            예약 생성
          </button>
          <button className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300">
            필터
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-48 overflow-y-auto border-r bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold">예약 관리</h2>
          <ul className="space-y-1">
            <li
              onClick={() => setActiveTab("calendar")}
              className={`cursor-pointer rounded p-2 hover:bg-gray-100 ${
                activeTab === "calendar" ? "bg-blue-100 text-blue-700" : ""
              }`}
            >
              캘린더
            </li>
            <li
              onClick={() => setActiveTab("resources")}
              className={`cursor-pointer rounded p-2 hover:bg-gray-100 ${
                activeTab === "resources" ? "bg-blue-100 text-blue-700" : ""
              }`}
            >
              리소스 목록
            </li>
            <li
              onClick={() => setActiveTab("myReservations")}
              className={`cursor-pointer rounded p-2 hover:bg-gray-100 ${
                activeTab === "myReservations"
                  ? "bg-blue-100 text-blue-700"
                  : ""
              }`}
            >
              나의 예약
            </li>
          </ul>
        </aside>

        {/* 메인 컨텐츠: 캘린더 + 예약 리스트 */}
        <section className="flex-1 overflow-auto p-4">
          {activeTab === "calendar" && (
            <div className="rounded bg-white p-4 shadow">
              <h2 className="mb-2 text-lg font-semibold">캘린더</h2>
              <div className="rounded bg-white p-4 shadow">
                <div className="mb-2 flex items-center justify-between">
                  <button className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300">
                    &lt;
                  </button>
                  <h2 className="text-lg font-semibold">2025년 10월</h2>
                  <button className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300">
                    &gt;
                  </button>
                </div>

                <div className="mb-1 grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500">
                  <div>일</div>
                  <div>월</div>
                  <div>화</div>
                  <div>수</div>
                  <div>목</div>
                  <div>금</div>
                  <div>토</div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-xs">
                  {Array.from({ length: 42 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex h-20 cursor-pointer flex-col justify-between rounded border p-1 hover:bg-gray-50"
                    >
                      <span className="text-gray-400">
                        {i < 3 ? "" : i - 2}
                      </span>
                      {/* 예약 표시 배지 예시 */}
                      {i % 5 === 0 && (
                        <span className="rounded bg-blue-100 px-1 text-[10px] text-blue-800">
                          회의실
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* 예약 가능한 리소스 뷰 */}
          {activeTab === "resources" && (
            <div className="rounded bg-white p-4 shadow">
              <h2 className="mb-3 text-lg font-semibold">예약 가능한 리소스</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  "회의실 A",
                  "회의실 B",
                  "프로젝터",
                  "세미나실",
                  "차량 1호",
                ].map((item,index) => (
                  <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src={`https://picsum.photos/400/300?random=${index + 1}`}
                        alt=""
                      />
                    </a>
                    <div className="p-5">
                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {item}
                        </h5>
                      </a>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        설명 또는 위치 정보
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        예약하기
                        <svg
                          className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "myReservations" && (
            <div className="rounded bg-white p-4 shadow">
              <h2 className="mb-2 text-lg font-semibold">예약 목록</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      예약자
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      일시
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      장소
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      상태
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2">Alice</td>
                    <td className="px-4 py-2">2025-10-14 10:00</td>
                    <td className="px-4 py-2">회의실 A</td>
                    <td className="px-4 py-2">
                      <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                        예약 완료
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button className="text-blue-500 hover:underline">
                        보기
                      </button>
                    </td>
                  </tr>
                  {/* 더미 데이터 반복 */}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
