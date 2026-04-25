"use client";

import { useState } from "react";
import { Upload, Download, Type, Send, Sparkles, FileText, Check, Copy, X } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

interface ToolEngineProps {
  tool: {
    title: string;
    slug: string;
    description: string;
    category: string;
    gradient: string;
    icon?: any;
  };
}

export const ToolEngine = ({ tool }: ToolEngineProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    setResult(null);
    
    try {
      if (tool.category === "AI" || tool.category === "Writing") {
        toast.loading("Generating content...");
        const response = await axios.post(`http://localhost:5000/api/tools/${tool.slug}`, { text: inputText });
        setResult(response.data.result);
        toast.dismiss();
        toast.success("Content generated successfully!");
      } else {
        if (files.length === 0) {
          toast.error("Please upload at least one file");
          setIsProcessing(false);
          return;
        }

        const formData = new FormData();
        files.forEach(f => formData.append("files", f));

        toast.loading("Processing your files...");

        // Connect to our new Express backend generic route
        let endpoint = `http://localhost:5000/api/tools/${tool.slug}`;
        if (tool.slug === "merge-pdf") {
          endpoint = "http://localhost:5000/api/pdf/merge";
        }

        const response = await axios.post(endpoint, formData, {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        const contentTypeHeader = response.headers["content-type"];
        const contentType = typeof contentTypeHeader === "string" ? contentTypeHeader : undefined;
        const blob = new Blob([response.data], { type: contentType });
        setResult(URL.createObjectURL(blob));
        
        toast.dismiss();
        toast.success("Files processed successfully!");
      }
    } catch (err: any) {
      console.error(err);
      toast.dismiss();
      toast.error(err.response?.data?.error || "An error occurred during processing");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Render logic based on tool category
  if (tool.category === "AI" || tool.category === "Writing") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
        <div className="space-y-6">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest block mb-4">Your Input</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-80 glass rounded-2xl p-6 text-gray-200 outline-none focus:border-white/20 transition-all resize-none"
            placeholder="Type or paste your content here..."
          />
          <button
            onClick={handleProcess}
            disabled={isProcessing || !inputText}
            className={`w-full py-4 bg-gradient-to-r ${tool.gradient} rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-transform`}
          >
            {isProcessing ? "Processing..." : "Generate & Convert"}
            {tool.icon ? <tool.icon size={18} /> : <Sparkles size={18} />}
          </button>
        </div>
        
        <div className="glass rounded-2xl p-8 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
             <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Result Output</span>
             {result && (
               <button onClick={copyToClipboard} className="p-2 glass rounded-lg text-gray-500 hover:text-white transition-colors">
                 {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
               </button>
             )}
          </div>
          <div className="flex-1 text-gray-300 leading-relaxed whitespace-pre-wrap">
            {result || <div className="h-full flex flex-col items-center justify-center opacity-10">Output will appear here</div>}
          </div>
        </div>
      </div>
    );
  }

  // File Based Tools (PDF, Image, Video, Conversion)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div 
          className="min-h-80 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-8 gap-4 hover:border-white/20 transition-all cursor-pointer bg-white/5 relative"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const droppedFiles = Array.from(e.dataTransfer.files);
            setFiles([...files, ...droppedFiles]);
          }}
        >
          {files.length > 0 ? (
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center mb-4">
                 <h4 className="text-white font-bold">{files.length} File{files.length > 1 ? 's' : ''} Selected</h4>
                 <label className="text-xs px-3 py-1 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-colors">
                   Add More
                   <input type="file" multiple className="hidden" onChange={(e) => e.target.files && setFiles([...files, ...Array.from(e.target.files)])} />
                 </label>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText size={20} className="text-blue-500 shrink-0" />
                      <p className="text-gray-300 text-sm truncate font-medium">{file.name}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); removeFile(idx); }} className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
             <label className="cursor-pointer flex flex-col items-center gap-4 w-full h-full justify-center py-12">
                <input type="file" multiple className="hidden" onChange={(e) => e.target.files && setFiles([...files, ...Array.from(e.target.files)])} />
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-2">
                  {tool.icon ? <tool.icon size={32} className="text-gray-400" /> : <Upload size={32} className="text-gray-400" />}
                </div>
                <p className="text-white font-bold text-lg">Drop your files here</p>
                <p className="text-gray-500 text-sm">Or click to browse from your computer</p>
             </label>
          )}
        </div>

        <button
          onClick={handleProcess}
          disabled={files.length === 0 || isProcessing}
          className={`w-full py-5 bg-gradient-to-r ${tool.gradient} rounded-2xl font-extrabold shadow-2xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed`}
        >
          {isProcessing ? "Processing..." : "Process Files Now"}
        </button>
      </div>

      <div className="glass rounded-[2.5rem] border-white/5 p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
        {result ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
             <div className="w-24 h-24 bg-emerald-500/10 rounded-full mx-auto flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/10">
                <Check size={48} strokeWidth={3} />
             </div>
             <div>
                <h3 className="text-2xl font-bold text-white mb-2">Done! Your file is ready.</h3>
                <p className="text-gray-500">Processing completed securely via MiniWow engine.</p>
             </div>
             <a 
              href={result} 
              download={`miniwow-result-${files[0]?.name || 'document.pdf'}`}
              className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-extrabold rounded-2xl hover:bg-gray-200 transition-all shadow-2xl hover:scale-105"
             >
               <Download size={20} />
               Download Result
             </a>
          </motion.div>
        ) : (
          <div className="opacity-10 space-y-4 flex flex-col items-center">
             {tool.icon ? <tool.icon size={80} strokeWidth={1} /> : <Type size={80} strokeWidth={1} />}
             <p className="text-xl font-bold">Waiting for processing</p>
          </div>
        )}
      </div>
    </div>
  );
};
