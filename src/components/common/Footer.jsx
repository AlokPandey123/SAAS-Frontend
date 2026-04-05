import PageContainer from './PageContainer'

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-white/85">
      <PageContainer className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-xl text-zinc-900">SOLARA</p>
          <p className="mt-3 text-sm text-zinc-600">
            Everyday fashion designed with comfort, clean lines, and optimistic color.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Seasonal Edit</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">Support</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            <li>Track Order</li>
            <li>Returns</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">Stay Updated</h3>
          <div className="mt-4 flex rounded-full border border-zinc-300 bg-white p-1">
            <input
              className="w-full bg-transparent px-3 text-sm text-zinc-700 outline-none"
              placeholder="Email address"
            />
            <button className="rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-amber-400">
              Join
            </button>
          </div>
        </div>
      </PageContainer>
    </footer>
  )
}

export default Footer
