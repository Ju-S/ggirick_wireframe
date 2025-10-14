import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Button, Card } from "flowbite-react";
import { PencilSquareIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";

import WorkStatusCard from "../commons/components/ui/WorkStatusCard.jsx";

export default function WorkManagementPage() {
  // 초기 출근 기록 데이터
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      date: "2025-10-13",
      startTime: "09:15",
      endTime: "18:30",
      duration: "8.25시간",
      status: "정상출근",
    },
    {
      id: 2,
      date: "2025-10-14",
      startTime: "14:58",
      endTime: "14:58",
      duration: "0시간",
      status: "정상출근",
    },
    {
      id: 2,
      date: "2025-10-12",
      startTime: "14:58",
      endTime: "14:58",
      duration: "0시간",
      status: "정상출근",
    },
  ]);

  // 초기 업무 데이터
  const tasks = [
    {
      id: 1,
      title: "데이터베이스 설계",
      description: "Oracle 데이터베이스 스키마 설계",
      assignee: "이사원",
      dueDate: "2024. 12. 20.",
      status: "완료",
      color: "green",
    },
    {
      id: 2,
      title: "개인 작업 - 보고서 작성",
      description: "월간 업무 보고서 작성",
      assignee: "이사원",
      dueDate: "2025. 10. 21.",
      status: "진행중",
      color: "blue",
    },
    {
      id: 3,
      title: "213",
      description: "12332123113",
      assignee: "이사원",
      dueDate: "미정",
      status: "대기",
      color: "orange",
    },
  ];

  const getBadgeStyle = (status) => {
    switch (status) {
      case "완료":
        return "bg-gray-900 text-white";
      case "진행중":
        return "bg-blue-100 text-blue-800";
      case "대기":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  /* 항목 전환 */
  const [activeView, setActiveView] = useState("commuting");

  return (
    <main className="h-auto p-4 pt-20 md:ml-64">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between p-1 pb-4">
        <div className="text-lg text-gray-900 dark:text-white">근무관리</div>
        <span className="rounded-full bg-black px-3 py-1 text-sm font-medium whitespace-nowrap text-white">
          + 업무 추가
        </span>
      </div>

      {/* 🔹 탭 버튼 영역 */}
      <div className="flex items-center justify-start border-b bg-white p-3 mb-4">
        <div className="flex flex-wrap gap-2">
          {[
            ["commuting", "출퇴근"],
            ["work", "업무"],
            ["vacation", "휴가"],
            ["schedule", "일정"],
            ["gantt", "간트차트"],
            ["department", "부서현황"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveView(key)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeView === key
                  ? "bg-black text-white shadow-md"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 탭별 컨텐츠 */}
      <div className="space-y-4">
        {/* 출퇴근 탭 */}
        {activeView === "commuting" && (
          <>
            {/* 1층 */}
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* 항목 1 */}
              <WorkStatusCard />

              {/* 항목 2 */}
              <Card className="flex h-32 flex-col items-center justify-center rounded-lg bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="p-2 text-base text-gray-400 dark:text-white">
                  오늘 근무시간
                </div>
                <div className="ps-2 pe-2 text-2xl text-gray-900 dark:text-white">
                  시간
                </div>
              </Card>

              {/* 항목 3 */}
              <Card className="flex h-32 flex-col items-center justify-center rounded-lg bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="p-2 text-base text-gray-400 dark:text-white">
                  이번주 근무시간
                </div>
                <div className="ps-2 pe-2 text-2xl text-gray-900 dark:text-white">
                  시간
                </div>
              </Card>

              {/* 항목 4 */}
              <Card className="flex h-32 flex-col items-center justify-center rounded-lg bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700">
                <span className="rounded-full bg-black px-3 py-1 text-sm font-medium whitespace-nowrap text-white">
                  외근 신청
                </span>
              </Card>
            </div>

            {/* 2층 */}
            <Card className="flex flex-col gap-2 rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-600">
              <h2 className="text-lg font-semibold mb-2">
                출근 기록
              </h2>

              <div className="flex flex-col gap-3">
                {attendanceRecords.map((record) => (
                  <Card
                    key={record.id}
                    className="h-18 rounded-lg border border-gray-300 px-2 dark:border-gray-600"
                  >
                    <div>
                      <div className="font-medium text-gray-600">
                        {new Date(record.date).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          오전 {record.startTime} - 오후 {record.endTime} (
                          {record.duration})
                        </div>
                        <span className="rounded-full bg-black px-3 py-1 text-sm font-medium whitespace-nowrap text-white">
                          {record.status}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* ✅ 업무 탭 (Flowbite UI 버전) */}
        {activeView === "work" && (
          <Card className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              내 업무
            </h2>

            <div className="flex flex-col gap-2">
              {[
                {
                  id: 1,
                  title: "데이터베이스 설계",
                  description: "Oracle 데이터베이스 스키마 설계",
                  assignee: "이사원",
                  dueDate: "2024. 12. 20.",
                  status: "완료",
                  priority: "상",
                  color: "green",
                },
                {
                  id: 2,
                  title: "개인 작업 - 보고서 작성",
                  description: "월간 업무 보고서 작성",
                  assignee: "이사원",
                  dueDate: "2025. 10. 21.",
                  status: "진행중",
                  priority: "중",
                  color: "blue",
                },
                {
                  id: 3,
                  title: "213",
                  description: "12332123113",
                  assignee: "이사원",
                  dueDate: "미정",
                  status: "대기",
                  priority: "하",
                  color: "orange",
                },
              ].map((task) => (
                <Card
                  key={task.id}
                  className="rounded-md border border-gray-200 bg-gray-50 p-3 shadow-none hover:bg-gray-100 transition-all dark:border-gray-600 dark:bg-gray-700"
                >
                  <div className="flex justify-between items-start">
                    {/* 제목 + 설명 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {/* 상태별 아이콘 */}
                        {task.color === "green" && (
                          <span className="h-3 w-3 rounded-full bg-green-500"></span>
                        )}
                        {task.color === "blue" && (
                          <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                        )}
                        {task.color === "orange" && (
                          <span className="h-3 w-3 rounded-full bg-orange-500"></span>
                        )}

                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {task.title}
                        </h3>

                        {/* 우선순위 뱃지 */}
                        <span
                          className={`text-xs font-medium px-2 py-[2px] rounded-full ${
                            task.priority === "상"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "중"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                  {task.priority}
                </span>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        {task.description}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        담당자: {task.assignee} | 마감일: {task.dueDate}
                      </p>
                    </div>

                    {/* 오른쪽 버튼 그룹 */}
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2">
                        <button className="text-xs border border-gray-300 rounded px-2 py-[2px] hover:bg-gray-100 dark:border-gray-500 dark:text-white">
                          수정
                        </button>
                        <span
                          className={`rounded-full px-2 py-[2px] text-xs font-medium ${
                            task.status === "완료"
                              ? "bg-black text-white"
                              : task.status === "진행중"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-200 text-gray-600"
                          }`}
                        >
                  {task.status}
                </span>
                      </div>

                      {/* 상태별 버튼 */}
                      {task.status === "진행중" && (
                        <button className="text-xs border border-gray-300 rounded px-2 py-[2px] hover:bg-gray-100 dark:border-gray-500 dark:text-white">
                          완료하기
                        </button>
                      )}
                      {task.status === "대기" && (
                        <button className="text-xs border border-gray-300 rounded px-2 py-[2px] hover:bg-gray-100 dark:border-gray-500 dark:text-white">
                          시작하기
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* 휴가 탭 */}
        {activeView === "vacation" && (
          <Card className="p-6 text-gray-700 dark:text-gray-200">
            <h2 className="text-lg font-semibold mb-2">휴가 관리</h2>
            <p>휴가 신청 및 승인 내역을 관리하는 화면입니다.</p>
          </Card>
        )}

        {/* 일정 탭 */}
        {activeView === "schedule" && (
          <Card className="p-6 text-gray-700 dark:text-gray-200">
            <h2 className="text-lg font-semibold mb-2">일정 관리</h2>
            <p>사내 캘린더를 통한 일정 관리 화면입니다.</p>
          </Card>
        )}

        {/* 간트차트 탭 */}
        {activeView === "gantt" && (
          <Card className="p-6 text-gray-700 dark:text-gray-200">
            <h2 className="text-lg font-semibold mb-2">간트 차트</h2>
            <p>프로젝트별 작업 스케줄을 시각화한 간트 차트입니다.</p>
          </Card>
        )}

        {/* 부서현황 탭 */}
        {activeView === "department" && (
          <Card className="p-6 text-gray-700 dark:text-gray-200">
            <h2 className="text-lg font-semibold mb-2">부서 현황</h2>
            <p>부서별 근무 인원 및 현황을 확인하는 화면입니다.</p>
          </Card>
        )}
      </div>
    </main>
  );
}
