import { useEffect, useState } from "react";
import { Button, Card, TextInput } from "flowbite-react";
import WorkStatusCard from "../commons/components/ui/WorkStatusCard.jsx";

export default function WorkManagementPage() {
  /* ------------------------------ 출근 기록 ------------------------------ */
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
      id: 3,
      date: "2025-10-12",
      startTime: "14:58",
      endTime: "14:58",
      duration: "0시간",
      status: "정상출근",
    },
  ]);

  // ✅ 간트차트 보기 범위 상태
  const [viewRange, setViewRange] = useState("1month");

  // ✅ 표시할 날짜 목록 (1~말일 or 3개월치)
  const generateDates = (range) => {
    const today = new Date();
    const dates = [];
    const months = range === "1month" ? 1 : range === "3month" ? 3 : 6;

    const end = new Date(today);
    end.setMonth(end.getMonth() + months);

    let cur = new Date(today.getFullYear(), today.getMonth(), 1);
    while (cur <= end) {
      const month = (cur.getMonth() + 1).toString().padStart(2, "0");
      const day = cur.getDate().toString().padStart(2, "0");
      dates.push(`${month}/${day}`);
      cur.setDate(cur.getDate() + 1);
    }
    return dates;
  };

  const [dates, setDates] = useState(generateDates(viewRange));

  // ✅ 드롭다운 변경 시 자동 재생성
  useEffect(() => {
    setDates(generateDates(viewRange));
  }, [viewRange]);

  /* ------------------------------ 일정 ------------------------------ */
  const [selectedDate, setSelectedDate] = useState("2025-10-11");

  const schedules = [
    { id: 1, date: "2025-10-13", title: "팀 미팅", time: "오전 10:00" },
    { id: 2, date: "2025-10-15", title: "프로젝트 발표", time: "오후 2:00" },
    { id: 3, date: "2025-10-15", title: "코드 리뷰", time: "오전 11:00" },
  ];

  const filteredSchedule = schedules.filter(
    (item) => item.date === selectedDate,
  );

  /* ------------------------------ 업무 ------------------------------ */
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "데이터베이스 설계",
      description: "Oracle 데이터베이스 스키마 설계",
      assignee: "이사원",
      dueDate: "2024-12-20",
      status: "완료",
      priority: "상",
      color: "green",
    },
    {
      id: 2,
      title: "개인 작업 - 보고서 작성",
      description: "월간 업무 보고서 작성",
      assignee: "이사원",
      dueDate: "2025-10-21",
      status: "진행중",
      priority: "중",
      color: "blue",
    },
    {
      id: 3,
      title: "213",
      description: "12332123113",
      assignee: "이사원",
      dueDate: "",
      status: "대기",
      priority: "하",
      color: "orange",
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "중",
  });

  const handleAddTask = () => {
    if (!newTask.title) return alert("업무 제목은 필수입니다!");
    const newEntry = {
      id: Date.now(),
      assignee: "이사원",
      status: "대기",
      color:
        newTask.priority === "상"
          ? "red"
          : newTask.priority === "중"
            ? "blue"
            : "gray",
      ...newTask,
    };
    setTasks([...tasks, newEntry]);
    setNewTask({ title: "", description: "", dueDate: "", priority: "중" });
  };

  /* ------------------------------ 탭 ------------------------------ */
  const [activeView, setActiveView] = useState("commuting");

  /* ------------------------------ 화면 ------------------------------ */
  return (
    <main className="h-auto p-4 pt-20 md:ml-64">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between p-1 pb-4">
        <div className="text-lg text-gray-900 dark:text-white">근무관리</div>
      </div>

      {/* 탭 버튼 */}
      <div className="mb-4 flex items-center justify-start border-b bg-white p-3">
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

      {/* ------------------------------ 출퇴근 탭 ------------------------------ */}
      {activeView === "commuting" && (
        <>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <WorkStatusCard />
            <Card className="flex h-32 flex-col items-center justify-center bg-white hover:bg-gray-100">
              <div className="text-base text-gray-400">오늘 근무시간</div>
              <div className="text-2xl text-gray-900">시간</div>
            </Card>
            <Card className="flex h-32 flex-col items-center justify-center bg-white hover:bg-gray-100">
              <div className="text-base text-gray-400">이번주 근무시간</div>
              <div className="text-2xl text-gray-900">시간</div>
            </Card>
            <Card className="flex h-32 flex-col items-center justify-center bg-white hover:bg-gray-100">
              <span className="rounded-full bg-black px-3 py-1 text-sm text-white">
                외근 신청
              </span>
            </Card>
          </div>

          <Card className="flex flex-col gap-2 rounded-lg border border-gray-300 bg-white p-2">
            <h2 className="mb-2 text-lg font-semibold">출근 기록</h2>
            <div className="flex flex-col gap-3">
              {attendanceRecords.map((record) => (
                <Card key={record.id} className="border border-gray-300 px-2">
                  <div>
                    <div className="font-medium text-gray-600">
                      {new Date(record.date).toLocaleDateString("ko-KR")}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        오전 {record.startTime} - 오후 {record.endTime} (
                        {record.duration})
                      </div>
                      <span className="rounded-full bg-black px-3 py-1 text-sm text-white">
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

      {/* ------------------------------ 업무 탭 ------------------------------ */}
      {activeView === "work" && (
        <Card className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-4 text-lg font-semibold">내 업무</h2>

          {/* 새 업무 추가 */}
          <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <TextInput
              placeholder="업무 제목"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <TextInput
              placeholder="설명"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <TextInput
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
            />
          </div>

          <div className="mb-4 flex items-center gap-2">
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="상">상</option>
              <option value="중">중</option>
              <option value="하">하</option>
            </select>
            <Button color="dark" onClick={handleAddTask}>
              + 업무 추가
            </Button>
          </div>

          {/* 업무 리스트 */}
          <div className="flex flex-col gap-2">
            {tasks.map((task) => {
              // 상태별 테두리색
              const statusStyle =
                task.status === "완료"
                  ? "border-green-300 bg-green-50"
                  : task.status === "진행중"
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-300 bg-gray-50";

              // 우선순위별 텍스트색
              const priorityColor =
                task.priority === "상"
                  ? "text-red-600"
                  : task.priority === "중"
                    ? "text-yellow-600"
                    : "text-green-600";

              return (
                <Card
                  key={task.id}
                  className={`border ${statusStyle} p-3 transition-all duration-200 hover:shadow-sm`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        {/* 상태 점 */}
                        <span
                          className={`h-3 w-3 rounded-full ${
                            task.status === "완료"
                              ? "bg-green-500"
                              : task.status === "진행중"
                                ? "bg-blue-500"
                                : "bg-gray-400"
                          }`}
                        ></span>

                        {/* 제목 */}
                        <span
                          className={`text-sm font-semibold ${priorityColor}`}
                        >
                          {task.title}
                        </span>

                        {/* 우선순위 뱃지 */}
                        <span
                          className={`rounded-full border px-2 py-[2px] text-xs ${priorityColor} border-opacity-50`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-gray-500">
                        {task.description}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        담당자: {task.assignee} | 마감일:{" "}
                        {task.dueDate ? task.dueDate : "미정"}
                      </p>
                    </div>

                    {/* 상태 뱃지 */}
                    <span
                      className={`rounded-full px-2 py-[2px] text-xs ${
                        task.status === "완료"
                          ? "bg-green-600 text-white"
                          : task.status === "진행중"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-400 text-white"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>
      )}

      {/* ------------------------------ 휴가 탭 ------------------------------ */}
      {activeView === "vacation" && (
        <Card className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">휴가 관리</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* 🔹 휴가 신청 폼 */}
            <Card className="bg-gray-50 p-4">
              <h3 className="mb-3 font-semibold">휴가 신청</h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("휴가 신청이 등록되었습니다!");
                }}
                className="flex flex-col gap-2"
              >
                <label className="text-sm text-gray-600">휴가 종류</label>
                <select className="rounded-lg border border-gray-300 p-2 text-sm">
                  <option>연차</option>
                  <option>반차</option>
                  <option>병가</option>
                  <option>기타</option>
                </select>

                <label className="text-sm text-gray-600">기간</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  />
                  <span className="text-gray-500">~</span>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  />
                </div>

                <label className="text-sm text-gray-600">사유</label>
                <textarea
                  placeholder="사유를 입력하세요"
                  rows={3}
                  className="rounded-lg border border-gray-300 p-2 text-sm"
                ></textarea>

                <Button color="dark" className="mt-2">
                  휴가 신청하기
                </Button>
              </form>
            </Card>

            {/* 🔹 휴가 내역 */}
            <Card className="bg-gray-50 p-4">
              <h3 className="mb-3 font-semibold">내 휴가 내역</h3>

              <ul className="space-y-2">
                {[
                  {
                    type: "연차",
                    from: "2025-10-10",
                    to: "2025-10-11",
                    status: "승인",
                  },
                  {
                    type: "반차",
                    from: "2025-10-15",
                    to: "2025-10-15",
                    status: "대기",
                  },
                ].map((vac, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <div>
                      <span className="font-semibold text-gray-800">
                        {vac.type}
                      </span>
                      <span className="ml-2 text-gray-500">
                        {vac.from} ~ {vac.to}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-2 py-[2px] text-xs ${
                        vac.status === "승인"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {vac.status}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Card>
      )}

      {/* ------------------------------ 일정 탭 ------------------------------ */}
      {activeView === "schedule" && (
        <Card className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-4 text-lg font-semibold">일정 관리</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold">일정 달력</h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2"
              />
            </Card>
            <Card className="bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold">선택한 날짜의 일정</h3>
              <p className="mb-2 text-sm text-gray-500">
                {new Date(selectedDate).toLocaleDateString("ko-KR")}
              </p>
              {filteredSchedule.length > 0 ? (
                <ul className="space-y-2">
                  {filteredSchedule.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between rounded border border-gray-300 bg-white px-3 py-2"
                    >
                      <span>{item.title}</span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded border border-gray-300 bg-white p-2 text-center text-sm text-gray-500">
                  일정이 없습니다
                </div>
              )}
            </Card>
          </div>
        </Card>
      )}

      {/* ------------------------------ 간트차트 탭 ------------------------------ */}
      {activeView === "gantt" && (
        <Card className="p-6 text-gray-700">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">업무 간트 차트</h2>
            <select
              value={viewRange}
              onChange={(e) => setViewRange(e.target.value)}
              className="rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="1month">1개월 보기</option>
              <option value="3month">3개월 보기</option>
              <option value="6month">6개월 보기</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[1200px] border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="w-48 border border-gray-300 p-2">작업</th>
                  {dates.map((date) => (
                    <th
                      key={date}
                      className="border border-gray-300 p-2 text-center font-normal whitespace-nowrap"
                    >
                      {date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const totalDays = dates.length;

                  // ✅ 상태별 색상
                  const barColor =
                    task.status === "완료"
                      ? "#22c55e"
                      : task.status === "진행중"
                        ? "#3b82f6"
                        : "#9ca3af";

                  // ✅ 우선순위별 테두리
                  const borderColor =
                    task.priority === "상"
                      ? "#ef4444"
                      : task.priority === "중"
                        ? "#facc15"
                        : "#4ade80";

                  // ✅ 실제 간트차트 첫 날짜
                  const chartStart = new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    1,
                  );
                  const chartEnd = new Date(chartStart);
                  chartEnd.setDate(chartStart.getDate() + totalDays);

                  // ✅ 업무 마감일
                  const due = task.dueDate ? new Date(task.dueDate) : null;

                  // ✅ 시작/종료 위치 계산 (차트 전체 기준)
                  const startIdx = 0; // 이번엔 모든 업무를 월 초부터 시작한다고 가정
                  let endIdx = 0;

                  if (due) {
                    const diffDays = Math.floor(
                      (due - chartStart) / (1000 * 60 * 60 * 24),
                    );
                    endIdx = Math.min(diffDays, totalDays - 1);
                  } else {
                    endIdx = Math.min(totalDays / 4, totalDays - 1); // 마감일 없으면 대략 1주 정도 표시
                  }

                  const barWidth = `${((endIdx - startIdx + 1) / totalDays) * 100}%`;

                  return (
                    <tr key={task.id}>
                      <td className="border border-gray-300 p-2 font-medium whitespace-nowrap text-gray-800">
                        {task.title}
                      </td>
                      <td
                        colSpan={dates.length}
                        className="border border-gray-200"
                      >
                        <div
                          className="relative flex h-6 items-center justify-center text-xs font-semibold text-white"
                          style={{
                            width: barWidth,
                            backgroundColor: barColor,
                            border: `2px solid ${borderColor}`,
                            borderRadius: "6px",
                            marginLeft: `${(startIdx / totalDays) * 100}%`,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {task.title}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ✅ 범례 */}
          <div className="mt-4 flex justify-between text-sm">
            {/* 상태 범례 */}
            <div className="flex items-center gap-3">
              <span className="font-semibold">상태</span>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-green-500"></span> 완료
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-blue-500"></span> 진행중
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-gray-400"></span> 대기
              </div>
            </div>

            {/* 우선순위 범례 */}
            <div className="flex items-center gap-3">
              <span className="font-semibold">우선순위</span>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded border-2 border-red-500"></span>{" "}
                상
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded border-2 border-yellow-400"></span>{" "}
                중
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded border-2 border-green-400"></span>{" "}
                하
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ------------------------------ 부서현황 탭 ------------------------------ */}
      {activeView === "department" && (
        <Card className="p-6 text-gray-700">
          <h2 className="mb-4 text-lg font-semibold">부서별 근무 현황</h2>

          <div className="flex flex-col gap-3">
            {[
              { name: "경영진", total: 1, present: 0, absent: 1 },
              { name: "영업팀", total: 1, present: 0, absent: 1 },
              { name: "개발팀", total: 2, present: 0, absent: 2 },
            ].map((dept, idx) => {
              const rate =
                dept.total > 0
                  ? Math.round((dept.present / dept.total) * 100)
                  : 0;

              return (
                <Card
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:bg-gray-50"
                >
                  {/* 왼쪽 부서 정보 */}
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-gray-900">
                      {dept.name}
                    </span>
                    <div className="mt-1 flex gap-4 text-sm text-gray-600">
                      <span>전체: {dept.total}명</span>
                      <span>출근: {dept.present}명</span>
                      <span>결근: {dept.absent}명</span>
                    </div>
                  </div>

                  {/* 오른쪽 출근률 */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">출근률</span>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        rate === 100
                          ? "bg-green-100 text-green-700"
                          : rate > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {rate}%
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>
      )}
    </main>
  );
}
