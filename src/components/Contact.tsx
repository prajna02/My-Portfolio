import { useState, type ChangeEvent, type FormEvent } from 'react'
import { contactIntro, profile } from '../data/content'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('')

    if (Object.values(formData).some((value) => !value.trim())) {
      setStatus('Please fill in all fields.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message.')
      }

      setStatus('Thank you. Your message has been sent successfully.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to send your message.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              href={`mailto:${profile.email}`}
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
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Subject
              <input name="subject" value={formData.subject} onChange={handleChange} required />
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {status && <p className="contact-status" role="status">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
