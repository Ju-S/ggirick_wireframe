import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import api from "../../../utils/api.js";
import { useState } from "react";
import TaskClickMenu from "./TaskClickMenu.jsx";

export default function TaskKanban({projects, selectedProject, setProjects }) {
  const getColumns = (tasks) => ({
    "할 일": tasks.filter((t) => t.status === "할 일"),
    "진행 중": tasks.filter((t) => t.status === "진행 중"),
    "완료": tasks.filter((t) => t.status === "완료"),
  });

  const updateTaskStatus = async (taskId, status) => {
    const res = await api.patch(`/project/task/${taskId}/status`, { status });
    if (res.data.result) console.log("업데이트 성공");
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    const updatedTasks = selectedProject.tasks.map((task) =>
      String(task.id) === result.draggableId
        ? { ...task, status: destination.droppableId }
        : task
    );

    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id ? { ...p, tasks: updatedTasks } : p
      )
    );

    try {
      const movedTask = updatedTasks.find((t) => String(t.id) === result.draggableId);
      await updateTaskStatus(movedTask.id, movedTask.status);
    } catch (error) {
      console.error("업데이트 실패:", error);
      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id ? { ...p, tasks: selectedProject.tasks } : p
        )
      );
    }
  };

  const [contextMenuTaskId, setContextMenuTaskId] = useState(null);


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
                className={`border-base-300 rounded-lg border p-4 transition-colors ${snapshot.isDraggingOver ? "bg-primary/10" : "bg-base-200"}`}
              >
                <h4 className="text-primary mb-3 font-semibold">{col}</h4>

                <div className="min-h-[100px] space-y-3">
                  {colTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`border-base-300 relative cursor-pointer rounded-lg border p-3 shadow-sm transition-all ${snapshot.isDragging ? "bg-primary text-primary-content" : "bg-base-100 hover:bg-primary/10"}`}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setContextMenuTaskId(task.id);
                          }}
                        >
                          <p className="text-sm font-medium">{task.title}</p>
                          <div className="text-base-content/70 mt-1 flex items-center justify-between text-xs">
                            <div>    {
                              selectedProject.members.find(m => m.employee_Id === task.assignee)?.name
                              || task.assignee // 혹시 매칭 안 되면 employee_id 그대로 보여줌
                            }</div>
                            <span>{task.due}</span>
                          </div>

                          {/* 항목 내 우클릭 메뉴 */}
                          <TaskClickMenu
                            selectedProject={selectedProject}
                            task={task}
                            projects = {projects}
                            setProjects={setProjects}
                            contextMenuTaskId={contextMenuTaskId}
                            setContextMenuTaskId={setContextMenuTaskId}
                          />
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
