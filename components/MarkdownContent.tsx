import ReactMarkdown from 'react-markdown';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy } from "lucide-react";
import { useState } from 'react';

interface MarkdownContentProps {
  content: string;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <ReactMarkdown
      components={{
        code({ node, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || '');
          const code = String(children).replace(/\n$/, '');
          
          if (match) {
            return (
              <div className="relative group">
                <SyntaxHighlighter
                  {...props}
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  showLineNumbers
                >
                  {code}
                </SyntaxHighlighter>
                <button
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 
                           transition-opacity duration-200 px-2 py-1 rounded-md 
                           bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600"
                  onClick={() => handleCopy(code)}
                >
                  {copiedCode === code ? (
                    "Copied!"
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            );
          }
          return <code className={className} {...props}>{children}</code>;
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
}