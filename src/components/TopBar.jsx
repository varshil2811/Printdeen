export default function TopBar({ onDelete, hasSelection, onDownload, onUndo, onRedo, canUndo, canRedo, onToggleSidebar }) {
  return (
    <div className="h-16 md:h-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl flex items-center px-4 md:px-8 justify-between z-20 relative">
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors mr-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-lg md:rounded-xl flex items-center justify-center backdrop-blur-sm">
          <span className="text-xl md:text-3xl">✨</span>
        </div>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-white tracking-tight">Design Studio</h1>
          <p className="hidden md:block text-xs text-white/70">Create amazing designs</p>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${canUndo
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
            : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          title="Undo"
        >
          <span>↩️</span>
          <span className="hidden md:inline">Undo</span>
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${canRedo
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
            : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          title="Redo"
        >
          <span>↪️</span>
          <span className="hidden md:inline">Redo</span>
        </button>
        <button
          onClick={onDelete}
          disabled={!hasSelection}
          className={`p-2 md:px-6 md:py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${hasSelection
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
            : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          title="Delete"
        >
          <span>🗑️</span>
          <span className="hidden md:inline">Delete</span>
        </button>
        <button
          onClick={onDownload}
          className="p-2 md:px-6 md:py-2.5 bg-white text-purple-600 font-semibold rounded-lg md:rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
          title="Download"
        >
          <span>⬇️</span>
          <span className="hidden md:inline">Download</span>
        </button>
      </div>
    </div>
  );
}