import { Link } from 'react-router-dom'
import PageContainer from '../components/common/PageContainer'
import SectionTitle from '../components/common/SectionTitle'
import ProductGrid from '../components/product/ProductGrid'
import { categories, products } from '../data/products'

const HomePage = () => {
  return (
    <div>
      <section className="soft-grid-bg border-b border-zinc-200/80 py-16 sm:py-24">
        <PageContainer className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Spring Summer Edit
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Light, confident looks built for every day.
            </h1>
            <p className="mt-6 max-w-xl text-zinc-600 sm:text-lg">
              Discover mood-lifting styles with modern tailoring, natural textures, and easy layers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/category/women"
                className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                Shop Women
              </Link>
              <Link
                to="/category/men"
                className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400"
              >
                Shop Men
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((product) => (
              <img
                key={product.id}
                src={product.images[0]}
                alt={product.name}
                className="h-48 w-full rounded-3xl object-cover shadow-sm sm:h-56"
              />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-14 sm:py-18">
        <PageContainer>
          <SectionTitle
            eyebrow="Shop By Category"
            title="Parent Page Layout Blocks"
            subtitle="This section showcases reusable cards to enter each parent category page."
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="card-lift rounded-3xl border border-zinc-200 bg-white p-6"
              >
                <h3 className="text-xl font-semibold text-zinc-900">{category.name}</h3>
                <p className="mt-2 text-zinc-600">{category.description}</p>
                <p className="mt-4 text-sm font-semibold text-amber-700">Explore Collection</p>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="pb-10">
        <PageContainer>
          <SectionTitle
            eyebrow="Best Sellers"
            title="Trending Products"
            subtitle="Reusable product card components are used across all pages."
          />
          <div className="mt-8">
            <ProductGrid products={products} />
          </div>
        </PageContainer>
      </section>
    </div>
  )
}

export default HomePage
