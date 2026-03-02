import { useState } from "react";

export default function TextPanel({ onAddText, selectedItem, texts, onTextColorChange, onTextSizeChange }) {
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState("#000000");

  const selectedText = selectedItem?.type === 'text' ? texts.find(t => t.id === selectedItem.id) : null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">📝 Text</h2>

      {selectedText && (
        <div className="mb-4 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
          <h3 className="text-sm font-semibold mb-3 text-indigo-700">Edit Selected Text</h3>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-2">Font Size: {selectedText.fontSize}px</label>
            <input 
              type="range" 
              min="12" 
              max="72" 
              value={selectedText.fontSize} 
              onChange={(e) => onTextSizeChange(selectedText.id, Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Text Color</label>
            <input 
              type="color" 
              value={selectedText.color || "#000000"} 
              onChange={(e) => onTextColorChange(selectedText.id, e.target.value)}
              className="w-full h-12 rounded cursor-pointer"
            />
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Font Size: {fontSize}px</label>
        <input 
          type="range" 
          min="12" 
          max="72" 
          value={fontSize} 
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Text Color</label>
        <input 
          type="color" 
          value={textColor} 
          onChange={(e) => setTextColor(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>

      <button 
        onClick={() => onAddText('Heading', fontSize, textColor)}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
      >
        ➕ Add Heading
      </button>
    </div>
  );
}