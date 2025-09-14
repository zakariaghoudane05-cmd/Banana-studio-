
import React from 'react';
import { ImageIcon } from './icons';

interface ResultDisplayProps {
  isLoading: boolean;
  finalImage: string | null;
  initialMessage: string;
}

const Loader: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-gray-400">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="mt-4 text-lg">Generating your masterpiece...</span>
        <span className="text-sm text-gray-500">This may take a moment.</span>
    </div>
);


export default function ResultDisplay({ isLoading, finalImage, initialMessage }: ResultDisplayProps): React.ReactElement {
  if (isLoading) {
    return <Loader />;
  }

  if (finalImage) {
    return (
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
        <img src={finalImage} alt="Generated result" className="max-w-full max-h-[80%] object-contain rounded-lg" />
        <a 
          href={finalImage} 
          download="ai-generated-image.png" 
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Download Image
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-gray-500 text-center">
      <ImageIcon className="w-16 h-16 mb-4" />
      <p className="text-lg">{initialMessage}</p>
    </div>
  );
}
