export default function UploadPanel({ onImageUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">🖼️ Upload Image</h2>

      <div className="border-2 border-dashed border-indigo-300 rounded-2xl p-12 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 cursor-pointer group">
        <input type="file" accept="image/*" className="hidden" id="file-upload" onChange={handleFileChange} />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <span className="text-5xl">📷</span>
          </div>
          <p className="text-gray-700 font-semibold text-lg mb-2">Click to upload image</p>
          <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
        </label>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <span>💡</span>
          <span>Tip: Upload high quality images for best results</span>
        </p>
      </div>
    </div>
  );
}