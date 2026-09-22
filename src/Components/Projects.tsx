import { useState } from 'react';
import { FiArrowUpRight, FiBox, FiCpu, FiGitBranch, FiRadio, FiTrendingUp } from 'react-icons/fi';

const projects = [
  { name: 'Pi subagent extension', repo: 'pi-subagent-extension', category: 'AI & tooling', description: 'An extension for the Pi coding agent that gives delegates their own persistent context, with follow-up conversations, live activity streaming, and per-agent usage tracking.', tags: ['TypeScript', 'AI agents', 'RPC'], icon: FiGitBranch, style: 'agents' },
  { name: 'Economy simulator', repo: 'economy-simulator', category: 'Systems', description: 'An agent-based simulation of households, firms, banks, and government. Built in Rust with deterministic replay, a double-entry ledger, and an optional native 3D city view.', tags: ['Rust', 'Simulation', 'Macroquad'], icon: FiTrendingUp, style: 'economy' },
  { name: 'SyncMaster', repo: 'SyncMaster', category: 'Web & cloud', description: 'A team capstone project for the City of Hamilton: a serverless document platform with an S3-backed file system, indexed metadata, and role-based access control.', tags: ['Next.js', 'TypeScript', 'AWS'], icon: FiBox, style: 'cloud' },
  { name: 'DroneStrobe', repo: 'DroneStrobe', category: 'Systems', description: 'An ESP32-based remote illumination system using LoRa radio, with device pairing, battery monitoring, and support for multiple receivers.', tags: ['C', 'ESP-IDF', 'LoRa'], icon: FiRadio, style: 'radio' },
  { name: 'CNES emulator', repo: 'CNES-Emu', category: 'Systems', description: 'An exploratory NES emulator built to study computer architecture, idiomatic C++, and testing, using SDL, CMake, and GoogleTest.', tags: ['C++', 'SDL', 'GoogleTest'], icon: FiCpu, style: 'emulator' },
];
const filters = ['All projects', 'AI & tooling', 'Systems', 'Web & cloud'];

export default function Projects() {
  const [filter, setFilter] = useState('All projects');
  const visible = projects.filter(project => filter === 'All projects' || project.category === filter);

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <div className="section-heading">
        <h2 id="projects-title">Things I’ve been working on</h2>
        <a className="text-link" href="https://github.com/Spitgranger?tab=repositories" target="_blank" rel="noopener noreferrer">All repositories <FiArrowUpRight /></a>
      </div>
      <div className="project-filters" role="group" aria-label="Filter projects">
        {filters.map(item => (
          <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>
        ))}
      </div>
      <p className="sr-only" role="status">Showing {visible.length} projects</p>
      <div className="project-list">
        {visible.map(project => (
          <article key={project.repo} className={`project-card ${project.style}`}>
            <div className="project-icon" aria-hidden="true"><project.icon /></div>
            <div className="project-body">
              <a className="project-title" href={`https://github.com/Spitgranger/${project.repo}`} target="_blank" rel="noopener noreferrer">
                <h3>{project.name}</h3><FiArrowUpRight />
                <span className="sr-only"> — view repository on GitHub</span>
              </a>
              <p className="project-description">{project.description}</p>
              <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
