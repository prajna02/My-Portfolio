import { profile } from '../data/content'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">{profile.location}</p>
          <h1>{profile.name}</h1>
          <p className="headline">{profile.headline}</p>
          <p className="bio">{profile.bio}</p>
          <div className="btn-row">
            <a className="btn btn-primary" href="#projects">
              View projects
            </a>
            <a className="btn btn-ghost" href={profile.resumePath} download>
              Download Resume
            </a>
          </div>
        </div>
        <div className="photo-wrap">
          {profile.photo ? (
            <img
              className="photo"
              src={profile.photo}
              alt={`${profile.name} professional portrait`}
            />
          ) : (
            <div className="photo-placeholder" aria-label="Profile photo placeholder">
              PK
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
