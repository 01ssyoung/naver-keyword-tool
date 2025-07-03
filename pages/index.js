import { useState } from 'react';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [onlyMain, setOnlyMain] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch(`/api/keyword-analysis?keyword=${encodeURIComponent(keyword)}&onlyMain=${onlyMain}`);
    const data = await res.json();
    setResults(data.keywordList || []);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔍 네이버 키워드 검색량 도구</h1>
      <div className="flex items-center gap-2 mb-4">
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)}
          placeholder="예: 인공지능 마케팅" className="border p-2 flex-1 rounded" />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">검색</button>
      </div>
      <label className="flex items-center gap-2 text-sm mb-2">
        <input type="checkbox" checked={onlyMain} onChange={() => setOnlyMain(!onlyMain)} /> 핵심 키워드만 보기
      </label>

      {loading ? <p>불러오는 중...</p> : (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">키워드</th>
              <th className="border p-2">PC 검색량</th>
              <th className="border p-2">모바일 검색량</th>
              <th className="border p-2">경쟁도</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-2">{item.relKeyword}</td>
                <td className="border p-2 text-right">{item.monthlyPcQcCnt?.toLocaleString() || '-'}</td>
                <td className="border p-2 text-right">{item.monthlyMobileQcCnt?.toLocaleString() || '-'}</td>
                <td className="border p-2">{item.compIdx || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}