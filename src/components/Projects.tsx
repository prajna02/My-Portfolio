import { projects } from '../data/content'

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-head">
          <span className="section-index">03</span>
          <h2 className="section-title">Projects</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <div>
                <div className="project-number">{project.number}</div>
                <div className="project-shot">Screenshot later</div>
              </div>
              <div className="project-body">
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <p className="role">
                  <strong>Role. </strong>
                  {project.role}
                </p>
                <p className="testing">
                  <strong>Testing. </strong>
                  {project.testing}
                </p>
                <ul className="chips">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live demo
                    </a>
                  ) : (
                    <span className="muted-link">Live demo coming soon</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
