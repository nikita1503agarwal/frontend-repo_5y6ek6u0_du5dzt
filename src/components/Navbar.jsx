import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight">Hashlite</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${isActive('/') ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
          >
            Feed
          </Link>
          <Link
            to="/new"
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${isActive('/new') ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Write
          </Link>
          <a
            href="/test"
            className="px-3 py-1.5 rounded-md text-sm text-slate-600 hover:bg-slate-100"
          >
            Status
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
