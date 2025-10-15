import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import api from "../../../utils/api.js";

export default function TaskKanban({ selectedProject, setProjects }) {
  const getColumns = (tasks) => ({
    "할 일": tasks.filter((t) => t.status === "할 일"),
    "진행 중": tasks.filter((t) => t.status === "진행 중"),
    "완료": tasks.filter((t) => t.status === "완료"),
  });


  const updateTaskStatus = async (taskId, status) => {
    const res = await api.patch(`/project/task/${taskId}`, { "status":status});
    if(res.data.result) {
      console.log("업데이트 성공");
    }
  }

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
      // 성공하면 그대로 두고, 필요시 추가 알림 가능
    } catch (error) {
      console.error("업데이트 실패:", error);
      // 실패 시 UI 롤백
      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id ? { ...p, tasks: selectedProject.tasks } : p
        )
      );
    }
  };

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
                className={`rounded-lg border border-base-300 p-4 transition-colors 
                  ${snapshot.isDraggingOver ? "bg-primary/10" : "bg-base-200"}`}
              >
                <h4 className="mb-3 font-semibold text-primary">{col}</h4>

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
                          className={`cursor-pointer rounded-lg border border-base-300 p-3 shadow-sm transition-all
                            ${snapshot.isDragging
                            ? "bg-primary text-primary-content"
                            : "bg-base-100 hover:bg-primary/10"}`}
                        >
                          <p className="text-sm font-medium">{task.title}</p>
                          <div className="mt-1 flex items-center justify-between text-xs text-base-content/70">
                            <div>{task.assignee}</div>
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
