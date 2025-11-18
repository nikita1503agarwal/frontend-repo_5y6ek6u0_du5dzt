import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import PostCard from './components/PostCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/api/posts`)
      const data = await res.json()
      setPosts(data)
    } catch (e) {
      setError('Failed to load feed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Featured posts</h1>
          <div className="flex items-center gap-3">
            <Link to="/new" className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md">Write</Link>
            <button
              onClick={load}
              className="text-sm px-3 py-1.5 border border-slate-300 rounded-md hover:bg-white"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading && <p className="text-slate-600">Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((p) => (
            <Link key={p.id} to={`/p/${p.id}`}>
              <PostCard post={p} />
            </Link>
          ))}
        </div>

        {!loading && posts.length === 0 && (
          <div className="bg-white border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-600">
            <p>No posts yet. Create your first one!</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
