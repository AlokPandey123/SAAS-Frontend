import { Link } from 'react-router-dom'
import PageContainer from '../components/common/PageContainer'

const NotFoundPage = () => {
  return (
    <PageContainer className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-zinc-900 sm:text-4xl">Page Not Found</h1>
      <p className="mt-3 max-w-md text-zinc-600">
        The page you requested does not exist. Continue shopping from the homepage.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
      >
        Go Home
      </Link>
    </PageContainer>
  )
}

export default NotFoundPage
