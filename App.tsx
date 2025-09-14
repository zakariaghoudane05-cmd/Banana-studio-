
import React, { useState, useEffect, useCallback } from 'react';
import type { AspectRatio, LightingStyle, CameraPerspective } from './types';
import { ASPECT_RATIOS, LIGHTING_STYLES, CAMERA_PERSPECTIVES } from './constants';
import { describeImageStyle, editProductImage } from './services/geminiService';
import ControlPanel from './components/ControlPanel';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import { SparklesIcon } from './components/icons';

export default function App(): React.ReactElement {
  const [productImage, setProductImage] = useState<{ file: File, base64: string, mimeType: string } | null>(null);
  const [styleImage, setStyleImage] = useState<{ file: File, base64: string, mimeType: string } | null>(null);

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(ASPECT_RATIOS[0]);
  const [lightingStyle, setLightingStyle] = useState<LightingStyle>(LIGHTING_STYLES[0]);
  const [cameraPerspective, setCameraPerspective] = useState<CameraPerspective>(CAMERA_PERSPECTIVES[0]);

  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [finalImage, setFinalImage] = useState<string | null>(null);

  const [isDescribing, setIsDescribing] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePromptGeneration = useCallback(async () => {
    if (!productImage) return;

    let styleDescription = 'A clean, minimalist studio background.';
    if (styleImage) {
      try {
        setIsDescribing(true);
        setError(null);
        styleDescription = await describeImageStyle(styleImage.base64, styleImage.mimeType);
      } catch (e) {
        console.error(e);
        setError('Failed to analyze style image. Using default style.');
      } finally {
        setIsDescribing(false);
      }
    }

    const prompt = `Create a professional, high-resolution product photograph of the subject from the provided image.

    **Core Instructions:**
    - Maintain the original product's identity, shape, and details exactly as shown. Do not alter the product itself.
    - Place the product in a new, photorealistic scene based on the following style.
    - The final image should be of commercial quality, suitable for an e-commerce website or advertising campaign.

    **Styling Details:**
    - **Overall Scene Description:** ${styleDescription}
    - **Lighting:** ${lightingStyle.description}
    - **Camera Perspective:** ${cameraPerspective.description}
    - **Aspect Ratio:** The final image should be in a ${aspectRatio.label} aspect ratio.

    Generate only the image without any text, watermarks, or annotations.`;

    setGeneratedPrompt(prompt);
  }, [productImage, styleImage, aspectRatio, lightingStyle, cameraPerspective]);

  useEffect(() => {
    handlePromptGeneration();
  }, [handlePromptGeneration]);

  const handleGenerateClick = async () => {
    if (!productImage || !generatedPrompt) {
      setError('Please upload a product image and ensure a prompt is generated.');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      setFinalImage(null);
      const generatedImageUrl = await editProductImage(productImage.base64, productImage.mimeType, generatedPrompt);
      setFinalImage(generatedImageUrl);
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating the image. Please try again.');
      setFinalImage(null);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const isLoading = isDescribing || isGenerating;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">AI Photo Studio</h1>
          <p className="mt-2 text-lg text-gray-400">Generate stunning product shots with Nano Banana</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Inputs & Controls */}
          <div className="flex flex-col gap-6 bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white">1. Upload Your Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageUploader
                label="Product Image"
                onImageUpload={setProductImage}
                id="product-uploader"
              />
              <ImageUploader
                label="Style Reference (Optional)"
                onImageUpload={setStyleImage}
                id="style-uploader"
              />
            </div>
            
            <hr className="border-gray-700" />
            
            <h2 className="text-2xl font-semibold text-white">2. Configure Your Shot</h2>
            <ControlPanel
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              lightingStyle={lightingStyle}
              setLightingStyle={setLightingStyle}
              cameraPerspective={cameraPerspective}
              setCameraPerspective={setCameraPerspective}
            />

            <hr className="border-gray-700" />

            <h2 className="text-2xl font-semibold text-white">3. Generated Prompt</h2>
             <div className="relative">
              <textarea
                value={generatedPrompt}
                readOnly
                className="w-full h-48 p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-300 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Prompt will be generated here..."
              />
              {isDescribing && <div className="absolute top-2 right-2 text-xs text-indigo-400">Analyzing style...</div>}
            </div>

            <button
              onClick={handleGenerateClick}
              disabled={isLoading || !productImage}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 text-lg shadow-lg shadow-indigo-900/50"
            >
              <SparklesIcon className="w-6 h-6" />
              {isGenerating ? 'Generating...' : 'Generate Image'}
            </button>
             {error && <p className="text-red-400 text-center text-sm">{error}</p>}
          </div>

          {/* Right Column: Result */}
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 flex items-center justify-center min-h-[600px]">
            <ResultDisplay
              isLoading={isGenerating}
              finalImage={finalImage}
              initialMessage="Your generated image will appear here."
            />
          </div>
        </main>
      </div>
    </div>
  );
}
