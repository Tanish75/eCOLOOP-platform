import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 py-8 sm:py-14">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold"
        >
          <Zap size={14} className="text-emerald-600" />
          Track 03 Winner Entry • Waste & Clean Energy
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
        >
          Turn E-Waste Into <span className="text-emerald-600 underline decoration-emerald-200 decoration-wavy underline-offset-8">Impact</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 leading-relaxed"
        >
          AI-powered reverse logistics connecting citizens directly with India’s 4 million informal recyclers. Upload, classify with Amazon Rekognition, and schedule doorstep pickups.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate('/upload')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm shadow-emerald-500/20 hover:scale-[1.02] transition flex items-center justify-center gap-2"
          >
            <span>Upload E-Waste</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>

      {/* 3 Pillar Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center"
        >
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">3.2M Tonnes</div>
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">E-Waste Annually in India</p>
          <p className="text-sm text-slate-600 mt-2">3rd largest generator globally, with 85% ending up in toxic groundwater landfills.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center"
        >
          <div className="text-3xl font-extrabold text-emerald-600 tracking-tight">95% Handled</div>
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">By Informal Sector</p>
          <p className="text-sm text-slate-600 mt-2">Empowering local Kabadiwalas with verified pricing algorithms instead of middleman cuts.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center"
        >
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">₹0 Cost</div>
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">To Informal Recyclers</p>
          <p className="text-sm text-slate-600 mt-2">Zero subscription fees, automated SMS dispatch via Amazon SNS notifications.</p>
        </motion.div>
      </div>
    </div>
  );
}
