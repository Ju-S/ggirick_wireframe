export default function CalendarView({ tasks }) {
  const getCalendarData = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const tasksByDate = {};
    tasks.forEach((task) => {
      const date = task.due;
      if (!tasksByDate[date]) tasksByDate[date] = [];
      tasksByDate[date].push(task);
    });

    return { year, month, daysInMonth, startDayOfWeek, tasksByDate };
  };

  const { year, month, daysInMonth, startDayOfWeek, tasksByDate } = getCalendarData();
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="p-4">
      <div className="bg-base-100 rounded-lg border border-base-300 shadow-sm p-6">
        {/* ✅ 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-base-content">
            {year}년 {monthNames[month]}
          </h3>
        </div>

        {/* ✅ 달력 */}
        <div className="grid grid-cols-7 gap-2">
          {/* 요일 헤더 */}
          {days.map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-sm text-base-content/70 py-3 border-b-2 border-base-300"
            >
              {day}
            </div>
          ))}

          {/* 빈 칸 채우기 */}
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square"></div>
          ))}

          {/* 날짜 출력 */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const tasksOnDay = tasksByDate[dateStr] || [];
            const today = new Date();
            const isToday = day === today.getDate() && month === today.getMonth();

            return (
              <div
                key={day}
                className={`aspect-square border border-base-300 rounded-lg p-2 cursor-pointer transition-all duration-200 
                hover:bg-base-200 ${
                  isToday ? "bg-info/20 border-info text-info-content" : "bg-base-100"
                }`}
              >
                <div
                  className={`text-sm font-semibold mb-1 ${
                    isToday ? "text-info font-bold" : "text-base-content"
                  }`}
                >
                  {day}
                </div>

                {/* 할 일 목록 */}
                <div className="space-y-1 overflow-hidden">
                  {tasksOnDay.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      className={`text-xs px-1.5 py-0.5 rounded truncate font-medium ${
                        task.status === "완료"
                          ? "bg-success text-success-content"
                          : task.status === "진행 중"
                            ? "bg-info text-info-content"
                            : "bg-neutral text-neutral-content"
                      }`}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}

                  {tasksOnDay.length > 2 && (
                    <div className="text-xs text-base-content/60 font-medium pl-1">
                      +{tasksOnDay.length - 2}개
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
