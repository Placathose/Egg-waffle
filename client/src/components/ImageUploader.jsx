import { useState, useEffect } from 'react';

export const ImageUploader = ({ onImageChange, maxSizeMB = 1 }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview.url);
    };
  }, [preview]);

  const handleImageChange = (e) => {
    setError('');
    const file = e.target.files[0];
    
    if (!file) return;

    // Validate image
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Image must be smaller than ${maxSizeMB}MB`);
      return;
    }

    // Create preview
    const newPreview = {
      url: URL.createObjectURL(file),
      file,
      id: Math.random().toString(36).slice(2)
    };

    // Clean up previous preview if exists
    if (preview) URL.revokeObjectURL(preview.url);
    
    setPreview(newPreview);
    onImageChange(file); // Send single file to parent
  };

  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview.url);
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">Upload Image (max {maxSizeMB}MB)</span>
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input file-input-bordered w-full"
      />
      
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      
      {preview && (
        <div className="mt-4 relative">
          <img 
            src={preview.url} 
            alt="Preview" 
            className="h-40 w-full object-contain rounded border"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Remove image"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};