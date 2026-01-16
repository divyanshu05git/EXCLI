"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Pencil, Share2, Users2, Sparkles, Github, Download } from "lucide-react";
import Link from "next/link";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Topbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
            <path d="M8 32L16 8L24 32L32 12" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-2xl font-bold text-gray-900">EXCALIDRAW</span>
        </div>
         <Link href={"/signin"}>
        <Button variant="secondary" size="sm" className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">
          Sign in
        </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative max-w-6xl mx-auto px-8 pt-20 pb-32">
        {/* Decorative doodles */}
        <div className="absolute top-10 left-20 w-24 h-16 border-2 border-red-300 rounded-lg transform -rotate-6">
          <span className="absolute -top-6 left-2 text-red-400 text-sm font-handwriting">knowledge</span>
        </div>
        
        <div className="absolute top-32 left-4 w-20 h-12 border-2 border-blue-300 rounded-lg transform rotate-12">
          <span className="absolute -bottom-6 left-0 text-blue-400 text-sm">allosaurus</span>
        </div>

        <div className="absolute top-20 right-32 w-28 h-14 border-2 border-green-300 rounded-lg transform rotate-3">
          <span className="absolute -top-6 right-0 text-green-400 text-sm">randomthread</span>
        </div>

        <div className="absolute bottom-40 right-20 w-24 h-12 border-2 border-yellow-300 rounded-lg transform -rotate-6">
          <span className="absolute -bottom-6 left-2 text-yellow-600 text-sm">visualize</span>
        </div>

        {/* Floating circles */}
        <div className="absolute top-40 left-1/4 w-4 h-4 rounded-full bg-orange-200 opacity-60"></div>
        <div className="absolute top-60 right-1/3 w-3 h-3 rounded-full bg-yellow-200 opacity-60"></div>
        <div className="absolute bottom-60 left-1/3 w-5 h-5 rounded-full bg-pink-200 opacity-60"></div>
        <div className="absolute top-80 right-1/4 w-4 h-4 rounded-full bg-green-200 opacity-60"></div>

        {/* Squiggly lines */}
        <svg className="absolute top-60 left-10 w-32 h-24 opacity-30" viewBox="0 0 100 100">
          <path d="M10,50 Q30,20 50,50 T90,50" stroke="#a78bfa" strokeWidth="2" fill="none"/>
        </svg>
        
        <svg className="absolute bottom-32 right-40 w-40 h-32 opacity-30" viewBox="0 0 100 100">
          <path d="M10,50 Q30,80 50,50 T90,50" stroke="#60a5fa" strokeWidth="2" fill="none"/>
        </svg>

        {/* Main content */}
        <div className="text-center relative z-10">
          <h1 className="text-6xl font-bold mb-8">
            <span className="text-gray-900">Step up your </span>
            <span className="relative inline-block">
              <span className="text-indigo-600 font-handwriting relative z-10">Excalidraw game</span>
              <span className="absolute inset-0 bg-indigo-100 rounded-lg -rotate-1 transform scale-110"></span>
            </span>
          </h1>

          <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto">
            Save your drawings to the cloud. Collaborate seamlessly. Unlock additional features.
          </p>

          <p className="text-lg text-gray-600 mb-8">
            Support open-source development.
          </p>

          <button className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors shadow-md">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span>114.5k on Github</span>
          </button>

          {/* Arrow pointing down */}
          <div className="mt-20">
            <svg className="w-16 h-32 mx-auto text-gray-400" viewBox="0 0 40 80" fill="none">
              <path d="M20 5 L20 65 M20 65 L10 55 M20 65 L30 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="20" cy="70" r="5" fill="white" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </main>

      <style jsx>{`
        .font-handwriting {
          font-family: 'Comic Sans MS', cursive;
        }
      `}</style>
    </div>
  );
}

export default App;