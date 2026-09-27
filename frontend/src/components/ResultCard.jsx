import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, IndianRupee, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export default function ResultCard({ result, onReset }) {
  const [address, setAddress] = useState('Flat 402, Green Enclave, Sector 62, Noida');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [scheduled, setScheduled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSchedule = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setScheduled(true);
    }, 700);
  };

  if (scheduled) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center max-w-xl mx-auto"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={36} strokeWidth={1.75} />
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">Pickup Confirmed!</h3>
        <p className="text-slate-600 text-sm mt-2">
          Your pickup has been dispatched to <span className="font-semibold text-slate-900">{result.assignedRecycler.name}</span>. An SMS confirmation was pushed via AWS SNS.
        </p>

        <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-2">
          <div className="flex justify-between"><span className="text-slate-400">Item:</span> <span className="font-medium text-slate-800">{result.detectedItem}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Guaranteed Payout:</span> <span className="font-semibold text-emerald-600">₹{result.estimatedValue}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Pickup Address:</span> <span className="font-medium text-slate-800">{address}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Slot:</span> <span className="font-medium text-slate-800">Tomorrow, 10:00 AM - 1:00 PM</span></div>
        </div>

        <button
          onClick={onReset}
          className="w-full py-3 px-6 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
        >
          Recycle Another Device
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm max-w-xl mx-auto"
    >
      <div className="flex items-start justify-between pb-6 border-b border-slate-100">
        <div>
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
            Amazon Rekognition Verified ({result.confidence}% Match)
          </span>
          <h2 className="text-2xl font-bold text-slate-900">{result.detectedItem}</h2>
          <p className="text-sm text-slate-500">{result.category}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Informal Scrap Value</span>
          <span className="text-2xl font-extrabold text-emerald-600 flex items-center justify-end">
            <IndianRupee size={20} strokeWidth={2} />
            {result.estimatedValue}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-xs text-slate-500 block">Carbon Diverted</span>
          <span className="text-lg font-bold text-slate-900 mt-0.5 block">{result.co2SavedKg} kg CO₂</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-xs text-slate-500 block">Net Weight</span>
          <span className="text-lg font-bold text-slate-900 mt-0.5 block">{result.weightKg} kg</span>
        </div>
      </div>

      {/* Recycler Profile */}
      <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
            <UserCheck size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
              {result.assignedRecycler.name}
              <ShieldCheck size={14} className="text-emerald-600" />
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span>{result.assignedRecycler.distance}</span>
              <span>•</span>
              <span>⭐ {result.assignedRecycler.rating} rating</span>
            </div>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-md bg-white text-emerald-800 border border-emerald-200 font-medium">
          Assigned
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div>
          <label className="text-xs font-medium text-slate-700 block mb-1">Pickup Address</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700 block mb-1">Contact Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleSchedule}
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <span className="text-sm">Dispatching Pickup...</span>
        ) : (
          <>
            <span>Confirm & Schedule Pickup</span>
            <ArrowRight size={18} strokeWidth={1.5} />
          </>
        )}
      </button>
    </motion.div>
  );
}
