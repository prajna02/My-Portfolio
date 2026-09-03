import { about } from '../data/content'

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head">
          <span className="section-index">01</span>
          <h2 className="section-title">About</h2>
        </div>
        {about.paragraphs.map((paragraph) => (
          <p className="about-copy" key={paragraph.slice(0, 24)}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
