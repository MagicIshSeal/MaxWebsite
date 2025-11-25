'use client';

import { useState } from 'react';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export default function CodeSnippet({ code, language = 'javascript' }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 overflow-hidden">
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-wide">
          {language}.code
        </span>
        <button
          onClick={handleCopy}
          className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-wide"
        >
          {copied ? '[Copied]' : '[Copy]'}
        </button>
      </div>
      <div className="p-6 overflow-x-auto">
        <pre className="text-sm text-slate-300 font-mono">
          <code className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
