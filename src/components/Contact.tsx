import { contactIntro, profile } from '../data/content'

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-head">
          <span className="section-index">07</span>
          <h2 className="section-title">Let&apos;s Connect</h2>
        </div>
        <div className="contact-panel">
          <p>{contactIntro}</p>
          <div className="btn-row">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              Email Me
            </a>
            <a
              className="btn btn-ghost"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="btn btn-ghost"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a className="btn btn-ghost" href={profile.resumePath} download>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
