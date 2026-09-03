import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:5000'

export function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Unable to log in.')
      }

      navigate('/admin', { replace: true })
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : 'Unable to log in. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="admin-shell">
      <section className="admin-auth-card" aria-labelledby="admin-login-title">
        <Link className="admin-back-link" to="/">
          Back to portfolio
        </Link>
        <p className="admin-eyebrow">Private area</p>
        <h1 id="admin-login-title">Admin Login</h1>
        <p className="admin-intro">Sign in to view portfolio contact messages.</p>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="btn btn-primary admin-submit" type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  )
}
