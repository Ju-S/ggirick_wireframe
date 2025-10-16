export const DatabaseView = ({ selectedProject }) => {
  return (
    <div className="p-4">
      <div className="bg-base-100 rounded-lg border border-base-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            {/* ✅ 테이블 헤더 */}
            <thead className="bg-base-200 border-b border-base-300">
            <tr>
              {["ID", "업무명", "담당자", "상태", "마감일", "프로젝트", "우선순위"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-semibold text-base-content/70 text-xs uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
            </thead>

            {/* ✅ 테이블 본문 */}
            <tbody className="divide-y divide-base-300">
            {selectedProject.tasks.map((task) => {
              const dueDate = new Date(task.due);
              const today = new Date();
              const isOverdue = dueDate < today && task.status !== "완료";

              return (
                <tr
                  key={task.id}
                  className="hover:bg-base-200 transition-colors"
                >
                  <td className="px-4 py-4 font-mono text-xs text-base-content/60 font-medium">
                    {task.id}
                  </td>

                  <td className="px-4 py-4 font-medium text-base-content">
                    {task.title}
                  </td>

                  {/* ✅ 담당자 */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-primary-content text-xs font-semibold">
                        { selectedProject.members.find(m => m.employee_Id === task.assignee)?.role_name.charAt(0)
                          || task.assignee.charAt(0)
                        }
                      </div>
                      <span className="text-base-content/80">{ selectedProject.members.find(m => m.employee_Id === task.assignee)?.name
                        || task.assignee
                         }</span>
                    </div>
                  </td>

                  {/* ✅ 상태 */}
                  <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                  {/* ✅ 마감일 */}
                  <td className="px-4 py-4">
                      <span
                        className={`font-medium ${
                          isOverdue ? "text-error" : "text-base-content/80"
                        }`}
                      >
                        {task.due}
                      </span>
                  </td>

                  {/* ✅ 프로젝트명 */}
                  <td className="px-4 py-4 text-base-content/70">
                    {selectedProject.name}
                  </td>

                  {/* ✅ 우선순위 */}
                  <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          isOverdue
                            ? "bg-error text-error-content"
                            : "bg-success text-success-content"
                        }`}
                      >
                       {task.priority}
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
