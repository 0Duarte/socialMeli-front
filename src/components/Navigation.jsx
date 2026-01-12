import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import UserSelector from './UserSelector';

export default function Navigation() {
  const { activeUserId } = useUser();

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-amber-100 text-amber-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold">
              <span className="text-amber-500">Social</span>
              <span className="text-gray-800">Meli</span>
            </span>
          </NavLink>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to={`/users/${activeUserId}/feed`} className={linkClass}>
              Feed
            </NavLink>
            <NavLink to={`/users/${activeUserId}/followers`} className={linkClass}>
              Seguidores
            </NavLink>
            <NavLink to={`/users/${activeUserId}/followed`} className={linkClass}>
              Seguindo
            </NavLink>
            <NavLink to="/publish" className={linkClass}>
              Publicar
            </NavLink>
          </nav>

          {/* User Selector */}
          <UserSelector />
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to={`/users/${activeUserId}/feed`} className={linkClass}>
            Feed
          </NavLink>
          <NavLink to={`/users/${activeUserId}/followers`} className={linkClass}>
            Seguidores
          </NavLink>
          <NavLink to={`/users/${activeUserId}/followed`} className={linkClass}>
            Seguindo
          </NavLink>
          <NavLink to="/publish" className={linkClass}>
            Publicar
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

