const PostCard = ({ post }) => {
  return (
    <article className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      {post.cover_image && (
        <img src={post.cover_image} alt="cover" className="w-full h-48 object-cover rounded-lg mb-4" />
      )}
      <h2 className="text-xl font-bold mb-2 text-slate-900">{post.title}</h2>
      <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
        <span>@{post.author_username}</span>
        <span>•</span>
        <span>{new Date(post.created_at || Date.now()).toLocaleDateString()}</span>
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((t) => (
            <span key={t} className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-2 py-1 rounded">
              #{t}
            </span>
          ))}
        </div>
      )}
      <p className="text-slate-700 line-clamp-3 whitespace-pre-wrap">{post.body?.slice(0, 220)}{post.body && post.body.length > 220 ? '…' : ''}</p>
    </article>
  )
}

export default PostCard
