import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type ContactMessage = {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

const API_URL = 'https://my-portfolio-c4b8.onrender.com'

export function AdminDashboard() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    async function loadMessages() {
      try {
        const authResponse = await fetch(`${API_URL}/api/admin/me`, {
          credentials: 'include',
        })
        const authResult = await authResponse.json()

        if (!authResponse.ok || authResult.authenticated !== true) {
          navigate('/admin/login', { replace: true })
          return
        }

        const messagesResponse = await fetch(`${API_URL}/api/admin/messages`, {
          credentials: 'include',
        })
        const messagesResult = await messagesResponse.json()

        if (!messagesResponse.ok) {
          throw new Error(messagesResult.error || 'Unable to load messages.')
        }

        setMessages(messagesResult)
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Unable to load messages. Please try again.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [navigate])

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      await fetch(`${API_URL}/api/admin/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } finally {
      navigate('/admin/login', { replace: true })
    }
  }

  return (
    <main className="admin-shell admin-dashboard-shell">
      <div className="admin-dashboard">
        <header className="admin-dashboard-header">
          <div>
            <p className="admin-eyebrow">Private area</p>
            <h1>Admin Dashboard</h1>
            <p className="admin-intro">Portfolio contact messages</p>
          </div>
          <button className="admin-logout" type="button" onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? 'Signing out...' : 'Log out'}
          </button>
        </header>

        {isLoading && <p className="admin-status">Loading messages...</p>}
        {!isLoading && error && <p className="admin-error" role="alert">{error}</p>}
        {!isLoading && !error && (
          <>
            <div className="admin-count" aria-label={`${messages.length} total messages`}>
              <strong>{messages.length}</strong>
              <span>Total messages</span>
            </div>
            {messages.length === 0 ? (
              <p className="admin-empty">No messages yet.</p>
            ) : (
              <div className="admin-message-list">
                {messages.map((message) => (
                  <article className="admin-message-card" key={message.id}>
                    <div className="admin-message-meta">
                      <div>
                        <h2>{message.subject}</h2>
                        <p>{message.name} &middot; <a href={`mailto:${message.email}`}>{message.email}</a></p>
                      </div>
                      <time dateTime={message.created_at}>
                        {new Date(message.created_at).toLocaleString()}
                      </time>
                    </div>
                    <p className="admin-message-body">{message.message}</p>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
