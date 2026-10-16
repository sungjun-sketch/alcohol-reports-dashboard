import Link from 'next/link'

const dummy = [
  { id: '1', reportNo: 'RPT-2026-001', client: 'Client A', status: 'Approved', date: '2026-10-15' },
  { id: '2', reportNo: 'RPT-2026-002', client: 'Client B', status: 'Draft', date: '2026-10-14' }
]

export default function ReportsPage(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>
      <div className="mb-4">
        <Link href="/generate"><a className="px-4 py-2 bg-blue-600 text-white rounded">Generate Reports</a></Link>
      </div>

      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead className="text-left text-sm text-gray-500 border-b">
            <tr>
              <th className="p-3">Report No</th>
              <th className="p-3">Client</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummy.map(r=> (
              <tr key={r.id} className="border-b">
                <td className="p-3">{r.reportNo}</td>
                <td className="p-3">{r.client}</td>
                <td className="p-3">{r.status}</td>
                <td className="p-3">{r.date}</td>
                <td className="p-3"><button className="px-3 py-1 bg-gray-100 rounded">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
