import React from 'react';
import { Recycle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-24 py-8 bg-white/50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Recycle size={16} className="text-emerald-600" />
          <span className="font-semibold text-slate-700">EcoLoop</span>
          <span>• Built for Bharat Builds 2026 (WeMakeDevs)</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Powered by AWS SAM & Amazon Rekognition</span>
        </div>
      </div>
    </footer>
  );
}
