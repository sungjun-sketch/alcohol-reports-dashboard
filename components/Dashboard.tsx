export default function Dashboard(){
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow"> 
          <div className="text-sm text-gray-500">Total Reports</div>
          <div className="text-2xl font-bold">123</div>
        </div>
        <div className="p-4 bg-white rounded shadow"> 
          <div className="text-sm text-gray-500">Drafts</div>
          <div className="text-2xl font-bold">5</div>
        </div>
        <div className="p-4 bg-white rounded shadow"> 
          <div className="text-sm text-gray-500">Awaiting Approval</div>
          <div className="text-2xl font-bold">2</div>
        </div>
      </div>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-medium mb-2">Recent Reports</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="py-2">Report No</th>
              <th className="py-2">Client</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">RPT-2026-001</td>
              <td className="py-2">Client A</td>
              <td className="py-2">Approved</td>
              <td className="py-2">2026-10-15</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">RPT-2026-002</td>
              <td className="py-2">Client B</td>
              <td className="py-2">Draft</td>
              <td className="py-2">2026-10-14</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
