import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <article className="card-lift overflow-hidden rounded-3xl border border-zinc-200/80 bg-white">
      <Link to={`/product/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
          {product.isNew ? (
            <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-900 shadow">
              New
            </span>
          ) : null}
        </div>
      </Link>

      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{product.brand}</p>
        <Link to={`/product/${product.slug}`} className="line-clamp-1 font-medium text-zinc-900">
          {product.name}
        </Link>

        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-zinc-900">Rs. {product.price}</p>
          <p className="text-sm text-zinc-400 line-through">Rs. {product.originalPrice}</p>
          <p className="text-xs font-semibold text-emerald-700">-{discount}%</p>
        </div>

        <p className="text-sm text-zinc-600">{product.rating} rating</p>
      </div>
    </article>
  )
}

export default ProductCard
