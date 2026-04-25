import { 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Sparkles, 
  FileSearch, 
  FileArchive,
  Shrink,
  Scissors,
  Type,
  FileDigit,
  Wand2,
  Trash2,
  Lock,
  Unlock,
  RotateCw,
  Layout,
  Music,
  FileEdit,
  Eraser,
  Split,
  Layers,
  FileCode,
  FileJson,
  Hash,
  Clock,
  SpellCheck,
  Languages,
  Zap,
  Camera,
  Globe,
  Film,
  Scan,
  Palette,
  PenTool,
  FileSignature,
  FileType,
  Table,
  Braces,
  Code,
  LayoutList,
  FileSpreadsheet
} from "lucide-react";

export const TOOL_CATEGORIES = [
  { id: "pdf", label: "PDF Tools", icon: FileText, color: "text-red-500" },
  { id: "image", label: "Image Tools", icon: ImageIcon, color: "text-blue-500" },
  { id: "video", label: "Video", icon: Video, color: "text-purple-500" },
  { id: "ai", label: "AI Writing", icon: Sparkles, color: "text-pink-500" },
  { id: "writing", label: "Writing", icon: Type, color: "text-emerald-500" },
  { id: "file", label: "File Conversion", icon: FileDigit, color: "text-amber-500" }
];

export const TOOLS = [
  // PDF TOOLS
  {
    title: "Merge PDF",
    slug: "merge-pdf",
    description: "Combine multiple PDF files into one document.",
    icon: FileArchive,
    category: "PDF",
    gradient: "from-orange-500 to-yellow-400"
  },
  {
    title: "Split PDF",
    slug: "split-pdf",
    description: "Extract pages from your PDF or save each page as a separate PDF.",
    icon: Split,
    category: "PDF",
    gradient: "from-red-600 to-orange-500"
  },
  {
    title: "PDF to Word",
    slug: "pdf-to-word",
    description: "Convert PDF documents to editable Microsoft Word files.",
    icon: FileText,
    category: "PDF",
    gradient: "from-blue-600 to-indigo-500"
  },
  {
    title: "Word to PDF",
    slug: "word-to-pdf",
    description: "Convert Microsoft Word documents to PDF for easy sharing.",
    icon: FileText,
    category: "PDF",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    title: "PDF to JPG",
    slug: "pdf-to-jpg",
    description: "Extract all images from a PDF or convert pages into JPEG images.",
    icon: ImageIcon,
    category: "PDF",
    gradient: "from-orange-400 to-red-400"
  },
  {
    title: "Protect PDF",
    slug: "protect-pdf",
    description: "Add a password and encrypt your PDF file.",
    icon: Lock,
    category: "PDF",
    gradient: "from-gray-700 to-gray-900"
  },
  {
    title: "Unlock PDF",
    slug: "unlock-pdf",
    description: "Remove password protection from your PDF.",
    icon: Unlock,
    category: "PDF",
    gradient: "from-emerald-500 to-teal-400"
  },

  // IMAGE TOOLS
  {
    title: "Image Compressor",
    slug: "image-compressor",
    description: "Reduce file size without quality loss.",
    icon: Shrink,
    category: "Image",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    title: "Resize Image",
    slug: "resize-image",
    description: "Change the dimensions of your image in pixels or percentage.",
    icon: Layout,
    category: "Image",
    gradient: "from-indigo-500 to-purple-400"
  },
  {
    title: "Background Remover",
    slug: "remove-bg",
    description: "Remove backgrounds from images instantly.",
    icon: Wand2,
    category: "Image",
    gradient: "from-teal-500 to-emerald-400"
  },
  {
    title: "Image to Text (OCR)",
    slug: "image-to-text",
    description: "Extract text from your image files.",
    icon: FileSearch,
    category: "Image",
    gradient: "from-indigo-600 to-blue-500"
  },
  {
    title: "Crop Image",
    slug: "crop-image",
    description: "Cut out specific areas of your image.",
    icon: Scissors,
    category: "Image",
    gradient: "from-pink-500 to-rose-400"
  },

  // VIDEO TOOLS
  {
    title: "Video to GIF",
    slug: "video-to-gif",
    description: "Convert your video clips into animated GIF files.",
    icon: Video,
    category: "Video",
    gradient: "from-purple-600 to-indigo-600"
  },
  {
    title: "Extract Audio",
    slug: "extract-audio",
    description: "Extract high-quality audio from any video format.",
    icon: Music,
    category: "Video",
    gradient: "from-cyan-500 to-blue-400"
  },
  {
    title: "Compress Video",
    slug: "compress-video",
    description: "Reduce video file size for sharing.",
    icon: Shrink,
    category: "Video",
    gradient: "from-blue-600 to-purple-600"
  },

  // AI TOOLS
  {
    title: "AI Paragraph Writer",
    slug: "ai-writer",
    description: "Generate professional paragraphs on any topic.",
    icon: Sparkles,
    category: "AI",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Sentence Rewriter",
    slug: "sentence-rewriter",
    description: "Rewrite sentences to improve clarity and tone.",
    icon: FileEdit,
    category: "AI",
    gradient: "from-blue-400 to-indigo-400"
  },
  {
    title: "Grammar Fixer",
    slug: "grammar-fixer",
    description: "Fix grammar and spelling mistakes instantly.",
    icon: SpellCheck,
    category: "AI",
    gradient: "from-emerald-400 to-teal-500"
  },

  // WRITING TOOLS
  {
    title: "Word Counter",
    slug: "word-counter",
    description: "Count words, characters, and sentences in your text.",
    icon: Zap,
    category: "Writing",
    gradient: "from-orange-500 to-amber-400"
  },
  {
    title: "Case Converter",
    slug: "case-converter",
    description: "Convert text to UPPERCASE, lowercase, CamelCase, etc.",
    icon: Type,
    category: "Writing",
    gradient: "from-indigo-400 to-blue-400"
  },
  {
    title: "JSON Formatter",
    slug: "json-formatter",
    description: "Format and validate your JSON data.",
    icon: FileJson,
    category: "Writing",
    gradient: "from-gray-600 to-gray-800"
  }
];

// Dynamically generate variants to reach 200+
const formats = ["PNG", "JPG", "WebP", "GIF", "TIFF", "BMP", "SVG", "PDF", "Doc", "Docx", "Excel", "JSON", "XML", "CSV"];

const getFormatIcon = (format: string) => {
  const iconMap: Record<string, any> = {
    "PNG": ImageIcon,
    "JPG": Camera,
    "WebP": Globe,
    "GIF": Film,
    "TIFF": Scan,
    "BMP": Palette,
    "SVG": PenTool,
    "PDF": FileText,
    "Doc": FileSignature,
    "Docx": FileType,
    "Excel": FileSpreadsheet,
    "JSON": Braces,
    "XML": Code,
    "CSV": LayoutList
  };
  return iconMap[format] || RotateCw;
};

const getFormatGradient = (format: string) => {
  const gradientMap: Record<string, string> = {
    "PNG": "from-blue-400 to-indigo-500",
    "JPG": "from-rose-400 to-red-500",
    "WebP": "from-teal-400 to-emerald-500",
    "GIF": "from-fuchsia-500 to-pink-500",
    "TIFF": "from-orange-400 to-amber-500",
    "BMP": "from-cyan-400 to-blue-500",
    "SVG": "from-violet-500 to-purple-500",
    "PDF": "from-red-500 to-rose-600",
    "Doc": "from-blue-500 to-cyan-500",
    "Docx": "from-indigo-500 to-blue-600",
    "Excel": "from-emerald-500 to-green-600",
    "JSON": "from-yellow-400 to-orange-500",
    "XML": "from-sky-400 to-blue-500",
    "CSV": "from-green-400 to-teal-500"
  };
  return gradientMap[format] || "from-gray-500 to-gray-400";
};

formats.forEach(from => {
  formats.forEach(to => {
    if (from !== to) {
      if (TOOLS.length < 250) {
        TOOLS.push({
          title: `${from} to ${to} Converter`,
          slug: `${from.toLowerCase()}-to-${to.toLowerCase()}`,
          description: `Convert ${from} files into ${to} format quickly and securely.`,
          icon: getFormatIcon(from),
          category: "File Conversion",
          gradient: getFormatGradient(from)
        });
      }
    }
  });
});
