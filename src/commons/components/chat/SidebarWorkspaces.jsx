import React from "react";

export default function SidebarWorkspaces() {
  return (
    <aside className="w-20 bg-gray-600 flex flex-col items-center py-4 text-white">
      <div className="font-bold text-lg mb-6">WS</div>
      <div className="flex flex-col space-y-4">
        <div className="w-10 h-10 bg-red-400 rounded-full flex items-center justify-center hover:bg-red-500 cursor-pointer">A</div>
        <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 cursor-pointer">B</div>
        <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center hover:bg-green-500 cursor-pointer">+</div>
      </div>
    </aside>
  );
}
