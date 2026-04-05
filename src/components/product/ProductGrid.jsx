import ProductCard from './ProductCard'

const ProductGrid = ({ products }) => {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export default ProductGrid
