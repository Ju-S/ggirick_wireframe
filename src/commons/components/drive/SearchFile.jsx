import React, { useState } from "react";

const SearchFile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("파일 종류");
  const [query, setQuery] = useState("");

  const categories = ["all", ".img",".doc", ".pdf", ".xlsx", ".pptx"];

  const handleSelect = (option) => {
    setCategory(option);
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("검색어:", query);
    console.log("카테고리:", category);
    // 👉 여기에 검색 로직 (예: API 호출) 추가 가능
  };

  return (
    <form className="max-w-lg mx-auto w-full" onSubmit={handleSubmit}>
      <div className="flex relative">
        {/* 카테고리 버튼 */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
          {category}
          <svg
            className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {categories.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 검색 입력창 */}
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="원하는 파일의 종류별로 검색하세요..."
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gray-700 rounded-e-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchFile;