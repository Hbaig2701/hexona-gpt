"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  markdown: string;
}

export default function ResourceDocument({ markdown }: Props) {
  return (
    <article className="rounded-xl bg-hex-dark-800 border border-hex-dark-500 px-6 py-8 md:px-10 md:py-10">
      <div className="prose prose-invert max-w-none doc-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
      <style jsx global>{`
        .doc-prose h1,
        .doc-prose h2,
        .doc-prose h3,
        .doc-prose h4 {
          color: var(--hex-text-primary);
          font-family: "Syne", sans-serif;
          letter-spacing: -0.01em;
        }
        .doc-prose h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          line-height: 1.2;
        }
        .doc-prose h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--hex-dark-500);
        }
        .doc-prose h3 {
          font-size: 1.15rem;
          font-weight: 600;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .doc-prose h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.4rem;
          color: var(--hex-text-secondary);
        }
        .doc-prose p,
        .doc-prose li {
          color: var(--hex-text-secondary);
          line-height: 1.65;
        }
        .doc-prose strong {
          color: var(--hex-text-primary);
          font-weight: 600;
        }
        .doc-prose em {
          color: var(--hex-text-muted);
        }
        .doc-prose ul,
        .doc-prose ol {
          margin: 0.5rem 0 1rem;
          padding-left: 1.5rem;
        }
        .doc-prose li {
          margin: 0.25rem 0;
        }
        .doc-prose blockquote {
          border-left: 3px solid var(--hex-teal);
          background: rgba(0, 196, 204, 0.05);
          color: var(--hex-text-primary);
          margin: 1rem 0;
          padding: 0.75rem 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
          font-style: normal;
        }
        .doc-prose blockquote p {
          color: var(--hex-text-primary);
          margin: 0;
        }
        .doc-prose hr {
          border: none;
          border-top: 1px solid var(--hex-dark-500);
          margin: 2.5rem 0;
        }
        .doc-prose code {
          background: var(--hex-dark-700);
          padding: 0.1rem 0.35rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: var(--hex-teal);
        }
        .doc-prose a {
          color: var(--hex-teal);
          text-decoration: none;
        }
        .doc-prose a:hover {
          text-decoration: underline;
        }
        .doc-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        .doc-prose th,
        .doc-prose td {
          border: 1px solid var(--hex-dark-500);
          padding: 0.5rem 0.75rem;
          text-align: left;
        }
        .doc-prose th {
          background: var(--hex-dark-700);
          color: var(--hex-text-primary);
          font-weight: 600;
        }
      `}</style>
    </article>
  );
}
