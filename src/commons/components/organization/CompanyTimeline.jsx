export default function CompanyTimeline() {
  const steps = [
    {
      title: "회사 설립",
      date: "2018년 3월",
      description: "서울 본사 설립 및 그룹웨어 개발팀",
    },
    {
      title: "1차 제품 출시",
      date: "2019년 10월",
      description: "업무 관리 및 전자결재 기능을 포함한 그룹웨어 1.0 출시",
    },
    {
      title: "클라우드 전환",
      date: "2021년 5월",
      description: "온프레미스 버전에서 클라우드 SaaS 서비스로 전환",
    },
    {
      title: "모바일 앱 출시",
      date: "2022년 9월",
      description: "iOS / Android용 그룹웨어 앱 런칭",
    },
    {
      title: "AI 어시스턴트 도입",
      date: "2024년 6월",
      description: "AI 기반 일정 추천 및 문서 자동 요약 기능 추가",
    },
  ];

  return (

    <div className="mt-6 bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-700 mb-2 dark:text-white">회사 연혁</h3>
      <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-white">
        <ol className="items-center sm:flex ">
          {steps.map((step, index) => (
            <li key={index} className="relative mb-6 sm:mb-0">
              {/* 아이콘 + 연결선 */}
              <div className="flex items-center">
                <div className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 ring-0 ring-white sm:ring-8 dark:bg-blue-900 dark:ring-gray-900">
                  <svg
                    className="h-2.5 w-2.5 text-blue-800 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden h-0.5 w-full bg-gray-200 sm:flex dark:bg-gray-700"></div>
                )}
              </div>

              {/* 내용 */}
              <div className="mt-3 sm:pe-8">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <time className="mb-2 block text-sm leading-none font-normal text-gray-400 dark:text-gray-500">
                  {step.date}
                </time>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>


  );
}