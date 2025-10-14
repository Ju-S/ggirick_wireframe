export const DatabaseView = ({ selectedProject }) => {

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 text-xs uppercase">ID</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 text-xs uppercase">업무명</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 text-xs uppercase">담당자</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 text-xs uppercase">상태</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 text-xs uppercase">마감일</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 text-xs uppercase">프로젝트</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 text-xs uppercase">우선순위</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {selectedProject.tasks.map((task) => {
              const dueDate = new Date(task.due);
              const today = new Date();
              const isOverdue = dueDate < today && task.status !== "완료";

              return (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 font-mono text-xs text-gray-500 font-medium">{task.id}</td>
                  <td className="px-4 py-4 font-medium text-gray-800">{task.title}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs font-semibold">
                        {task.assignee.charAt(0)}
                      </div>
                      <span className="text-gray-700">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.status === "완료"
                            ? "bg-green-100 text-green-800"
                            : task.status === "진행 중"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-700"
                        }`}>
                          {task.status}
                        </span>
                  </td>
                  <td className="px-4 py-4">
                        <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-700'}`}>
                          {task.due}
                        </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{selectedProject.name}</td>
                  <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          isOverdue ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-700'
                        }`}>
                          {isOverdue ? '높음' : '보통'}
                        </span>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};