import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const PostPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/posts/${id}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setPost(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        {loading && <p>Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}
        {post && (
          <article className="bg-white border border-slate-200 rounded-xl p-6">
            <Link to="/" className="text-blue-600">← Back to feed</Link>
            {post.cover_image && (
              <img src={post.cover_image} alt="cover" className="w-full h-64 object-cover rounded-lg my-4" />)
            }
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-slate-600 mb-6">by @{post.author_username}</p>
            <div className="prose max-w-none whitespace-pre-wrap">{post.body}</div>
          </article>
        )}
      </main>
    </div>
  )
}

export default PostPage
