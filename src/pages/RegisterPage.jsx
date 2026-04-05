import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageContainer from '../components/common/PageContainer'
import { useAuth } from '../context/AuthContext'

const RegisterPage = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', mobile: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, mobile, password } = form

    if (!name || !mobile || !password) {
      setError('Please complete all fields.')
      return
    }

    const response = register({ name, mobile, password })
    if (!response.success) {
      setError(response.message)
      return
    }
    navigate('/profile')
  }

  return (
    <div className="py-14 sm:py-20">
      <PageContainer>
        <div className="mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-zinc-900">Create your account</h1>
          <p className="mt-2 text-zinc-600">Register now to book products and manage your profile.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700">Name</label>
              <input
                value={form.name}
                onChange={handleChange('name')}
                className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-900"
                placeholder="Your name"
              />
            </div>
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
                placeholder="Create a password"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button className="w-full rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700">
              Create account
            </button>
          </form>

          <p className="mt-6 text-sm text-zinc-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-amber-700 hover:text-amber-800">
              Log in here.
            </Link>
          </p>
        </div>
      </PageContainer>
    </div>
  )
}

export default RegisterPage
