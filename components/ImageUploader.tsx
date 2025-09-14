
import React, { useState, useRef } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  label: string;
  id: string;
  onImageUpload: (image: { file: File, base64: string, mimeType: string } | null) => void;
}

export default function ImageUploader({ label, id, onImageUpload }: ImageUploaderProps): React.ReactElement {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImagePreview(reader.result as string);
        onImageUpload({ file, base64: base64String, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFileName('');
    onImageUpload(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium text-gray-300">
        {label}
      </label>
      <div className="relative flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
        {imagePreview ? (
          <>
            <img src={imagePreview} alt="Preview" className="object-contain w-full h-full p-2" />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-red-500 transition-colors"
              aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <UploadIcon className="w-8 h-8 mb-2" />
            <span className="font-semibold">Click to upload</span>
            <span className="text-xs">PNG, JPG, WEBP</span>
          </div>
        )}
        <input
          id={id}
          type="file"
          ref={fileInputRef}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
        />
      </div>
       {fileName && <span className="text-xs text-gray-400 truncate text-center">{fileName}</span>}
    </div>
  );
}
