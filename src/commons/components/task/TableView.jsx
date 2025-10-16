import TaskClickMenu from "./TaskClickMenu.jsx";
import { useState } from "react";

export default function TableView({ selectedProject, setProjects, projects }) {
  const [contextMenuTaskId, setContextMenuTaskId] = useState(null);

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg border border-base-300 shadow-sm relative">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-base-200 text-base-content/70 uppercase">
        <tr>
          <th className="px-6 py-3">업무명</th>
          <th className="px-6 py-3">담당자</th>
          <th className="px-6 py-3">상태</th>
          <th className="px-6 py-3">기한</th>
        </tr>
        </thead>

        <tbody>
        {selectedProject.tasks.map((task) => (
          <tr
            key={task.id}
            className="border-t border-base-300 hover:bg-base-200 transition-colors relative"
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenuTaskId(task.id);
            }}
          >
            <td className="px-6 py-3 text-base-content">{task.title}</td>
            <td className="px-6 py-3 text-base-content/90">{task.assignee}</td>
            <td className="px-6 py-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    task.status === "완료"
                      ? "bg-success text-success-content"
                      : task.status === "진행 중"
                        ? "bg-info text-info-content"
                        : "bg-neutral text-neutral-content"
                  }`}
                >
                  {task.status}
                </span>
            </td>
            <td className="px-6 py-3 text-base-content/80">{task.due}</td>
            <TaskClickMenu
              selectedProject={selectedProject}
              task={task}
              projects={projects}
              setProjects={setProjects}
              contextMenuTaskId={contextMenuTaskId}
              setContextMenuTaskId={setContextMenuTaskId}
            />
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
