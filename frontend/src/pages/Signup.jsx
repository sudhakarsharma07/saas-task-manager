import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', form);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'john@example.com' },
    { label: 'Password', name: 'password', type: 'password', placeholder: '•••••••• (min 6 chars)' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="fade-up w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold text-slate-800"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Task<span className="text-sky-500">Flow</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2">Create your free account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          {error && (
            <div className="mb-5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all placeholder-slate-300 bg-slate-50 focus:bg-white"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white text-sm font-semibold rounded-xl py-3 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Creating account…' : 'Create account →'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-sky-500 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
