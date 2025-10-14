import { Card } from "flowbite-react";
import { useState } from "react";

export default function WorkStatusCard() {
  const [isWorking, setIsWorking] = useState(false);

  const handleToggle = () => setIsWorking(!isWorking);

  return (
    <Card className="flex h-32 flex-col items-center justify-center rounded-lg bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
      <div className="flex items-center justify-center gap-2">
        <div className="text-base whitespace-nowrap text-gray-400 dark:text-white">
          출근 상태
        </div>
        <button
          onClick={handleToggle}
          className={`rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-300
            ${isWorking ? "bg-red-500 text-white" : "bg-black text-white hover:bg-gray-700"}`}
        >
          {isWorking ? "퇴근" : "출근"}
        </button>
      </div>

      <div
        className={`ps-2 pe-2 text-2xl transition-colors duration-300 ${
          isWorking
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-900 dark:text-white"
        }`}
      >
        {isWorking ? "근무 중" : "퇴근"}
      </div>
    </Card>
  );
}