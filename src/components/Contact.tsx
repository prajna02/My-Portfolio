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

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('')

    const name = formData.name.trim()
    const email = formData.email.trim()
    const subject = formData.subject.trim()
    const message = formData.message.trim()

    // Name validation
    if (!name) {
      setStatus('Please enter your name.')
      return
    }

    if (name.length < 2 || name.length > 100) {
      setStatus('Name must be between 2 and 100 characters.')
      return
    }

    // Email validation
    if (!email) {
      setStatus('Please enter your email address.')
      return
    }

    const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/

if (!emailPattern.test(email)) {
  setStatus('Please enter a valid email address.')
  return
}

    if (email.length > 254) {
      setStatus('Email address is too long.')
      return
    }

    // Subject validation
    if (!subject) {
      setStatus('Please enter a subject.')
      return
    }

    if (subject.length < 3 || subject.length > 200) {
      setStatus('Subject must be between 3 and 200 characters.')
      return
    }

    // Message validation
    if (!message) {
      setStatus('Please enter your message.')
      return
    }

    if (message.length < 10 || message.length > 5000) {
      setStatus('Message must be between 10 and 5000 characters.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(
        'https://my-portfolio-c4b8.onrender.com/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
          }),
        },
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message.')
      }

      setStatus('Thank you. Your message has been sent successfully.')

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : 'Unable to send your message.',
      )
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
            <p className="contact-kicker">
              Currently seeking entry-level opportunities
            </p>

            <p>{contactIntro}</p>

            <a
              className="contact-email"
              href={`mailto:${profile.email}`}
            >
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
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a href={profile.resumePath} download>
                Download Resume
              </a>
            </div>

            <p className="contact-location">
              Based in {profile.location}
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                maxLength={100}
                required
              />
            </label>

            <label>
              Email
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={254}
                required
              />
            </label>

            <label>
              Subject
              <input
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                maxLength={200}
                required
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                maxLength={5000}
                required
              />
            </label>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {status && (
              <p className="contact-status" role="status">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}