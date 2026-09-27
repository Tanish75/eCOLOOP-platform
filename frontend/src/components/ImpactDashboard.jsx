import React, { useState } from 'react';
import { Leaf, Award, IndianRupee, Truck } from 'lucide-react';
import StatCard from './StatCard';

export default function ImpactDashboard() {
  const [metrics] = useState({
    totalWeightDivertedKg: 1258.4,
    co2EmissionsSavedKg: 8435.0,
    informalIncomeGeneratedInr: 149200,
    pickupsCompleted: 215,
    weeklyChart: [
      { day: 'Mon', pickups: 28 },
      { day: 'Tue', pickups: 35 },
      { day: 'Wed', pickups: 42 },
      { day: 'Thu', pickups: 38 },
      { day: 'Fri', pickups: 56 },
      { day: 'Sat', pickups: 68 },
      { day: 'Sun', pickups: 45 }
    ]
  });

  const recentPickups = [
    { id: 'PKP-31A2', item: 'Dell Inspiron 15 (PCB)', date: 'Today, 2:15 PM', value: '₹1,800', status: 'Completed', recycler: 'Ravi Kumar' },
    { id: 'PKP-98C4', item: 'Samsung Galaxy A50', date: 'Today, 11:30 AM', value: '₹450', status: 'Completed', recycler: 'Suresh Verma' },
    { id: 'PKP-77B1', item: 'Lead-Acid Inverter Battery', date: 'Yesterday', value: '₹950', status: 'Pending', recycler: 'Anita Devi' },
    { id: 'PKP-12F9', item: 'Old CRT Monitor 19"', date: 'Yesterday', value: '₹400', status: 'Completed', recycler: 'Ravi Kumar' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">National Impact Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="E-Waste Diverted"
          value={`${metrics.totalWeightDivertedKg} kg`}
          label="from toxic landfills"
          icon={Leaf}
          trend="+18.4%"
        />
        <StatCard
          title="CO₂ Emissions Saved"
          value={`${metrics.co2EmissionsSavedKg} kg`}
          label="lifecycle footprint"
          icon={Award}
          trend="+22.1%"
        />
        <StatCard
          title="Recycler Earnings"
          value={`₹${metrics.informalIncomeGeneratedInr.toLocaleString()}`}
          label="disbursed to informal workers"
          icon={IndianRupee}
          trend="+31.0%"
        />
        <StatCard
          title="Verified Pickups"
          value={metrics.pickupsCompleted}
          label="doorstep dispatches"
          icon={Truck}
          trend="+12%"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Weekly Reverse Logistics Volume</h2>
            <p className="text-xs text-slate-500">Pickups dispatched to informal micro-entrepreneurs</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
            Current Week
          </span>
        </div>

        <div className="h-48 flex items-end justify-between gap-4 pt-4 border-b border-slate-100">
          {metrics.weeklyChart.map((item) => (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-xs font-semibold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.pickups}
              </span>
              <div
                style={{ height: `${(item.pickups / 70) * 100}%` }}
                className="w-full max-w-[48px] bg-slate-100 group-hover:bg-emerald-600 rounded-t-lg transition-all duration-300"
              />
              <span className="text-xs font-medium text-slate-500 mt-2">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Live Reverse Logistics Feed</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Tracking ID</th>
                <th className="pb-3">Classified Device</th>
                <th className="pb-3">Assigned Recycler</th>
                <th className="pb-3">Pledged Value</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentPickups.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 font-mono text-xs text-slate-600">{row.id}</td>
                  <td className="py-3.5 font-medium text-slate-900">{row.item}</td>
                  <td className="py-3.5 text-slate-600">{row.recycler}</td>
                  <td className="py-3.5 font-semibold text-emerald-600">{row.value}</td>
                  <td className="py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
