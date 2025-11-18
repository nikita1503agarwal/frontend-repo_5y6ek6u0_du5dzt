import Navbar from '../components/Navbar'
import NewPostForm from '../components/NewPostForm'
import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const New = () => {
  const [ready, setReady] = useState(false)
  const [msg, setMsg] = useState('')

  // Ensure a demo user exists to author posts
  const ensureDemoUser = async () => {
    try {
      const users = await fetch(`${API_BASE}/api/users`).then(r => r.json())
      if (!users.find(u => u.username === 'demo')) {
        await fetch(`${API_BASE}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'demo', name: 'Demo User', email: 'demo@example.com' })
        })
      }
      setReady(true)
    } catch (e) {
      setMsg('Backend not reachable')
    }
  }

  useEffect(() => { ensureDemoUser() }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Write a post</h1>
        {!ready && <p className="text-slate-600">{msg || 'Preparing…'}</p>}
        {ready && <NewPostForm onCreated={() => setMsg('Post published!')} />}
        {msg && <p className="text-green-700">{msg}</p>}
      </main>
    </div>
  )
}

export default New
