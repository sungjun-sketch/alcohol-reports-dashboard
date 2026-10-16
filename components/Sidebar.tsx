import Link from 'next/link'

export default function Sidebar(){
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 font-bold text-lg">Alcohol Reports</div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li><Link href="/"><a className="block p-2 rounded hover:bg-gray-100">Dashboard</a></Link></li>
          <li><Link href="/reports"><a className="block p-2 rounded hover:bg-gray-100">Reports</a></Link></li>
          <li><Link href="/templates"><a className="block p-2 rounded hover:bg-gray-100">Templates</a></Link></li>
          <li><Link href="/targets"><a className="block p-2 rounded hover:bg-gray-100">Targets</a></Link></li>
          <li><Link href="/generate"><a className="block p-2 rounded hover:bg-gray-100">Generate</a></Link></li>
          <li><Link href="/settings"><a className="block p-2 rounded hover:bg-gray-100">Settings</a></Link></li>
        </ul>
      </nav>
    </aside>
  )
}
