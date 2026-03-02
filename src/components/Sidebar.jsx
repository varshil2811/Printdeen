import { useState, useEffect } from "react";

import TextPanel from "./TextPanel";
import UploadPanel from "./UploadPanel";
import ElementsPanel from "./ElementsPanel";
import BackgroundPanel from "./BackgroundPanel";

export default function Sidebar({ onImageUpload, onAddText, onBackgroundChange, onAddElement, selectedItem, texts, elements, onTextColorChange, onTextSizeChange, onElementColorChange }) {
  const [active, setActive] = useState("text");
  const [width, setWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth >= 250 && newWidth <= 500) {
          setWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  const renderPanel = () => {
    switch (active) {
      case "text":
        return <TextPanel onAddText={onAddText} selectedItem={selectedItem} texts={texts} onTextColorChange={onTextColorChange} onTextSizeChange={onTextSizeChange} />;
      case "upload":
        return <UploadPanel onImageUpload={onImageUpload} />;
      case "elements":
        return <ElementsPanel onAddElement={onAddElement} selectedItem={selectedItem} elements={elements} onElementColorChange={onElementColorChange} />;
      case "background":
        return <BackgroundPanel onBackgroundChange={onBackgroundChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white shadow-2xl flex border-r border-gray-200 relative" style={{ width: `${width}px` }}>
      {/* Menu */}
      <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-4">
        <button 
          onClick={() => setActive("text")} 
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${
            active === "text" 
              ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-110" 
              : "bg-gray-100 hover:bg-gray-200 hover:scale-105"
          }`}
        >
          <span className="text-3xl font-bold">Aa</span>
        </button>
        <button 
          onClick={() => setActive("upload")} 
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${
            active === "upload" 
              ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-110" 
              : "bg-gray-100 hover:bg-gray-200 hover:scale-105"
          }`}
        >
          <span className="text-2xl">🖼️</span>
        </button>
        <button 
          onClick={() => setActive("elements")} 
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${
            active === "elements" 
              ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-110" 
              : "bg-gray-100 hover:bg-gray-200 hover:scale-105"
          }`}
        >
          <span className="text-2xl">🔸</span>
        </button>
        <button 
          onClick={() => setActive("background")} 
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${
            active === "background" 
              ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-110" 
              : "bg-gray-100 hover:bg-gray-200 hover:scale-105"
          }`}
        >
          <span className="text-2xl">🎨</span>
        </button>
      </div>

      {/* Panel */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderPanel()}
      </div>
      
      {/* Resize Handle */}
      <div 
        onMouseDown={() => setIsResizing(true)}
        className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-indigo-400 transition-colors z-10"
        style={{ background: isResizing ? '#818cf8' : 'transparent' }}
      />
    </div>
  );
}