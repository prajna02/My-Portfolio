import { skillGroups } from '../data/content'

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-head">
          <span className="section-index">02</span>
          <h2 className="section-title">Skills</h2>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.category}>
              <h3>{group.category}</h3>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="skills-footnote">
          Technologies used in internship and academic projects — not a claim of
          expertise in every area.
        </p>
      </div>
    </section>
  )
}
