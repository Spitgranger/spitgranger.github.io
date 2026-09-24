import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { notes } from '../lib/notes';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function NotePage({ slug }: { slug: string }) {
  const note = notes.find(item => item.slug === slug);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content') || '';
    document.title = `${note?.title || 'Note not found'} — Richard Fan`;
    if (note) description?.setAttribute('content', note.summary);
    window.scrollTo({ top: 0, behavior: 'instant' });
    heading.current?.focus({ preventScroll: true });
    return () => {
      document.title = previousTitle;
      description?.setAttribute('content', previousDescription);
    };
  }, [note]);

  return (
    <article className="note-page">
      <a className="text-link" href="#writing">← All writing</a>
      {note ? <>
        <div className="note-meta"><span>{note.topic}</span><span>{note.minutes} min read</span>{note.draft && <span className="draft-label">Draft</span>}</div>
        <h1 ref={heading} tabIndex={-1}>{note.title}</h1>
        <p className="note-summary">{note.summary}</p>
        {note.draft && <p className="note-draft-notice">Draft note · still being edited.</p>}
        <div className="note-prose"><Markdown skipHtml remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{note.body}</Markdown></div>
        <a className="glass-button" href="#writing">← Back to writing</a>
      </> : <>
        <h1 ref={heading} tabIndex={-1}>Note not found.</h1>
        <p className="note-summary">That note may have moved. You can find the current notes in the writing section.</p>
      </>}
    </article>
  );
}
