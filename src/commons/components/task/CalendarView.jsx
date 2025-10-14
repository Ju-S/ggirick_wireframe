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
        tasks.forEach(task => {
            const date = task.due;
            if (!tasksByDate[date]) tasksByDate[date] = [];
            tasksByDate[date].push(task);
        });

        return { year, month, daysInMonth, startDayOfWeek, tasksByDate };
    };

    const { year, month, daysInMonth, startDayOfWeek, tasksByDate } = getCalendarData();
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <div className="p-4">
            <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">{year}년 {monthNames[month]}</h3>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {days.map(day => (
                        <div key={day} className="text-center font-semibold text-sm text-gray-600 py-3 border-b-2">
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: startDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square"></div>
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const tasksOnDay = tasksByDate[dateStr] || [];
                        const isToday = day === new Date().getDate() && month === new Date().getMonth();

                        return (
                            <div
                                key={day}
                                className={`aspect-square border rounded-lg p-2 hover:bg-blue-50 transition-colors cursor-pointer ${
                                    isToday ? 'bg-blue-100 border-blue-500' : 'bg-white'
                                }`}
                            >
                                <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                                    {day}
                                </div>
                                <div className="space-y-1 overflow-hidden">
                                    {tasksOnDay.slice(0, 2).map(task => (
                                        <div
                                            key={task.id}
                                            className={`text-xs px-1.5 py-0.5 rounded truncate font-medium ${
                                                task.status === "완료"
                                                    ? "bg-green-100 text-green-800"
                                                    : task.status === "진행 중"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-gray-100 text-gray-700"
                                            }`}
                                            title={task.title}
                                        >
                                            {task.title}
                                        </div>
                                    ))}
                                    {tasksOnDay.length > 2 && (
                                        <div className="text-xs text-gray-500 font-medium pl-1">+{tasksOnDay.length - 2}개</div>
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
