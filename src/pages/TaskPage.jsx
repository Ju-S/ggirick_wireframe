import { useEffect, useState } from "react";
import CalendarView from "../commons/components/task/CalendarView.jsx";
import KanbanView from "../commons/components/task/KanbanView.jsx";
import TableView from "../commons/components/task/TableView.jsx";
import { DatabaseView } from "../commons/components/task/DatabaseView.jsx";
import GanttView from "../commons/components/task/GantView.jsx";
import api from "../utils/api.js";

export default function TaskPage() {
  const [projects, setProjects] = useState([]);

  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [activeView, setActiveView] = useState("kanban");

  useEffect(() => {
    api.get("/project").then((e) => {
      setProjects(e.data);
      if (e.data.length > 0) {
        setSelectedProjectId(e.data[e.data.length-1].id);
      }
    });
  }, []);

  const selectedProject = projects.find((p) => String(p.id) === String(selectedProjectId));

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
    tasks: selectedProject?.tasks ?? [],
    projectName: selectedProject?.name ?? "",
    onTaskUpdate: handleTaskUpdate,
  };

  const renderView = () => {
    if (!selectedProject) return <p>프로젝트를 선택하세요</p>;
    switch (activeView) {
      case "kanban":
        return <KanbanView selectedProject={selectedProject} setProjects={setProjects} />;
      case "table":
        return <TableView selectedProject={selectedProject} />;
      case "calendar":
        return <CalendarView {...viewProps} />;
      case "database":
        return <DatabaseView selectedProject={selectedProject} />;
      case "gantt":
        return <GanttView {...viewProps} />;
      default:
        return (
          <div className="p-6 text-gray-400 text-center h-96 flex items-center justify-center">
            (선택된 뷰 표시)
          </div>
        );
    }
  };

  if (!selectedProject) return <div className="p-6">프로젝트를 선택하세요</div>;

  return (
    <main className="flex flex-col h-screen bg-base-100 pt-20 md:ml-64 transition-colors duration-300">
      {/* 🔹 프로젝트 헤더 */}
      <header className="bg-primary text-primary-content border-b border-base-300 shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{selectedProject.name}</h1>
            <p className="text-sm opacity-80 mt-1">{selectedProject.description}</p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">{selectedProject.range}</span>
            </div>
            <div className="flex -space-x-2">
              {selectedProject.members.map((m, i) => (
                <div
                  key={i}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content text-xs font-semibold border-2 border-base-100 shadow-sm"
                >
                  {m}
                </div>
              ))}
            </div>
            <button className="px-4 py-2 bg-secondary text-secondary-content rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors shadow-sm">
              + 새 할 일
            </button>
          </div>
        </div>
      </header>

      {/* 🔹 프로젝트 선택 및 뷰 탭 */}
      <div className="p-4 bg-base-100 border-b border-base-300 flex items-center justify-between">
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(Number(e.target.value))}
          className="border border-base-300 bg-base-100 rounded-md text-sm px-2 py-1"
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                activeView === key
                  ? "bg-accent text-accent-content shadow-md"
                  : "bg-base-100 hover:bg-base-200 border border-base-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 메인 콘텐츠 */}
      <section className="flex-1 overflow-y-auto p-4">{renderView()}</section>
    </main>
  );
}
