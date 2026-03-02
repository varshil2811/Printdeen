export default function TopBar({ onDelete, hasSelection, onDownload }) {
  return (
    <div className="h-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl flex items-center px-8 justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <span className="text-3xl">✨</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Design Studio</h1>
          <p className="text-xs text-white/70">Create amazing designs</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onDelete}
          disabled={!hasSelection}
          className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${hasSelection
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
        >
          <span>🗑️</span>
          Delete
        </button>
        <button
          onClick={onDownload}
          className="px-6 py-2.5 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
        >
          <span>⬇️</span>
          Download
        </button>
      </div>
    </div>
  );
}