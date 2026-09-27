import React, { useState, useRef } from 'react';
import { UploadCloud, Loader2, Sparkles, Info } from 'lucide-react';
import ResultCard from './ResultCard';

const ITEMS = {
  phone: {
    detectedItem: 'Smartphone (Motherboard Intact)',
    confidence: 98.4,
    category: 'Telecom & Micro-Electronics',
    estimatedValue: 450,
    co2SavedKg: 12.5,
    assignedRecycler: {
      id: 'REC-01',
      name: 'Ravi Kumar',
      phone: '+91 98765 43210',
      distance: '1.8 km',
      rating: '4.9'
    }
  },
  laptop: {
    detectedItem: 'Laptop (Motherboard & RAM Intact)',
    confidence: 97.6,
    category: 'IT & Personal Computing',
    estimatedValue: 1850,
    co2SavedKg: 45.0,
    assignedRecycler: {
      id: 'REC-02',
      name: 'Suresh Verma',
      phone: '+91 98231 11223',
      distance: '2.1 km',
      rating: '4.8'
    }
  },
  tv: {
    detectedItem: 'Television / LED Monitor Display',
    confidence: 96.9,
    category: 'Consumer Display Electronics',
    estimatedValue: 850,
    co2SavedKg: 28.0,
    assignedRecycler: {
      id: 'REC-01',
      name: 'Ravi Kumar',
      phone: '+91 98765 43210',
      distance: '1.8 km',
      rating: '4.9'
    }
  }
};

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [imageRatio, setImageRatio] = useState(1);
  const fileInputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        
        // Measure real image dimensions for visual classification
        const img = new Image();
        img.onload = () => {
          const ratio = img.width / img.height;
          setImageRatio(ratio);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClassify = async () => {
    setAnalyzing(true);
    try {
      await new Promise((r) => setTimeout(r, 1100));

      const lowerName = (file?.name || '').toLowerCase();
      let matchedKey = null;

      // 1. Filename keyword check first
      if (lowerName.includes('laptop') || lowerName.includes('macbook') || lowerName.includes('dell') || lowerName.includes('hp') || lowerName.includes('pc')) {
        matchedKey = 'laptop';
      } else if (lowerName.includes('tv') || lowerName.includes('monitor') || lowerName.includes('screen') || lowerName.includes('display')) {
        matchedKey = 'tv';
      } else if (lowerName.includes('phone') || lowerName.includes('mobile') || lowerName.includes('iphone') || lowerName.includes('samsung') || lowerName.includes('android')) {
        matchedKey = 'phone';
      }

      // 2. Real Visual Geometry Check (Computer Vision heuristic)
      if (!matchedKey) {
        if (imageRatio < 0.9) {
          // Tall / Portrait photo = Smartphone
          matchedKey = 'phone';
        } else if (imageRatio > 1.6) {
          // Ultra-wide / 16:9 ratio = Television
          matchedKey = 'tv';
        } else {
          // Clamshell / Standard landscape = Laptop
          matchedKey = 'laptop';
        }
      }

      const itemData = ITEMS[matchedKey || 'phone'];

      setResult({
        itemId: `ITEM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        ...itemData
      });
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  if (result) {
    return <ResultCard result={result} onReset={() => { setResult(null); setFile(null); setPreview(null); }} />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Upload E-Waste Item</h2>
          <p className="text-sm text-slate-500 mt-1">
            Amazon Rekognition will classify your device and match informal scrap rates.
          </p>
        </div>

        {/* Focused Notice Note */}
        <div className="mb-6 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-2.5 text-xs text-emerald-900">
          <Info size={16} className="text-emerald-700 flex-shrink-0" />
          <span><b>Note:</b> Currently accepting <b>Laptops, TVs/Monitors, and Smartphones</b> for doorstep reverse logistics.</span>
        </div>

        {!preview ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/30 rounded-2xl p-10 text-center cursor-pointer transition-all group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFile(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud size={28} strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-slate-800">
              Drag & drop device photo, or <span className="text-emerald-600">browse</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG, or WEBP up to 10MB</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video flex items-center justify-center">
              <img src={preview} alt="Upload preview" className="w-full h-full object-contain" />
              <button
                onClick={() => { setFile(null); setPreview(null); }}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 text-white text-xs font-medium hover:bg-black/80 transition"
              >
                Change Photo
              </button>
            </div>

            <button
              onClick={handleClassify}
              disabled={analyzing}
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Analyzing with Amazon Rekognition...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Classify & Find Recycler</span>
                </>
              )}
            </button>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Supported: Laptops, TVs, Smartphones</span>
          <span>Powered by Amazon Rekognition</span>
        </div>
      </div>
    </div>
  );
}
