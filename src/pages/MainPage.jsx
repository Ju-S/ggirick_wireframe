import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <main className="h-auto min-h-screen p-4 pt-20 md:ml-64">
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="h-16 rounded-lg md:h-24">
          <Card
            onClick={() => navigate("mail")}
            className="h-full w-full rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-1">
                <span className="text-sm text-gray-900 dark:text-white">
                  읽지 않은 메일
                </span>
                <span className="mt-2 text-2xl text-gray-900 dark:text-white">
                  5
                </span>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-mail-icon lucide-mail h-6 w-6 text-blue-800 dark:text-blue-600"
                  >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="h-16 rounded-lg md:h-24">
          <Card
            onClick={() => navigate("calendar")}
            className="h-full w-full rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-1">
                <span className="text-sm text-gray-900 dark:text-white">
                  오늘 일정
                </span>
                <span className="mt-2 text-2xl text-gray-900 dark:text-white">
                  3
                </span>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-calendar-icon lucide-calendar h-6 w-6 text-green-800 dark:text-green-600"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="h-16 rounded-lg md:h-24">
          <Card
            onClick={() => navigate("approval")}
            className="h-full w-full rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-1">
                <span className="text-sm text-gray-900 dark:text-white">
                  대기 중인 결재
                </span>
                <span className="mt-2 text-2xl text-gray-900 dark:text-white">
                  2
                </span>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-signature-icon lucide-signature h-6 w-6 text-orange-800 dark:text-orange-600"
                  >
                    <path d="m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284" />
                    <path d="M3 21h18" />
                  </svg>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="h-16 rounded-lg md:h-24">
          <Card
            onClick={() => navigate("chat")}
            className="h-full w-full rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-1">
                <span className="text-sm text-gray-900 dark:text-white">
                  새 메시지
                </span>
                <span className="mt-2 text-2xl text-gray-900 dark:text-white">
                  12
                </span>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-message-square-more-icon lucide-message-square-more h-6 w-6 text-purple-800 dark:text-purple-600"
                  >
                    <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
                    <path d="M12 11h.01" />
                    <path d="M16 11h.01" />
                    <path d="M8 11h.01" />
                  </svg>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="h-48 rounded-lg md:h-80">
          <Card className="h-full w-full rounded-lg dark:border-gray-600 dark:bg-gray-800">
            <div className="flex items-start justify-start">
              <div className="flex w-full flex-col gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-calendar-icon text-black-800 h-6 w-6 dark:text-white"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  <span className="text-m text-gray-900 dark:text-white">
                    오늘의 일정
                  </span>
                </div>
                <Card
                  onClick={() => navigate("chat")}
                  className="h-14 w-full rounded-lg shadow-none hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  일정 1
                </Card>
                <Card
                  onClick={() => navigate("chat")}
                  className="h-14 w-full rounded-lg shadow-none hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  일정 2
                </Card>
                <Card
                  onClick={() => navigate("chat")}
                  className="h-14 w-full rounded-lg shadow-none hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  일정 3
                </Card>
                <button
                  onClick={() => navigate("calendar")}
                  className="h-8 w-full rounded-lg border-1 border-gray-200 bg-white text-sm hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  전체 일정 보기
                </button>
              </div>
            </div>
          </Card>
        </div>
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-80 dark:border-gray-600"></div>
      </div>
      <div className="mb-2 grid grid-cols-3 gap-4">
        <div className="col-span-2 h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600"></div>
        <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600"></div>
      </div>
    </main>
  );
}
