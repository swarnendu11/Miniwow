"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowLeft, Info, Share2, Star } from "lucide-react";
import Link from "next/link";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
  category: string;
  gradient: string;
}

export const ToolLayout = ({ title, description, icon: Icon, children, category, gradient }: ToolLayoutProps) => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto pt-8">
      {/* Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to All Tools
        </Link>
        <div className="flex items-center gap-4">
          <button className="p-2 glass rounded-lg text-gray-400 hover:text-white">
            <Star size={18} />
          </button>
          <button className="p-2 glass rounded-lg text-gray-400 hover:text-white">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Hero Header for Tool */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-xl shadow-black/20`}>
              <Icon size={28} strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1 block">
                {category} Tool
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-white">{title}</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        <div className="glass rounded-2xl p-6 border-white/5 space-y-4 h-full">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
            <Info size={16} />
            How to use
          </div>
          <ol className="text-sm text-gray-500 space-y-3 list-decimal list-inside leading-relaxed">
            <li>Select or drop your files in the box.</li>
            <li>Adjust settings as needed.</li>
            <li>Click the process button.</li>
            <li>Wait a few seconds for completion.</li>
            <li>Download your processed file.</li>
          </ol>
        </div>
      </div>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-[2rem] border-white/5 p-8 md:p-12 min-h-[400px] relative overflow-hidden group/main"
      >
        <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${gradient} opacity-[0.03] pointer-events-none group-hover/main:opacity-[0.05] transition-opacity duration-700`} />
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>
      </motion.div>

      {/* SEO Section / Bottom Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
        <div className="space-y-4 text-sm text-gray-500">
          <h3 className="text-white font-bold text-lg mb-2">Privacy & Security</h3>
          <p>We process your files directly inside your browser or on our secure serverless infrastructure. Files are automatically deleted after processing and never shared with third parties.</p>
        </div>
        <div className="space-y-4 text-sm text-gray-500">
          <h3 className="text-white font-bold text-lg mb-2">Technical Details</h3>
          <p>Our tools use state-of-the-art libraries like Sharp and Tesseract.js to ensure high performance and quality output. Processing speeds vary based on file size and your connection.</p>
        </div>
      </div>
    </div>
  );
};
