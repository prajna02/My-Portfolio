import { experience } from '../data/content'

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Experience</h2>
        </div>
        <div className="timeline">
          {experience.map((role) => (
            <article className="timeline-item" key={role.title}>
              <h3>{role.title}</h3>
              <p className="meta">
                {role.organization} · {role.location} · {role.dates}
              </p>
              <ul>
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
