import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

export default function({ selectedProject, setProjects}){


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