import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen h-auto p-4 pt-20 md:ml-64">
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="h-16 rounded-lg md:h-24">
          <Card
            onClick={() => navigate("mail")}
            className="w-full h-full rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 "
          >
            <div className="grid grid-cols-2 gap-4">
              <span className="mt-4 text-sm text-gray-900 dark:text-white">읽지 않은 메일</span>
              <span className="text-2xl text-gray-900 dark:text-white">5</span>
            </div>
          </Card>
        </div>
        <div className="h-16 rounded-lg border-2 border-dashed border-gray-300 md:h-24 dark:border-gray-600"></div>
        <div className="h-16 rounded-lg border-2 border-dashed border-gray-300 md:h-24 dark:border-gray-600"></div>
        <div className="h-16 rounded-lg border-2 border-dashed border-gray-300 md:h-24 dark:border-gray-600"></div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
      </div>
      <div className="mb-2 grid grid-cols-3 gap-4">
        <div className="h-32 col-span-2 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600"></div>
        <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600"></div>
      </div>
    </main>
  );
}