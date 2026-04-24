export default function TaskCard({ task, onToggle, onDelete }) {
  const isCompleted = task.status === 'completed';

  return (
    <div
      className={`fade-up bg-white rounded-2xl border px-5 py-4 flex items-start justify-between gap-4 transition-all duration-200
        ${isCompleted
          ? 'border-slate-100 opacity-60'
          : 'border-slate-200 hover:border-sky-200 hover:shadow-sm'
        }`}
    >
      {/* Left: toggle button + text */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <button
          onClick={() => onToggle(task)}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
            ${isCompleted
              ? 'bg-sky-500 border-sky-500'
              : 'border-slate-300 hover:border-sky-400'
            }`}
        >
          {isCompleted && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="min-w-0">
          <p className={`font-medium text-sm leading-snug ${isCompleted ? 'line-through text-slate-400' : 'text-slate-800'}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-slate-400 mt-0.5 truncate">{task.description}</p>
          )}
        </div>
      </div>

      {/* Right: badge + delete */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium
          ${isCompleted
            ? 'bg-emerald-50 text-emerald-600'
            : 'bg-amber-50 text-amber-600'
          }`}>
          {isCompleted ? '✓ Done' : 'Pending'}
        </span>
        <button
          onClick={() => onDelete(task.id)}
          className="text-slate-300 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-50"
          title="Delete task"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
