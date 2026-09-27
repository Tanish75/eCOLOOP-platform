import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Impact from './pages/Impact';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 flex-1 w-full pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/impact" element={<Impact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
