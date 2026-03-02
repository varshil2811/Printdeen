export default function ElementsPanel({ onAddElement, selectedItem, elements, onElementColorChange }) {
  const elementsList = [
    { type: 'rect', color: '#a855f7', name: 'Rectangle' },
    { type: 'circle', color: '#3b82f6', name: 'Circle' },
    { type: 'triangle', color: '#10b981', name: 'Triangle' },
    { type: 'star', color: '#f97316', name: 'Star' },
    { type: 'arrow', color: '#ec4899', name: 'Arrow' },
    { type: 'line', color: '#8b5cf6', name: 'Line' },
  ];

  const selectedElement = selectedItem?.type === 'element' ? elements.find(e => e.id === selectedItem.id) : null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">⬛ Elements</h2>

      {selectedElement && (
        <div className="mb-4 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
          <h3 className="text-sm font-semibold mb-3 text-indigo-700">Edit Selected Element</h3>
          <label className="block text-sm font-medium mb-2">Element Color</label>
          <input 
            type="color" 
            value={selectedElement.color || "#000000"} 
            onChange={(e) => onElementColorChange(selectedElement.id, e.target.value)}
            className="w-full h-12 rounded cursor-pointer"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {elementsList.map((el, i) => (
          <div 
            key={i}
            onClick={() => onAddElement(el.type, el.color)}
            className="h-24 hover:shadow-lg hover:scale-105 transition cursor-pointer flex flex-col items-center justify-center gap-2 bg-gray-50 rounded-lg border-2 border-gray-200"
          >
            {el.type === 'circle' && (
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: el.color }} />
            )}
            {el.type === 'rect' && (
              <div style={{ width: '60px', height: '50px', backgroundColor: el.color, borderRadius: '4px' }} />
            )}
            {el.type === 'triangle' && (
              <div style={{ width: 0, height: 0, borderLeft: '30px solid transparent', borderRight: '30px solid transparent', borderBottom: `50px solid ${el.color}` }} />
            )}
            {el.type === 'star' && (
              <div style={{ fontSize: '50px', color: el.color }}>★</div>
            )}
            {el.type === 'arrow' && (
              <div style={{ fontSize: '50px', color: el.color }}>→</div>
            )}
            {el.type === 'line' && (
              <div style={{ width: '60px', height: '4px', backgroundColor: el.color }} />
            )}
            <span className="text-xs text-gray-600">{el.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}