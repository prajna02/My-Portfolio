import { useState } from 'react'
import { projects } from '../data/content'

export function Projects() {
  const [activeImages, setActiveImages] = useState<Record<string, number>>({})
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    alt: string
  } | null>(null)

  const changeImage = (
    projectName: string,
    direction: number,
    total: number,
  ) => {
    setActiveImages((current) => {
      const currentIndex = current[projectName] ?? 0
      const nextIndex = (currentIndex + direction + total) % total

      return {
        ...current,
        [projectName]: nextIndex,
      }
    })
  }

  return (
    <>
      <section className="section" id="projects">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Projects</h2>
          </div>

          <div className="project-list">
            {projects.map((project) => {
              const currentIndex = activeImages[project.name] ?? 0

              return (
                <article className="project-card" key={project.name}>
                  <div className="project-visual">
                    <div className="project-number">
                      {project.number}
                    </div>

                    <div className="project-gallery">
                      <button
                        className="gallery-image-button"
                        type="button"
                        onClick={() =>
                          setSelectedImage({
                            src: project.screenshots[currentIndex],
                            alt: `${project.name} screenshot ${currentIndex + 1}`,
                          })
                        }
                        aria-label={`Open ${project.name} screenshot in full size`}
                      >
                        <img
                          className="project-shot"
                          src={project.screenshots[currentIndex]}
                          alt={`${project.name} screenshot ${currentIndex + 1}`}
                        />
                      </button>

                      {project.screenshots.length > 1 && (
                        <>
                          <button
                            className="gallery-button gallery-prev"
                            type="button"
                            aria-label="Previous screenshot"
                            onClick={() =>
                              changeImage(
                                project.name,
                                -1,
                                project.screenshots.length,
                              )
                            }
                          >
                            ←
                          </button>

                          <button
                            className="gallery-button gallery-next"
                            type="button"
                            aria-label="Next screenshot"
                            onClick={() =>
                              changeImage(
                                project.name,
                                1,
                                project.screenshots.length,
                              )
                            }
                          >
                            →
                          </button>

                          <div className="gallery-controls">
                            <span className="gallery-count">
                              {currentIndex + 1} / {project.screenshots.length}
                            </span>

                            <div className="gallery-dots">
                              {project.screenshots.map((_, index) => (
                                <button
                                  key={index}
                                  className={
                                    index === currentIndex
                                      ? 'gallery-dot active'
                                      : 'gallery-dot'
                                  }
                                  type="button"
                                  aria-label={`Show screenshot ${index + 1}`}
                                  onClick={() =>
                                    setActiveImages((current) => ({
                                      ...current,
                                      [project.name]: index,
                                    }))
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
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
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>

                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live demo
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Project screenshot preview"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="lightbox-close"
            type="button"
            aria-label="Close screenshot"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <img
            className="lightbox-image"
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}