import { education } from '../data/content'

export function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-head">
          <span className="section-index">05</span>
          <h2 className="section-title">Education</h2>
        </div>
        <div className="edu-grid">
          {education.map((item) => (
            <article className="edu-card" key={item.degree}>
              <h3>{item.degree}</h3>
              <p>
                {item.school}
                <br />
                {item.location}
              </p>
              <p>{item.dates}</p>
              <p className="gpa">{item.gpa}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
