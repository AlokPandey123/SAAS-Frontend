import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import PageContainer from './PageContainer'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/category/women', label: 'Women' },
  { to: '/category/men', label: 'Men' },
  { to: '/category/kids', label: 'Kids' },
]

const Header = () => {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/90 backdrop-blur">
      <PageContainer className="flex h-18 items-center justify-between gap-6">
        <Link to="/" className="font-serif text-2xl tracking-wide text-zinc-900">
          SOLARA
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50">
            Search
          </button>
          <Link
            to="/cart"
            className="relative rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-zinc-900">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
              >
                {user.name.split(' ')[0]}
              </Link>
              <button
                onClick={logout}
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-amber-400"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </PageContainer>
    </header>
  )
}

export default Header
