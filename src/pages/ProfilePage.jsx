import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/common/Breadcrumbs'
import PageContainer from '../components/common/PageContainer'
import { useAuth } from '../context/AuthContext'

const ProfilePage = () => {
  const { user, logout, userBookings } = useAuth()

  if (!user) {
    return (
      <PageContainer className="py-20">
        <p className="text-zinc-700">Please log in to view your profile.</p>
        <Link to="/login" className="mt-4 inline-flex text-sm font-semibold text-amber-700">
          Go to login
        </Link>
      </PageContainer>
    )
  }

  return (
    <div className="py-10 sm:py-14">
      <PageContainer>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Profile' }]} />

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-zinc-900">Hello, {user.name}</h1>
            <p className="mt-2 text-zinc-600">Manage your bookings and update your account information.</p>
            <div className="mt-6 space-y-3 text-sm text-zinc-700">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Mobile</p>
                <p className="mt-1 font-medium text-zinc-900">{user.mobile}</p>
              </div>
              <button
                onClick={logout}
                className="mt-4 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-900">Your Bookings</h2>
            {userBookings.length === 0 ? (
              <p className="mt-4 text-zinc-600">No bookings yet. Book a product to see it here.</p>
            ) : (
              <div className="mt-5 space-y-4">
                {userBookings.map((booking) => (
                  <div key={booking.id} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-sm font-semibold text-zinc-900">{booking.productName}</p>
                    <p className="mt-1 text-sm text-zinc-600">Color: {booking.color} • Size: {booking.size}</p>
                    <p className="mt-2 text-sm text-zinc-600">Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900">Total: Rs. {booking.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default ProfilePage
