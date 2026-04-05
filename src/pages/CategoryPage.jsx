import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/common/Breadcrumbs'
import PageContainer from '../components/common/PageContainer'
import CategoryShowcaseScroller from '../components/product/CategoryShowcaseScroller'
import ProductGrid from '../components/product/ProductGrid'
import { categories, products } from '../data/products'

const SUB_TABS = [
  { id: 'trending', label: 'Trending' },
  { id: 'clothes',  label: 'Clothes' },
  { id: 'sandals',  label: 'Sandals' },
  { id: 'slippers', label: 'Slippers' },
  { id: 'shoes',    label: 'Shoes' },
]

const CategoryPage = () => {
  const { categoryId } = useParams()
  const [activeTab, setActiveTab] = useState('trending')

  const activeCategory = categories.find((category) => category.id === categoryId)
  const categoryProducts = products.filter((product) => product.category === categoryId )

  const visibleProducts =
    activeTab === 'trending'
      ? categoryProducts.filter((product) => product.trending)
      : categoryProducts.filter((product) => product.subCategory === activeTab)

  if (!activeCategory) {
    return (
      <PageContainer className="py-20">
        <p className="text-zinc-700">Category not found.</p>
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
            { label: activeCategory.name },
          ]}
        />

        {/* Category header */}
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200 pb-6">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 sm:text-4xl">{activeCategory.name}</h1>
            <p className="mt-2 text-zinc-600">{activeCategory.description}</p>
          </div>
          <p className="rounded-full bg-white px-4 py-2 text-sm text-zinc-600 shadow-sm">
            {categoryProducts.length} products
          </p>
        </div>

        {activeTab === 'trending' ? (
          <CategoryShowcaseScroller
            categoryId={categoryId}
            categoryName={activeCategory.name}
            products={visibleProducts}
          />
        ) : null}

        {/* Sub-category tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SUB_TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'border-zinc-900 bg-zinc-900 text-white'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Product grid */}
        <div className="mt-8">
          {visibleProducts.length > 0 ? (
            <ProductGrid products={visibleProducts} />
          ) : (
            <div className="flex min-h-40 flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white py-14 text-center">
              <p className="text-zinc-500">No products found in this section yet.</p>
              <button
                onClick={() => setActiveTab('trending')}
                className="mt-4 text-sm font-semibold text-amber-700 hover:text-amber-800"
              >
                Browse Trending instead
              </button>
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  )
}

export default CategoryPage
