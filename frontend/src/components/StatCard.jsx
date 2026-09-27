import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, label, icon: Icon, trend }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Icon size={20} strokeWidth={1.5} />
        </div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold tracking-tight text-slate-900">{value}</div>
        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
          {trend && (
            <span className="text-emerald-600 font-medium flex items-center">
              {trend}
            </span>
          )}
          <span>{label}</span>
        </div>
      </div>
    </motion.div>
  );
}
