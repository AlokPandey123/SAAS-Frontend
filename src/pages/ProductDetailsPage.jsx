import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/common/Breadcrumbs'
import PageContainer from '../components/common/PageContainer'
import ProductGrid from '../components/product/ProductGrid'
import ProductGallery from '../components/product/ProductGallery'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

const ProductDetailsPage = () => {
  const { slug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { user, saveBooking } = useAuth()
  const { addItem } = useCart()
  const product = products.find((item) => item.slug === slug)

  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const redirectToLogin = () => {
    navigate('/login', { state: { from: location } })
  }

  const handleAddToCart = () => {
    const color = selectedColor ?? product.colors[0]
    const size = selectedSize ?? product.sizes[0]
    addItem(product, color, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBookItem = () => {
    if (!user) {
      redirectToLogin()
      return
    }

    const color = selectedColor ?? product.colors[0]
    const size = selectedSize ?? product.sizes[0]
    const response = saveBooking({
      productId: product.id,
      productName: product.name,
      price: product.price,
      color,
      size,
    })

    if (response.success) {
      setBooked(true)
      setTimeout(() => setBooked(false), 2500)
    }
  }

  

  const similarProducts = useMemo(() => {
    if (!product) {
      return []
    }

    return products
      .filter((item) => item.category === product.category && item.slug !== product.slug)
      .slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <PageContainer className="py-20">
        <p className="text-zinc-700">Product not found.</p>
        <Link to="/" className="mt-4 inline-flex text-sm font-semibold text-amber-700">
          Back to home
        </Link>
      </PageContainer>
    )
  }

  return (
    <div className="py-10 sm:py-14">
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: product.category, to: `/category/${product.category}` },
            { label: product.name },
          ]}
        />

        <section className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGallery images={product.images} alt={product.name} />

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{product.brand}</p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-900">{product.name}</h1>

            <div className="mt-5 flex items-center gap-3">
              <p className="text-2xl font-semibold text-zinc-900">Rs. {product.price}</p>
              <p className="text-zinc-400 line-through">Rs. {product.originalPrice}</p>
            </div>

            <p className="mt-2 text-sm text-zinc-600">
              {product.rating} rating ({product.reviews} reviews)
            </p>
            <p className="mt-5 text-zinc-700">{product.description}</p>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-700">Colors</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const active = (selectedColor ?? product.colors[0]) === color
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-full border px-3 py-1 text-sm transition ${
                          active
                            ? 'border-zinc-900 bg-zinc-900 text-white'
                            : 'border-zinc-300 hover:border-zinc-600'
                        }`}
                      >
                        {color}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-700">Sizes</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const active = (selectedSize ?? product.sizes[0]) === size
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-full border px-4 py-1.5 text-sm transition ${
                          active
                            ? 'border-zinc-900 bg-zinc-900 text-white'
                            : 'border-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={handleAddToCart}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-900 text-white hover:bg-zinc-700'
                }`}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBookItem}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  booked
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 text-zinc-900 hover:bg-amber-400'
                }`}
              >
                {booked ? 'Booked Successfully' : 'Book This Item'}
              </button>
            </div>
            {!user && (
              <p className="mt-3 text-sm text-zinc-600">
                You must be{' '}
                <button onClick={redirectToLogin} className="font-semibold text-amber-700 hover:text-amber-900">
                  logged in
                </button>{' '}
                to book this item.
              </p>
            )}


            <div className="mt-8 border-t border-zinc-200 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">Product Details</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {similarProducts.length ? (
          <section className="mt-16">
            <div className="mb-6 flex items-center justify-between gap-2">
              <h2 className="text-2xl font-semibold text-zinc-900">You May Also Like</h2>
              <Link
                to={`/category/${product.category}`}
                className="text-sm font-semibold text-amber-700 hover:text-amber-800"
              >
                View all
              </Link>
            </div>
            <ProductGrid products={similarProducts} />
          </section>
        ) : null}
      </PageContainer>
    </div>
  )
}

export default ProductDetailsPage
