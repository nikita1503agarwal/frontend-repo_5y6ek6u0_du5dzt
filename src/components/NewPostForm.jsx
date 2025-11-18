import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const NewPostForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    title: '',
    body: '',
    tags: '',
    author_username: 'demo',
    cover_image: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Saving…')
    try {
      const payload = {
        title: form.title,
        body: form.body,
        author_username: form.author_username,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        cover_image: form.cover_image || null,
        published: true,
      }
      const res = await fetch(`${API_BASE}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Failed to create post')
      }
      setStatus('Created!')
      setForm({ title: '', body: '', tags: '', author_username: form.author_username, cover_image: '' })
      onCreated && onCreated()
    } catch (e) {
      setStatus(e.message)
    }
  }

  return (
    <form onSubmit={submit} className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
        <input name="title" value={form.title} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Body (Markdown)</label>
        <textarea name="body" value={form.body} onChange={handleChange} rows={6} className="w-full px-3 py-2 border rounded-md" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
          <input name="tags" value={form.tags} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image URL</label>
          <input name="cover_image" value={form.cover_image} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Author Username</label>
        <input name="author_username" value={form.author_username} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Publish</button>
        <span className="text-sm text-slate-600">{status}</span>
      </div>
    </form>
  )
}

export default NewPostForm
