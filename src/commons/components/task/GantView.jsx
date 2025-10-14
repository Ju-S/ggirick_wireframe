export default function GanttView({ tasks }) {
  const getGanttData = (tasks) => {
    return tasks.map(task => {
      const dueDate = new Date(task.due);
      const today = new Date();
      const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      return { ...task, daysLeft: diffDays };
    });
  };

  const ganttTasks = getGanttData(tasks);

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6 text-gray-800">간트 차트</h3>
        <div className="space-y-4">
          {ganttTasks.map((task) => {
            const progress = task.status === "완료" ? 100 : task.status === "진행 중" ? 50 : 0;
            const isOverdue = task.daysLeft < 0;
            const isUrgent = task.daysLeft >= 0 && task.daysLeft < 3;

            return (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{task.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{task.assignee}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm text-gray-600 mb-1">{task.due}</p>
                    <p className={`text-sm font-semibold ${
                      isOverdue ? 'text-red-600' : isUrgent ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {isOverdue ? `${Math.abs(task.daysLeft)}일 지연` : `D-${task.daysLeft}`}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      progress === 100 ? 'bg-green-500' : progress === 50 ? 'bg-blue-500' : 'bg-gray-400'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">{task.status}</span>
                  <span className="text-xs font-medium text-gray-700">{progress}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}