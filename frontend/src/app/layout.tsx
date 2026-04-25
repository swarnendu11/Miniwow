import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "MiniWow | Free AI, PDF & Image Tools",
  description: "A premium suite of utility tools for PDF processing, image optimization, and AI text generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="bg-mesh min-h-screen text-gray-200 selection:bg-blue-500/30">
        <ClerkProvider>
          <Navbar />
          
          <main className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
            {children}
          </main>
          
          <footer className="border-t border-white/5 py-12 px-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} MiniWow. Built for speed and productivity.</p>
          </footer>
          <Toaster position="bottom-right" theme="dark" />
        </ClerkProvider>
      </body>
    </html>
  );
}
