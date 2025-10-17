import { useState } from "react";
import api from "../../../utils/api.js";
import TaskDrawer from "./TaskDrawer.jsx";
import TaskModal from "./TaskModal.jsx";

export default function TaskClickMenu({
                                        task,projects,

                                        setProjects,
                                        selectedProject,
                                        contextMenuTaskId,
                                        setContextMenuTaskId
                                      }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (taskId) => {
    api.delete(`/project/task/${taskId}`)
      .then(() => {
        alert("삭제 완료!");
        setContextMenuTaskId(null);
        setProjects(prev =>
          prev.map(p =>
            p.id === selectedProject.id
              ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) }
              : p
          )
        );
      })
      .catch(err => console.error(err));
  };

  const handleEdit = () => {
    setSelectedTask(task); // 수정할 task 선택
    setIsDrawerOpen(true); // drawer 열기
    setContextMenuTaskId(null); // 메뉴 닫기
  };

  const handleDetail = () => {
    setSelectedTask(task);
    setIsModalOpen(true);
    setContextMenuTaskId(null);
  };

  return (
    <>
      {contextMenuTaskId === task.id && (
        <div className="bg-base-100 border-base-300 absolute top-1 right-1 z-10 flex flex-col rounded border p-1 shadow-md">
          <button className="btn btn-xs btn-primary mb-1"
                  onClick={handleDetail}
          >
            상세보기
          </button>
          <button
            className="btn btn-xs btn-secondary mb-1"
            onClick={handleEdit} // 수정 버튼
          >
            수정
          </button>
          <button
            className="btn btn-xs btn-accent mb-1"
            onClick={() => handleDelete(task.id)}
          >
            삭제
          </button>
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => setContextMenuTaskId(null)}
          >
            취소
          </button>
        </div>
      )}
      {isModalOpen && (
        <TaskModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={selectedTask}
        />
      )}
      {/* TaskDrawer */}
      {isDrawerOpen && (
        <TaskDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          projects={projects} // 필요한 경우 전체 프로젝트
          setProjects={setProjects}
          selectedTask={selectedTask}
          mode="edit"// drawer에 전달
        />
      )}
    </>
  );
}
