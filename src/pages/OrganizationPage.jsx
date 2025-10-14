import { useState } from "react";
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import CompanyTimeline from "../commons/components/organization/CompanyTimeline.jsx";
export default function OrganizationPage() {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['1', '2', '3']));

  // 샘플 조직도 데이터
  const orgData = {
    id: '1',
    name: '김대표',
    position: '대표이사',
    department: 'CEO',
    image: 'https://ui-avatars.com/api/?name=김대표&background=3b82f6&color=fff&size=128',
    children: [
      {
        id: '2',
        name: '이부장',
        position: '부사장',
        department: 'CFO',
        image: 'https://ui-avatars.com/api/?name=이부장&background=8b5cf6&color=fff&size=128',
        children: [
          {
            id: '4',
            name: '박팀장',
            position: '팀장',
            department: '개발팀',
            image: 'https://ui-avatars.com/api/?name=박팀장&background=ec4899&color=fff&size=128',
            children: [
              {
                id: '7',
                name: 'Alice',
                position: '대리',
                department: '프론트엔드',
                image: 'https://ui-avatars.com/api/?name=Alice&background=10b981&color=fff&size=128',
                children: []
              },
              {
                id: '8',
                name: '정사원',
                position: '사원',
                department: '백엔드',
                image: 'https://ui-avatars.com/api/?name=정사원&background=f59e0b&color=fff&size=128',
                children: []
              }
            ]
          },
          {
            id: '5',
            name: '강팀장',
            position: '팀장',
            department: '디자인팀',
            image: 'https://ui-avatars.com/api/?name=강팀장&background=06b6d4&color=fff&size=128',
            children: [
              {
                id: '9',
                name: '윤사원',
                position: '사원',
                department: 'UI/UX',
                image: 'https://ui-avatars.com/api/?name=윤사원&background=84cc16&color=fff&size=128',
                children: []
              }
            ]
          }
        ]
      },
      {
        id: '3',
        name: '조이사',
        position: '이사',
        department: 'UFO',
        image: 'https://ui-avatars.com/api/?name=조이사&background=ef4444&color=fff&size=128',
        children: [
          {
            id: '6',
            name: '송팀장',
            position: '팀장',
            department: '재무팀',
            image: 'https://ui-avatars.com/api/?name=송팀장&background=f97316&color=fff&size=128',
            children: [
              {
                id: '10',
                name: '한사원',
                position: '사원',
                department: '회계',
                image: 'https://ui-avatars.com/api/?name=한사원&background=14b8a6&color=fff&size=128',
                children: []
              }
            ]
          }
        ]
      }
    ]
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // 노드의 총 리프 개수를 계산 (확장된 노드만)
  const countLeaves = (node) => {
    if (!node.children || node.children.length === 0 || !expandedNodes.has(node.id)) {
      return 1;
    }
    return node.children.reduce((sum, child) => sum + countLeaves(child), 0);
  };

  const OrgNode = ({ node, level = 0 }) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="flex flex-col items-center">
        {/* 노드 카드 */}
        <div className="relative">
          <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-4 w-64 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4">
              {/* 프로필 이미지 */}
              <div className="flex-shrink-0">
                <img
                  src={node.image}
                  alt={node.name}
                  className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
              </div>

              {/* 정보 */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {node.name}
                </h3>
                <p className="text-sm font-medium text-blue-600">
                  {node.position}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {node.department}
                </p>
              </div>
            </div>

            {/* 확장/축소 버튼 */}
            {hasChildren && (
              <button
                onClick={() => toggleNode(node.id)}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 shadow-md transition-colors z-10"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* 연결선과 하위 노드들 */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col items-center mt-8">
            {/* 수직 연결선 */}
            <div className="w-0.5 h-8 bg-gray-300"></div>

            {/* 하위 노드 컨테이너 */}
            <div className="flex gap-8 relative">
              {/* 수평 연결선 - 첫 번째 자식의 중심부터 마지막 자식의 중심까지 */}
              {node.children.length > 1 && (
                <div
                  className="absolute top-0 h-0.5 bg-gray-300"
                  style={{
                    left: `${(countLeaves(node.children[0]) * 288) / 2}px`,
                    right: `${(countLeaves(node.children[node.children.length - 1]) * 288) / 2}px`
                  }}
                ></div>
              )}

              {node.children.map((child, index) => (
                <div key={child.id} className="flex flex-col items-center">
                  {/* 개별 수직 연결선 */}
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                  <OrgNode node={child} level={level + 1} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen md:ml-64 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 pt-20">

      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">조직도</h1>
              <p className="text-gray-600">우리 회사의 조직 구조</p>
            </div>
          </div>
        </div>

        {/* 조직도 트리 */}
        <div className="bg-white rounded-lg shadow-md p-8 overflow-x-auto">
          <div className="inline-block min-w-full">
            <OrgNode node={orgData} />
          </div>
        </div>

        {/* 범례 */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">안내</h3>
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <ChevronDown className="w-4 h-4 text-blue-500" />
              <span>클릭하여 하위 조직 펼치기/접기</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-gray-300"></div>
              <span>시스템 관리자</span>
            </div>
          </div>


        </div>
        <CompanyTimeline/>

      </div>
    </div>
  );

}
