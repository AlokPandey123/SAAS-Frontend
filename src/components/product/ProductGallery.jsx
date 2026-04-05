import { useState } from 'react'

const ProductGallery = ({ images, alt }) => {
  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100">
        <img src={activeImage} alt={alt} className="aspect-[4/5] w-full object-cover" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setActiveImage(image)}
            className={`overflow-hidden rounded-2xl border transition ${
              activeImage === image ? 'border-zinc-900' : 'border-zinc-200 hover:border-zinc-400'
            }`}
            aria-label={`Open image ${index + 1}`}
          >
            <img src={image} alt={`${alt} ${index + 1}`} className="aspect-square w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductGallery
