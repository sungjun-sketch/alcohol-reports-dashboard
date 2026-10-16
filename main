'use client';

import { useState } from 'react';

interface TestTarget {
  id: string;
  receiveDate: string;
  materialCode: string;
  materialName: string;
  vendor: string;
  quantity: number;
  status: '선접수' | '진행중' | '출하완료';
}

const mockData: TestTarget[] = [
  { id: '1', receiveDate: '2023-09-21', materialCode: '2CS066770', materialName: '하드 픽셀7프로 패럴랙스 매트블랙', vendor: '영광정공(주)', quantity: 500, status: '선접수' },
  { id: '2', receiveDate: '2023-09-21', materialCode: '2CS076950', materialName: '하드 아이폰14프로 울하맥핏 제로원', vendor: '주식회사 대성하이텍', quantity: 445, status: '진행중' },
  { id: '3', receiveDate: '2023-09-21', materialCode: '2CS017300', materialName: 'MULT 갤S20+5G/S20+ 터프아머 건메탈', vendor: '주식회사 듀센 코리아', quantity: 1000, status: '출하완료' },
  { id: '4', receiveDate: '2023-09-21', materialCode: '2CS047960', materialName: '하드 아이폰13 씬핏 블랙', vendor: '주식회사 씨에스피', quantity: 1000, status: '선접수' },
];

export default function Dashboard() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === mockData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockData.map((item) => item.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">알코올러빙 시험 관리 대장</h1>
            <p className="text-sm text-gray-500 mt-1">시험 대상 품목을 확인하고 성적서를 작성하세요.</p>
          </div>
          <button 
            disabled={selectedIds.length === 0}
            className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
              selectedIds.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            성적서 작성하기 ({selectedIds.length})
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th scope="col" className="p-4 w-10">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={selectedIds.length === mockData.length && mockData.length > 0}
                      onChange={toggleAll}
                    />
                  </th>
                  <th scope="col" className="px-6 py-4">입고일</th>
                  <th scope="col" className="px-6 py-4">자재코드</th>
                  <th scope="col" className="px-6 py-4">자재명</th>
                  <th scope="col" className="px-6 py-4">공급업체</th>
                  <th scope="col" className="px-6 py-4">수량</th>
                  <th scope="col" className="px-6 py-4">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        checked={selectedIds.includes(row.id)}
                        onChange={() => toggleSelection(row.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.receiveDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.materialCode}</td>
                    <td className="px-6 py-4 text-gray-700">{row.materialName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.vendor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.quantity.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        row.status === '출하완료' ? 'bg-green-100 text-green-800' :
                        row.status === '진행중' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
