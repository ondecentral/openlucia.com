"use client";

import { useState } from "react";
import hljs from 'highlight.js';


/**
 * This can be used to create code blocks with syntax highlighting. Currenlty only supports TypeScript.
 * 
 * The first parameter passed is the code to be displayed inside of the code block.
 */
const CodeBlock = ({ code, language = "typescript" }: { code: string; language?: string }) => {
    const [copied, setCopied] = useState(false);
   
    // Copys the code to the clipboard and displays a message to the user.
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    };
  
    // Use highlight.js for syntax highlighting
    const highlightedCode = hljs.highlight(code, { language: language as any }).value;
    
    // Post-process to add custom punctuation colors and handle function calls (only for TypeScript)
    let processedCode = highlightedCode;
    
    if (language === 'typescript') {
      // Handle function calls like .init - color them as secondary orange
      processedCode = processedCode.replace(/\.<span class="hljs-title">([^<]+)<\/span>/g, '.<span style="color: rgb(253 186 116)">$1</span>');
      
      // Handle punctuation colors using CSS classes instead of inline styles
      processedCode = processedCode
        .replace(/([{}])/g, '<span class="brace-punctuation">$1</span>') // purple for braces
        .replace(/([()])/g, '<span class="paren-punctuation">$1</span>'); // secondary orange for parentheses
    }
  
    return (
      <div className="relative bg-black rounded-lg overflow-hidden">
        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 z-10 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 border border-gray-600 hover:border-gray-500 shadow-lg"
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </span>
          )}
        </button>
        
        {/* Code content */}
        <pre className="p-4 text-sm overflow-x-auto">
          <code 
            className={`hljs language-${language}`}
            dangerouslySetInnerHTML={{ 
              __html: processedCode 
            }} 
          />
        </pre>
      </div>
    );
  };

  export default CodeBlock;