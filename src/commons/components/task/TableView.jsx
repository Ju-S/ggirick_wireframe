export default function TableView({selectedProject}){
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