"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category: string;
  gradient: string;
}

export const ToolCard = ({ title, description, icon: Icon, href, category, gradient }: ToolCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-6 group cursor-pointer h-full flex flex-col relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`} />
      
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-white/5 py-1 px-3 rounded-full border border-white/5">
          {category}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
        {description}
      </p>

      <div className="mt-auto">
        <Link 
          href={href}
          className="text-white text-xs font-bold py-3 px-5 rounded-lg glass border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all flex items-center justify-center gap-2"
        >
          Open Tool
        </Link>
      </div>
    </motion.div>
  );
};
