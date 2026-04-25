"use client";

import Link from "next/link";
import { Hammer, Search, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
          <Hammer size={22} className="group-hover:rotate-12 transition-transform" />
        </div>
        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          MiniWow
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/pdf" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">PDF Tools</Link>
        <Link href="/image" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Image Tools</Link>
        <Link href="/video" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Video Tools</Link>
        <Link href="/ai" className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
          <Sparkles size={14} className="text-purple-400" />
          AI Tools
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search tools..." 
            className="w-48 bg-white/5 border border-white/10 rounded-full py-2 px-4 pl-10 text-xs focus:w-64 focus:bg-white/10 focus:border-blue-500/50 outline-none transition-all duration-300 text-gray-300"
          />
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400" />
        </div>
        
        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
          <Show when="signed-out">
            <SignInButton>
              <button className="text-sm font-bold text-gray-400 hover:text-white transition-colors">Sign In</button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20">Sign Up</button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>

      <button className="md:hidden text-gray-400 p-2" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            <div className="relative group mb-2">
              <input 
                type="text" 
                placeholder="Search tools..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-4 pl-10 text-xs text-gray-300"
              />
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
            
            <Link href="/pdf" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-300 py-2 border-b border-white/5">PDF Tools</Link>
            <Link href="/image" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-300 py-2 border-b border-white/5">Image Tools</Link>
            <Link href="/video" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-300 py-2 border-b border-white/5">Video Tools</Link>
            <Link href="/ai" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-300 py-2 border-b border-white/5">AI Tools</Link>
            
            <div className="flex flex-col gap-3 pt-2">
              <Show when="signed-out">
                <SignInButton>
                  <button className="w-full py-3 glass border-white/10 rounded-xl text-sm font-bold text-white">Sign In</button>
                </SignInButton>
                <SignUpButton>
                  <button className="w-full py-3 bg-blue-600 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-600/20">Sign Up</button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center justify-between p-3 glass rounded-xl">
                  <span className="text-sm font-bold">My Account</span>
                  <UserButton />
                </div>
              </Show>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

