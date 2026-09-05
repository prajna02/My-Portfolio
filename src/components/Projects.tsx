import {
  useEffect,
  useRef,
  useState,
  type UIEvent,
} from 'react'
import { projects } from '../data/content'

export function Projects() {
  const [activeImages, setActiveImages] = useState<Record<string, number>>({})
  const [selectedImage, setSelectedImage] = useState<{
    projectName: string
    index: number
  } | null>(null)

  const galleryRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const lightboxRef = useRef<HTMLDivElement | null>(null)

  const handleGalleryScroll = (
    projectName: string,
    event: UIEvent<HTMLDivElement>,
  ) => {
    const container = event.currentTarget

    if (!container.clientWidth) return

    const index = Math.round(
      container.scrollLeft / container.clientWidth,
    )

    setActiveImages((current) => ({
      ...current,
      [projectName]: index,
    }))
  }

  const scrollToGalleryImage = (
    projectName: string,
    index: number,
  ) => {
    const gallery = galleryRefs.current[projectName]

    if (!gallery) return

    gallery.scrollTo({
      left: index * gallery.clientWidth,
      behavior: 'smooth',
    })

    setActiveImages((current) => ({
      ...current,
      [projectName]: index,
    }))
  }

  const openLightbox = (
    projectName: string,
    index: number,
  ) => {
    setSelectedImage({
      projectName,
      index,
    })
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const handleLightboxScroll = (
    event: UIEvent<HTMLDivElement>,
  ) => {
    if (!selectedImage) return

    const container = event.currentTarget

    if (!container.clientWidth) return

    const index = Math.round(
      container.scrollLeft / container.clientWidth,
    )

    if (index === selectedImage.index) return

    setSelectedImage((current) => {
      if (!current) return current

      return {
        ...current,
        index,
      }
    })
  }

  const scrollToLightboxImage = (index: number) => {
    const container = lightboxRef.current

    if (!container) return

    container.scrollTo({
      left: index * container.clientWidth,
      behavior: 'smooth',
    })

    setSelectedImage((current) => {
      if (!current) return current

      return {
        ...current,
        index,
      }
    })
  }

  useEffect(() => {
    if (!selectedImage) return

    const container = lightboxRef.current

    if (!container) return

    requestAnimationFrame(() => {
      container.scrollTo({
        left: selectedImage.index * container.clientWidth,
        behavior: 'instant',
      })
    })
  }, [selectedImage?.projectName])

  useEffect(() => {
    if (!selectedImage) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }

      if (event.key === 'ArrowLeft') {
        const project = projects.find(
          (item) => item.name === selectedImage.projectName,
        )

        if (!project) return

        const total = project.screenshots.length
        const previousIndex =
          (selectedImage.index - 1 + total) % total

        scrollToLightboxImage(previousIndex)
      }

      if (event.key === 'ArrowRight') {
        const project = projects.find(
          (item) => item.name === selectedImage.projectName,
        )

        if (!project) return

        const total = project.screenshots.length
        const nextIndex =
          (selectedImage.index + 1) % total

        scrollToLightboxImage(nextIndex)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImage])

  return (
    <>
      <section className="section" id="projects">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Projects</h2>
          </div>

          <div className="project-list">
            {projects.map((project) => {
              const currentIndex =
                activeImages[project.name] ?? 0

              return (
                <article
                  className="project-card"
                  key={project.name}
                >
                  <div className="project-visual">
                    <div className="project-number">
                      {project.number}
                    </div>

                    <div className="project-gallery-wrapper">
                      <div
                        className="project-gallery"
                        ref={(element) => {
                          galleryRefs.current[project.name] =
                            element
                        }}
                        onScroll={(event) =>
                          handleGalleryScroll(
                            project.name,
                            event,
                          )
                        }
                      >
                        {project.screenshots.map(
                          (screenshot, index) => (
                            <button
                              className="gallery-slide"
                              type="button"
                              key={screenshot}
                              onClick={() =>
                                openLightbox(
                                  project.name,
                                  index,
                                )
                              }
                              aria-label={`Open ${project.name} screenshot ${index + 1}`}
                            >
                              <img
                                className="project-shot"
                                src={screenshot}
                                alt={`${project.name} screenshot ${index + 1}`}
                              />
                            </button>
                          ),
                        )}
                      </div>

                      {project.screenshots.length > 1 && (
                        <div className="gallery-controls">
                          <span className="gallery-count">
                            {currentIndex + 1} /{' '}
                            {project.screenshots.length}
                          </span>

                          <div className="gallery-dots">
                            {project.screenshots.map(
                              (_, index) => (
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
                                    scrollToGalleryImage(
                                      project.name,
                                      index,
                                    )
                                  }
                                />
                              ),
                            )}
                          </div>
                        </div>
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
          onClick={closeLightbox}
        >
          <button
            className="lightbox-close"
            type="button"
            aria-label="Close screenshot"
            onClick={closeLightbox}
          >
            ×
          </button>

          <div
            className="lightbox-gallery"
            ref={lightboxRef}
            onScroll={handleLightboxScroll}
            onClick={(event) => event.stopPropagation()}
          >
            {(() => {
              const project = projects.find(
                (item) =>
                  item.name === selectedImage.projectName,
              )

              if (!project) return null

              return project.screenshots.map(
                (screenshot, index) => (
                  <div
                    className="lightbox-slide"
                    key={screenshot}
                  >
                    <img
                      className="lightbox-image"
                      src={screenshot}
                      alt={`${project.name} screenshot ${index + 1}`}
                    />
                  </div>
                ),
              )
            })()}
          </div>

          {(() => {
            const project = projects.find(
              (item) =>
                item.name === selectedImage.projectName,
            )

            if (!project) return null

            return (
              <div
                className="lightbox-controls gallery-controls"
                onClick={(event) =>
                  event.stopPropagation()
                }
              >
                <span className="gallery-count">
                  {selectedImage.index + 1} /{' '}
                  {project.screenshots.length}
                </span>

                <div className="gallery-dots">
                  {project.screenshots.map(
                    (_, index) => (
                      <button
                        key={index}
                        className={
                          index === selectedImage.index
                            ? 'gallery-dot active'
                            : 'gallery-dot'
                        }
                        type="button"
                        aria-label={`Show screenshot ${index + 1}`}
                        onClick={() =>
                          scrollToLightboxImage(index)
                        }
                      />
                    ),
                  )}
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </>
  )
}