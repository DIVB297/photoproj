"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [expression, setExpression] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeExpression = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-expression', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: 'https://masti-uploads.s3.ap-south-1.amazonaws.com/uploads/pic.jpeg'
        }),
      });
      
      const data = await response.json();
      setExpression(data.expression);
      setConfidence(data.confidence);
    } catch (error) {
      console.error('Error analyzing expression:', error);
      setExpression('Error analyzing image');
      setConfidence(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getExpressionColor = (expr: string | null) => {
    if (!expr) return '';
    
    const lowerExpr = expr.toLowerCase();
    if (lowerExpr.includes('happy') || lowerExpr.includes('joy') || lowerExpr.includes('excited')) {
      return 'text-green-600 bg-green-100 border-green-300';
    } else if (lowerExpr.includes('sad') || lowerExpr.includes('sorrow')) {
      return 'text-blue-600 bg-blue-100 border-blue-300';
    } else if (lowerExpr.includes('angry') || lowerExpr.includes('mad')) {
      return 'text-red-600 bg-red-100 border-red-300';
    } else if (lowerExpr.includes('surprised') || lowerExpr.includes('shock')) {
      return 'text-yellow-600 bg-yellow-100 border-yellow-300';
    } else if (lowerExpr.includes('fearful') || lowerExpr.includes('fear')) {
      return 'text-orange-600 bg-orange-100 border-orange-300';
    } else if (lowerExpr.includes('disgusted') || lowerExpr.includes('disgust')) {
      return 'text-pink-600 bg-pink-100 border-pink-300';
    } else if (lowerExpr.includes('neutral') || lowerExpr.includes('calm') || lowerExpr.includes('relaxed')) {
      return 'text-gray-600 bg-gray-100 border-gray-300';
    } else if (lowerExpr.includes('focused') || lowerExpr.includes('thoughtful') || lowerExpr.includes('serious')) {
      return 'text-indigo-600 bg-indigo-100 border-indigo-300';
    } else if (lowerExpr.includes('confident')) {
      return 'text-emerald-600 bg-emerald-100 border-emerald-300';
    } else {
      return 'text-purple-600 bg-purple-100 border-purple-300';
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <h1 className="text-4xl font-bold mb-8 text-zinc-800 dark:text-white">Divansh Bajaj</h1>
      
      <div className="flex flex-col items-center space-y-6">
        <Image 
          src="https://masti-uploads.s3.ap-south-1.amazonaws.com/uploads/pic.jpeg" 
          height={300} 
          width={300} 
          alt="pic"
          className="rounded-lg shadow-lg"
        />
        
        <button
          onClick={analyzeExpression}
          disabled={isAnalyzing}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Expression'}
        </button>
        
        {expression && (
          <div className={`px-6 py-3 rounded-xl font-semibold border-2 ${getExpressionColor(expression)} shadow-md`}>
            <div className="text-lg">Expression: {expression}</div>
            {confidence && (
              <div className="text-sm mt-1 opacity-80">
                Confidence: {confidence}%
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 
