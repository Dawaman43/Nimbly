import React from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  language?: string;
  code: string;
  className?: string;
}

export function CodeBlock({ language, code, className }: CodeBlockProps) {
  return (
    <div className={cn("relative group", className)}>
      <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-sm font-mono">
        {language && (
          <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
            {language}
          </div>
        )}
        <code className="text-foreground">{code}</code>
      </pre>
    </div>
  );
}
