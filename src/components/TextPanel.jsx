import { useState } from "react";

export default function TextPanel({ onAddText, selectedItem, texts, onTextColorChange, onTextSizeChange, onTextFontChange, onTextStyleChange }) {
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontStyle, setFontStyle] = useState("normal");

  const selectedText = selectedItem?.type === 'text' ? texts.find(t => t.id === selectedItem.id) : null;

  const fontFamilies = [
    "Arial", "Times New Roman", "Courier New", "Verdana", "Georgia", "Comic Sans MS", "Impact"
  ];

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
              max="120"
              value={selectedText.fontSize}
              onChange={(e) => onTextSizeChange(selectedText.id, Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-2">Font Family</label>
            <select
              value={selectedText.fontFamily || "Arial"}
              onChange={(e) => onTextFontChange(selectedText.id, e.target.value)}
              className="w-full p-2 border rounded"
            >
              {fontFamilies.map(font => (
                <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
              ))}
            </select>
          </div>

          <div className="mb-3 flex gap-2">
            <button
              onClick={() => {
                const isBold = selectedText.fontStyle?.includes('bold');
                const isItalic = selectedText.fontStyle?.includes('italic');
                const newStyle = `${!isBold ? 'bold ' : ''}${isItalic ? 'italic' : ''}`.trim() || 'normal';
                onTextStyleChange(selectedText.id, newStyle);
              }}
              className={`flex-1 py-1 px-2 rounded border ${selectedText.fontStyle?.includes('bold') ? 'bg-indigo-200 border-indigo-500' : 'bg-white border-gray-300'} font-bold`}
            >
              B
            </button>
            <button
              onClick={() => {
                const isBold = selectedText.fontStyle?.includes('bold');
                const isItalic = selectedText.fontStyle?.includes('italic');
                const newStyle = `${isBold ? 'bold ' : ''}${!isItalic ? 'italic' : ''}`.trim() || 'normal';
                onTextStyleChange(selectedText.id, newStyle);
              }}
              className={`flex-1 py-1 px-2 rounded border ${selectedText.fontStyle?.includes('italic') ? 'bg-indigo-200 border-indigo-500' : 'bg-white border-gray-300'} italic`}
            >
              I
            </button>
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
          max="120"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Font Family</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {fontFamilies.map(font => (
            <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => {
            const isBold = fontStyle.includes('bold');
            const isItalic = fontStyle.includes('italic');
            setFontStyle(`${!isBold ? 'bold ' : ''}${isItalic ? 'italic' : ''}`.trim() || 'normal');
          }}
          className={`flex-1 py-2 px-4 rounded border ${fontStyle.includes('bold') ? 'bg-indigo-200 border-indigo-500' : 'bg-white border-gray-300'} font-bold transition-colors`}
        >
          B
        </button>
        <button
          onClick={() => {
            const isBold = fontStyle.includes('bold');
            const isItalic = fontStyle.includes('italic');
            setFontStyle(`${isBold ? 'bold ' : ''}${!isItalic ? 'italic' : ''}`.trim() || 'normal');
          }}
          className={`flex-1 py-2 px-4 rounded border ${fontStyle.includes('italic') ? 'bg-indigo-200 border-indigo-500' : 'bg-white border-gray-300'} italic transition-colors`}
        >
          I
        </button>
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
        onClick={() => onAddText('Heading', fontSize, textColor, fontFamily, fontStyle)}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
      >
        ➕ Add Heading
      </button>
    </div>
  );
}