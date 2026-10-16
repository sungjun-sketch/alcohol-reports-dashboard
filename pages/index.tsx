import Sidebar from '../../components/Sidebar'
import Dashboard from '../../components/Dashboard'

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Dashboard />
      </main>
    </div>
  )
}
