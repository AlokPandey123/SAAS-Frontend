import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PageContainer from '../components/common/PageContainer'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ mobile: '', password: '' })
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/profile'

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const response = login({ mobile: form.mobile, password: form.password })
    if (!response.success) {
      setError(response.message)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="py-14 sm:py-20">
      <PageContainer>
        <div className="mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-zinc-900">Welcome back</h1>
          <p className="mt-2 text-zinc-600">Log in to book items and manage your profile.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700">Mobile Number</label>
              <input
                value={form.mobile}
                onChange={handleChange('mobile')}
                type="tel"
                className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-900"
                placeholder="Enter your mobile number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">Password</label>
              <input
                value={form.password}
                onChange={handleChange('password')}
                type="password"
                className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-900"
                placeholder="Enter your password"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button className="w-full rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700">
              Log in
            </button>
          </form>

          <p className="mt-6 text-sm text-zinc-600">
            New here?{' '}
            <Link to="/register" className="font-semibold text-amber-700 hover:text-amber-800">
              Create an account.
            </Link>
          </p>
        </div>
      </PageContainer>
    </div>
  )
}

export default LoginPage
