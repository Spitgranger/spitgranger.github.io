import { FiArrowDown } from 'react-icons/fi';

export default function About() {
  return (
    <section id="about" className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title">Hi, I’m Richard.</h1>
      <p className="hero-intro">
        I’m a software engineer who likes figuring out how things work.
        Lately, that’s meant building a little simulated economy, experimenting
        with coding agents, and getting closer to the hardware.
      </p>
      <p className="hero-note">Software Engineering, McMaster ’25.</p>
      <a className="glass-button" href="#projects">A few things I’ve made <FiArrowDown /></a>
    </section>
  );
}
