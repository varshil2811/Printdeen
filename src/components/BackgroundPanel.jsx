import { useState } from "react";

export default function BackgroundPanel({ onBackgroundChange }) {
  const [bgColor, setBgColor] = useState("#ffffff");

  const presetColors = [
    { color: '#ffffff', name: 'White' },
    { color: '#f0f9ff', name: 'Sky' },
    { color: '#fef3c7', name: 'Cream' },
    { color: '#fce7f3', name: 'Pink' },
    { color: '#f3e8ff', name: 'Purple' },
    { color: '#dcfce7', name: 'Green' },
    { color: '#fee2e2', name: 'Rose' },
    { color: '#e0e7ff', name: 'Indigo' },
  ];

  const handleColorChange = (color) => {
    setBgColor(color);
    onBackgroundChange(color);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">🎨 Background</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-3">Preset Colors</label>
        <div className="grid grid-cols-4 gap-3">
          {presetColors.map((preset) => (
            <button
              key={preset.color}
              onClick={() => handleColorChange(preset.color)}
              className={`w-full h-16 rounded-lg border-2 transition hover:scale-105 ${
                bgColor === preset.color ? 'border-indigo-600 shadow-lg' : 'border-gray-200'
              }`}
              style={{ backgroundColor: preset.color }}
              title={preset.name}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Custom Color</label>
        <div className="flex gap-2 items-center">
          <input 
            type="color" 
            value={bgColor} 
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
          />
          <div className="flex-1">
            <input
              type="text"
              value={bgColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
              placeholder="#ffffff"
            />
          </div>
        </div>
      </div>
    </div>
  );
}