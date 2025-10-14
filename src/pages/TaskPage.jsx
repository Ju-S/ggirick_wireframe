import { useState } from "react";
import  CalendarView  from "../commons/components/task/CalendarView.jsx";
import KanbanView from "../commons/components/task/KanbanView.jsx";
import TableView from "../commons/components/task/TableView.jsx";
import { DatabaseView } from "../commons/components/task/DatabaseView.jsx";
import GanttView from "../commons/components/task/GantView.jsx";


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
  const handleTaskUpdate = (taskId, updates) => {
    const updatedTasks = selectedProject.tasks.map((task) =>
      task.id === taskId ? { ...task, ...updates } : task
    );

    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id ? { ...p, tasks: updatedTasks } : p
      )
    );
  };

  const viewProps = {
    tasks: selectedProject.tasks,
    projectName: selectedProject.name,
    onTaskUpdate: handleTaskUpdate,
  };

  const renderView = () => {
    if (activeView === "kanban") {
      return <KanbanView selectedProject={selectedProject} setProjects={setProjects}/>
    }

    if (activeView === "table") {
      return <TableView selectedProject={selectedProject} />
    }
    if(activeView ==="calendar"){

      return <CalendarView {...viewProps}/>
    }
    if(activeView ==="database"){
      return <DatabaseView selectedProject={selectedProject} />
    }
    if(activeView ==="gantt"){
      return <GanttView {...viewProps} />
    }

    return (
      <div className="p-6 text-gray-400 text-center h-96 flex items-center justify-center">
        (선택된 뷰 표시)
      </div>
    );
  };

  return (
    <main className="flex flex-col h-screen bg-gray-100 pt-20 md:ml-64">
      {/* 🔹 프로젝트 헤더 */}
      <header className="bg-white border-b shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{selectedProject.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{selectedProject.desc}</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">{selectedProject.range}</span>
            </div>
            <div className="flex -space-x-2">
              {selectedProject.members.map((m, i) => (
                <div
                  key={i}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-semibold border-2 border-white shadow-sm"
                >
                  {m}
                </div>
              ))}
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              + 새 할 일
            </button>
          </div>
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
        <div className="flex flex-wrap gap-2">
          {[
            ["kanban", "칸반"],
            ["table", "테이블"],
            ["gantt", "간트"],
            ["calendar", "캘린더"],
            ["database", "DB"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveView(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === key
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 border border-gray-200"
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
