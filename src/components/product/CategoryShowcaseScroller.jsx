import { Link } from 'react-router-dom'

const CategoryShowcaseScroller = ({ categoryId, categoryName, products }) => {
  const cards = products.slice(0, 8)

  if (!cards.length) {
    return null
  }

  // Duplicate cards to create a smooth infinite marquee effect.
  const scrollerCards = [...cards, ...cards]

  return (
    <section className="mt-7 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Featured Scroll</p>
          <h2 className="mt-1 text-xl font-semibold text-zinc-900">Trending in {categoryName}</h2>
        </div>
        <Link
          to={`/category/${categoryId}`}
          className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
        >
          View all
        </Link>
      </div>

      <div className="scroller-mask">
        <div className="scroller-track">
          {scrollerCards.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              to={`/product/${product.slug}`}
              className="scroller-card card-lift"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-36 w-full rounded-2xl object-cover sm:h-40"
              />
              <p className="mt-3 line-clamp-1 text-sm font-semibold text-zinc-900">{product.name}</p>
              <p className="mt-1 text-xs text-zinc-500">Rs. {product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryShowcaseScroller
