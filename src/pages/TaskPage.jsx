import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


export default function TaskPage() {
  // ✅ 프로젝트 데이터 (프로젝트별로 서로 다른 task 집합)
  const [projects, setProjects] = useState([
    {
      id: "p1",
      name: "Frontend Refactor",
      desc: "React 구조 개선 및 컴포넌트 리빌딩",
      range: "2025-10-01 ~ 2025-10-31",
      members: ["홍", "김", "이", "박"],
      tasks: [
        { id: "t1", title: "UI 디자인 검토", assignee: "홍길동", status: "할 일", due: "2025-10-15" },
        { id: "t2", title: "DB 스키마 설계", assignee: "김철수", status: "할 일", due: "2025-10-17" },
        { id: "t3", title: "API 명세서 작성", assignee: "이영희", status: "진행 중", due: "2025-10-18" },
        { id: "t4", title: "프로젝트 세팅 완료", assignee: "박민수", status: "완료", due: "2025-10-12" },
      ],
    },
    {
      id: "p2",
      name: "Mobile App Launch",
      desc: "React Native 기반 신규 앱 출시",
      range: "2025-11-01 ~ 2025-11-30",
      members: ["서", "윤", "최", "정"],
      tasks: [
        { id: "t5", title: "푸시 알림 연동", assignee: "서진우", status: "할 일", due: "2025-11-10" },
        { id: "t6", title: "UI 컴포넌트 테스트", assignee: "윤하나", status: "진행 중", due: "2025-11-12" },
      ],
    },
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState("p1");
  const [activeView, setActiveView] = useState("kanban");

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  // ✅ 상태별 그룹화
  const getColumns = (tasks) => ({
    "할 일": tasks.filter((t) => t.status === "할 일"),
    "진행 중": tasks.filter((t) => t.status === "진행 중"),
    "완료": tasks.filter((t) => t.status === "완료"),
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    // ✅ 상태 변경
    const updatedTasks = selectedProject.tasks.map((task) =>
      task.id === result.draggableId
        ? { ...task, status: destination.droppableId }
        : task
    );

    // ✅ projects 배열에 반영
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id ? { ...p, tasks: updatedTasks } : p
      )
    );
  };

  const renderView = () => {
    if (activeView === "kanban") {
      const columns = getColumns(selectedProject.tasks);
      return (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-4 p-4">
            {Object.entries(columns).map(([col, colTasks]) => (
              <Droppable key={col} droppableId={col}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-gray-50 border rounded-lg p-4 transition-colors ${
                      snapshot.isDraggingOver ? "bg-blue-50" : ""
                    }`}
                  >
                    <h4 className="font-semibold mb-3">{col}</h4>
                    <div className="space-y-3 min-h-[100px]">
                      {colTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white p-3 rounded-lg shadow-sm border cursor-pointer hover:bg-gray-50 transition-all ${
                                snapshot.isDragging ? "bg-blue-100" : ""
                              }`}
                            >
                              <p className="font-medium text-sm">{task.title}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                                <div className="flex items-center gap-1">

                                  {task.assignee}
                                </div>
                                <span>{task.due}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      );
    }

    if (activeView === "table") {
      return (
        <div className="overflow-x-auto bg-white rounded-lg border shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3">업무명</th>
              <th className="px-6 py-3">담당자</th>
              <th className="px-6 py-3">상태</th>
              <th className="px-6 py-3">기한</th>
            </tr>
            </thead>
            <tbody>
            {selectedProject.tasks.map((task) => (
              <tr key={task.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{task.title}</td>
                <td className="px-6 py-3">{task.assignee}</td>
                <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        task.status === "완료"
                          ? "bg-green-100 text-green-800"
                          : task.status === "진행 중"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {task.status}
                    </span>
                </td>
                <td className="px-6 py-3">{task.due}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="p-6 text-gray-400 text-center h-96 flex items-center justify-center">
        (선택된 뷰 표시)
      </div>
    );
  };

  return (
    <main className="flex flex-col h-screen bg-gray-100  md:ml-64">
      {/* 🔹 프로젝트 헤더 */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">{selectedProject.name}</h1>
          <p className="text-sm text-gray-500">{selectedProject.desc}</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">

            <span>{selectedProject.range}</span>
          </div>
          <div className="flex -space-x-2">
            {selectedProject.members.map((m, i) => (
              <div
                key={i}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs border-2 border-white"
              >
                {m}
              </div>
            ))}
          </div>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            + 새 할 일
          </button>
        </div>
      </header>

      {/* 🔹 프로젝트 선택 및 뷰 탭 */}
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="border rounded-md text-sm px-2 py-1"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <div className="flex space-x-2">
          {[
            ["kanban","칸반",  "칸반"],
            ["table","테이블",  "테이블"],
            ["gantt", "간트",  "간트"],
            ["calendar", "캘린더",  "캘린더"],
            ["database",  "DB","DB"],
          ].map(([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setActiveView(key)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm ${
                activeView === key
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
             {label}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 메인 콘텐츠 */}
      <section className="flex-1 overflow-y-auto p-4 ">{renderView()}</section>
    </main>
  );
}
