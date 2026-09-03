import { contactIntro, profile } from '../data/content'

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Let&apos;s Connect</h2>
        </div>
        <div className="contact-panel">
          <div className="contact-copy">
            <p className="contact-kicker">Currently seeking entry-level opportunities</p>
            <p>{contactIntro}</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
          <div className="contact-actions">
            <a
              className="btn btn-primary"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
              target="_blank"
              rel="noreferrer"
            >
              Get in Touch
            </a>
            <div className="contact-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={profile.resumePath} download>
                Download Resume
              </a>
            </div>
            <p className="contact-location">Based in {profile.location}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
