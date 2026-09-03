import { certifications } from '../data/content'

export function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Certifications & Achievements</h2>
        </div>
        <ul className="cert-list">
          {certifications.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
