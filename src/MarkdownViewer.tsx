import React from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownViewer.css'; 

// 이 컴포넌트는 'content'라는 이름으로 마크다운 문자열을 받습니다.
interface MarkdownViewerProps {
  content: string;
}

// ⬇️ 'MarkdownViewer'라는 이름으로 default export를 해야 합니다.
export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="markdown-body">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}