import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ markdown }) => {
  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
