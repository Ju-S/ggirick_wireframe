import React from "react";
import "flowbite";
import { Button } from "flowbite-react";

export default function Contacts() {
  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {/* ===== 왼쪽 사이드바 ===== */}
      <aside className="w-72 border-r bg-white flex flex-col">
        <div className="p-4 font-semibold text-lg border-b">주소록</div>
        <div className="p-3">
          <input
            type="text"
            className="w-full p-2 border rounded-md text-sm"
            placeholder="연락처 검색..."
          />
        </div>

        <div className="overflow-y-auto">
          {[
            { name: "김민수", dept: "개발팀", email: "minsu.kim@company.com" },
            { name: "박지영", dept: "마케팅팀", email: "jiyoung.park@company.com" },
            { name: "이준호", dept: "개발팀", email: "junho.lee@company.com" },
            { name: "최수진", dept: "인사팀", email: "sujin.choi@company.com" },
            { name: "정태윤", dept: "영업팀", email: "taeyoon.jung@company.com" },
            { name: "강민지", dept: "디자인팀", email: "minji.kang@company.com" },
            { name: "윤서준", dept: "재무팀", email: "seojun.yoon@company.com" },
          ].map((person, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer border-b"
            >
              <div className="w-10 h-10 bg-gray-800 text-white flex items-center justify-center rounded-full">
                {person.name[0]}
              </div>
              <div className="text-sm">
                <div className="font-semibold">{person.name}</div>
                <div className="text-gray-500 text-xs">{person.email}</div>
                <div className="text-gray-400 text-xs">{person.dept}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ===== 오른쪽 상세 정보 ===== */}
      <main className=" p-10 overflow-y-auto bg-gray-50 flex flex-col flex-1">
        {/* 상단 프로필 */}
        <div className="flex items-center gap-8">
          <div className="w-24 h-24 bg-gray-800 text-white flex items-center justify-center text-4xl rounded-full">
            김
          </div>
          <div>
            <h2 className="text-3xl font-semibold">김민수</h2>
            <p className="text-gray-600 mt-1 text-base">개발팀 · 팀장</p>
            <div className="flex gap-3 mt-4">
              <Button size="sm" color="dark">
                ✉ 이메일 보내기
              </Button>
              <Button size="sm" color="gray">
                ☎ 전화하기
              </Button>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        {/* 연락처 정보 */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border mb-8 w-full">
          <h3 className="font-semibold mb-4 text-gray-700 text-lg">연락처 정보</h3>
          <ul className="text-base space-y-3">
            <li>📧 이메일: minsu.kim@company.com</li>
            <li>☎ 전화번호: 02-1234-5678</li>
            <li>📱 휴대전화: 010-1234-5678</li>
            <li>🔢 내선번호: 1234</li>
          </ul>
        </section>

        {/* 조직 정보 */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border w-full">
          <h3 className="font-semibold mb-4 text-gray-700 text-lg">조직 정보</h3>
          <ul className="text-base space-y-3">
            <li>🏢 부서: 개발팀</li>
            <li>💼 직책: 팀장</li>
            <li>📍 주소: 서울시 강남구 테헤란로 123</li>
          </ul>
        </section>
      </main>
    </div>
  );
}