import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <span
          className="text-2xl font-bold tracking-tight cursor-pointer select-none"
          style={{ fontFamily: "'Syne', sans-serif" }}
          onClick={() => navigate('/dashboard')}
        >
          Task<span className="text-sky-500">Flow</span>
        </span>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden sm:block font-medium">
              👋 {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-600 border border-slate-200 rounded-lg px-4 py-1.5 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
