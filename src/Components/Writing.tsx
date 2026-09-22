import { FiArrowUpRight } from 'react-icons/fi';
import { notes } from '../lib/notes';

export default function Writing() {
  return (
    <section id="writing" className="writing-section" aria-labelledby="writing-title">
      <div className="section-heading"><h2 id="writing-title">Notes from the workbench</h2></div>
      <p className="writing-intro">Small things worth writing down while building.</p>
      <div className="writing-list">
        {notes.map(note => (
          <a className="writing-link" key={note.slug} href={`#/writing/${note.slug}`}>
            <div className="note-meta"><span>{note.topic}</span><span>{note.minutes} min read</span>{note.draft && <span className="draft-label">Draft</span>}</div>
            <h3>{note.title}<FiArrowUpRight aria-hidden="true" /></h3>
            <p>{note.summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
