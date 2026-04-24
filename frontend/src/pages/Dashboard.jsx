import { useEffect, useState } from 'react';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [tasks, setTasks]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]     = useState({ title: '', description: '' });
  const [adding, setAdding] = useState(false);
  const [error, setError]   = useState('');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch {
      setError('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setAdding(true);
    try {
      const res = await api.post('/tasks', form);
      setTasks([res.data, ...tasks]);
      setForm({ title: '', description: '' });
    } catch {
      setError('Failed to create task.');
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    try {
      const res = await api.put(`/tasks/${task.id}`, { status: newStatus });
      setTasks(tasks.map(t => t.id === task.id ? res.data : t));
    } catch {
      setError('Failed to update task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch {
      setError('Failed to delete task.');
    }
  };

  const pending   = tasks.filter(t => t.status === 'pending');
  const completed = tasks.filter(t => t.status === 'completed');

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8 fade-up">
          <h2
            className="text-3xl font-bold text-slate-800"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            My Tasks
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {pending.length} pending &nbsp;·&nbsp; {completed.length} completed
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 fade-in flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError('')} className="ml-4 text-red-400 hover:text-red-600 font-bold">✕</button>
          </div>
        )}

        {/* Add Task Form */}
        <form
          onSubmit={handleAdd}
          className="fade-up bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm"
          style={{ animationDelay: '0.05s' }}
        >
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            + New Task
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Task title *"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all placeholder-slate-300 bg-slate-50 focus:bg-white"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all placeholder-slate-300 bg-slate-50 focus:bg-white"
            />
            <button
              type="submit"
              disabled={adding}
              className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all disabled:opacity-60 shadow-sm"
            >
              {adding ? 'Adding…' : '+ Add Task'}
            </button>
          </div>
        </form>

        {/* Task List */}
        {loading ? (
          <div className="text-center text-slate-400 text-sm py-20">Loading your tasks…</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20 fade-in">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-slate-400 text-sm font-medium">No tasks yet. Add one above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Pending tasks */}
            {pending.length > 0 && (
              <>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1 pb-1">
                  Pending ({pending.length})
                </p>
                {pending.map((task, i) => (
                  <div key={task.id} style={{ animationDelay: `${i * 0.05}s` }}>
                    <TaskCard task={task} onToggle={handleToggle} onDelete={handleDelete} />
                  </div>
                ))}
              </>
            )}

            {/* Completed tasks */}
            {completed.length > 0 && (
              <>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1 pb-1 mt-8">
                  Completed ({completed.length})
                </p>
                {completed.map((task, i) => (
                  <div key={task.id} style={{ animationDelay: `${i * 0.05}s` }}>
                    <TaskCard task={task} onToggle={handleToggle} onDelete={handleDelete} />
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
