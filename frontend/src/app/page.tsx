"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import { ToolCard } from "@/components/tool-card";
import { TOOLS, TOOL_CATEGORIES } from "@/constants/tools";
import { Sparkles, Search, MoveRight, Clock, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RECENT_TOOLS_KEY = "miniwow_recent_tools";
const RECENT_TOOLS_EVENT = "miniwow_recent_tools_change";
type Tool = (typeof TOOLS)[number];

const getRecentToolsSnapshot = () => localStorage.getItem(RECENT_TOOLS_KEY) || "[]";
const getRecentToolsServerSnapshot = () => "[]";
const getInitialCategory = () => {
  if (typeof window === "undefined") {
    return "all";
  }

  return new URLSearchParams(window.location.search).get("category") || "all";
};

const subscribeToRecentTools = (onStoreChange: () => void) => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === RECENT_TOOLS_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(RECENT_TOOLS_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(RECENT_TOOLS_EVENT, onStoreChange);
  };
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(getInitialCategory);
  const recentToolsSnapshot = useSyncExternalStore(
    subscribeToRecentTools,
    getRecentToolsSnapshot,
    getRecentToolsServerSnapshot
  );

  const recentTools = useMemo(() => {
    const recentSlugs = JSON.parse(recentToolsSnapshot) as string[];
    return recentSlugs
      .map((slug: string) => TOOLS.find(t => t.slug === slug))
      .filter((tool: Tool | undefined): tool is Tool => Boolean(tool));
  }, [recentToolsSnapshot]);

  const clearRecentTools = () => {
    localStorage.removeItem(RECENT_TOOLS_KEY);
    window.dispatchEvent(new Event(RECENT_TOOLS_EVENT));
  };

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "all" || tool.category.toLowerCase().includes(activeCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
        
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full glass border border-white/10 text-xs font-bold text-blue-400 mb-4 animate-float">
          <Sparkles size={14} />
          <span>200+ Professional Tools Live</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.05]">
          Digital tools for <span className="gradient-text italic">everyone</span>.
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
          Free, fast, and secure. We handle your PDF, Image, Video, and AI tasks in seconds without any signup.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto pt-8 relative group">
          <input 
            type="text" 
            placeholder="Search 200+ tools (e.g. PDF to Word, Resize Image...)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 md:h-16 bg-white/5 border border-white/10 rounded-[2rem] px-4 pl-12 md:px-8 md:pl-14 text-base md:text-lg text-white outline-none focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-2xl"
          />
          <Search size={20} className="absolute left-5 top-[calc(50%+14px)] md:top-[calc(50%+16px)] md:left-6 md:size-6 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400" />
        </div>
      </section>

      {/* Recent Tools Section */}
      {recentTools.length > 0 && searchQuery === "" && (
        <section className="space-y-8">
          <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Recently Used</h2>
            </div>
            <button
              type="button"
              onClick={clearRecentTools}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold text-gray-400 transition-all hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
              aria-label="Clear recently used tools"
            >
              <Trash2 size={15} />
              Clear
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTools.map((tool) => (
              <ToolCard 
                key={`recent-${tool.slug}`}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                href={`/tools/${tool.slug}`}
                category={tool.category}
                gradient={tool.gradient}
              />
            ))}
          </div>
        </section>
      )}

      {/* Tools Section */}
      <section id="tools" className="space-y-12 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tight">
              {activeCategory === "all" ? "All Utilities" : `${activeCategory} Tools`}
            </h2>
            <p className="text-gray-500 font-medium">{filteredTools.length} results found.</p>
          </div>
          
          <div className="flex flex-wrap bg-white/5 p-1.5 rounded-2xl border border-white/5 gap-1">
            <button 
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${activeCategory === "all" ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-gray-300"}`}
            >
              All
            </button>
            {TOOL_CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${activeCategory === cat.id ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-gray-300"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.slice(0, 50).map((tool) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
              >
                <ToolCard 
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  href={`/tools/${tool.slug}`}
                  category={tool.category}
                  gradient={tool.gradient}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="py-20 text-center space-y-4 opacity-20">
            <Search size={64} className="mx-auto" />
            <p className="text-2xl font-bold">No tools found matching your search.</p>
          </div>
        )}

        {filteredTools.length > 50 && (
          <div className="pt-12 text-center">
            <button className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors bg-blue-500/5 px-8 py-4 rounded-2xl border border-blue-500/20 group">
              View More Tools
              <MoveRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </section>

      {/* Feature Highlight */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "No Signups", desc: "Start using tools immediately without the hassle of creating an account." },
          { title: "Privacy First", desc: "Your files are processed securely and deleted automatically after 1 hour." },
          { title: "Cloud Scale", desc: "Powered by modern serverless infrastructure for lightning fast processing." }
        ].map((f, i) => (
          <div key={i} className="glass p-8 rounded-3xl border-white/5">
            <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
