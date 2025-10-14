import React from "react";
import { Link } from "react-router-dom";

export default function SidebarChannels() {
    return (
      <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold text-gray-700">
            개발자 워크스페이스
          </h2>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2">
          <h3 className="mb-2 text-xs text-gray-500 uppercase">Channels</h3>
          <ul className="space-y-1">
            <li className=" rounded px-3 py-2 hover:bg-gray-100">
              <div className="cursor-pointer flex items-center justify-between">
                <span># general</span>
             <Link to="/ggirick_wireframe/videomeeting">
               <button
                 type="button"
                 className=" cursor-pointer rounded-full   bg-gray-500 px-3 py-2 text-center text-xs font-medium text-white focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
               >
                 화상회의
               </button>
             </Link>
              </div>
            </li>
            <li className=" rounded px-3 py-2 hover:bg-gray-100">
              <div className="cursor-pointer flex items-center justify-between">
                <span># random</span>
                <button
                  type="button"
                  className=" cursor-pointer rounded-full  bg-gray-500 px-3 py-2 text-center text-xs font-medium text-white focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  화상회의
                </button>
              </div>
            </li>
            <li className=" rounded px-3 py-2 hover:bg-gray-100">
              <div className="cursor-pointer flex items-center justify-between">
                <span># dev</span>
                <button
                  type="button"
                  className=" cursor-pointer rounded-full  bg-gray-500 px-3 py-2 text-center text-xs font-medium text-white focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  화상회의
                </button>
              </div>
            </li>
          </ul>

          <h3 className="mt-4 mb-2 text-xs text-gray-500 uppercase">
            Direct Messages
          </h3>
          <ul className="space-y-1">
            <li className="cursor-pointer rounded px-3 py-2 hover:bg-gray-100">
              @ Alice
            </li>
            <li className="cursor-pointer rounded px-3 py-2 hover:bg-gray-100">
              @ Bob
            </li>
          </ul>
        </nav>
      </aside>
    );
}
