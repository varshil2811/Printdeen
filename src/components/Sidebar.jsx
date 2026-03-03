import { useState, useEffect } from "react";

import TextPanel from "./TextPanel";
import UploadPanel from "./UploadPanel";
import ElementsPanel from "./ElementsPanel";
import BackgroundPanel from "./BackgroundPanel";

export default function Sidebar({ onImageUpload, onAddText, onBackgroundChange, onAddElement, selectedItem, texts, elements, onTextColorChange, onTextSizeChange, onElementColorChange, onTextFontChange, onTextStyleChange }) {
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
        return <TextPanel onAddText={onAddText} selectedItem={selectedItem} texts={texts} onTextColorChange={onTextColorChange} onTextSizeChange={onTextSizeChange} onTextFontChange={onTextFontChange} onTextStyleChange={onTextStyleChange} />;
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
    <div className="bg-white shadow-lg flex flex-row border-r border-gray-200 h-full z-20 flex-shrink-0" style={{ width: `${width}px` }}>
      {/* Menu */}
      <div className="w-16 md:w-20 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 md:py-6 gap-4 overflow-y-auto w-shrink-0">
        <button
          onClick={() => setActive("text")}
          className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-200 ${active === "text"
            ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105 md:scale-110"
            : "bg-white hover:bg-gray-100 hover:scale-105 border border-gray-200"
            }`}
        >
          <span className="text-xl md:text-3xl font-bold">Aa</span>
        </button>
        <button
          onClick={() => setActive("upload")}
          className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-200 ${active === "upload"
            ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105 md:scale-110"
            : "bg-white hover:bg-gray-100 hover:scale-105 border border-gray-200"
            }`}
        >
          <span className="text-xl md:text-2xl">🖼️</span>
        </button>
        <button
          onClick={() => setActive("elements")}
          className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-200 ${active === "elements"
            ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105 md:scale-110"
            : "bg-white hover:bg-gray-100 hover:scale-105 border border-gray-200"
            }`}
        >
          <span className="text-xl md:text-2xl">🔸</span>
        </button>
        <button
          onClick={() => setActive("background")}
          className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-200 ${active === "background"
            ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105 md:scale-110"
            : "bg-white hover:bg-gray-100 hover:scale-105 border border-gray-200"
            }`}
        >
          <span className="text-xl md:text-2xl">🎨</span>
        </button>
      </div>

      {/* Panel */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-white border-gray-200 relative">
        {renderPanel()}
      </div>

      {/* Resize Handle (Hidden on mobile) */}
      <div
        onMouseDown={() => setIsResizing(true)}
        className="hidden md:block absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-indigo-400 transition-colors z-10"
        style={{ background: isResizing ? '#818cf8' : 'transparent' }}
      />
    </div>
  );
}