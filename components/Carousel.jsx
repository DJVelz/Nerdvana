import { useRef } from "react";

export default function Carousel({ title, products }) {
    const carouselRef = useRef(null);

    return (
    <div className="w-full my-10">
      <p className="text-2xl font-medium text-left w-full">{title}</p>

      <div className="relative w-full mt-2">
        {/* Left Arrow */}
        <button
          onClick={() => carouselRef.current.scrollBy({ left: -300, behavior: "smooth" })}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded shadow z-10"
        >
          ◀
        </button>

        {/* Product Cards */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto w-full scroll-smooth"
        >
          {products.map((product, index) => (
            <div className="flex-shrink-0 w-64" key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded shadow z-10"
        >
          ▶
        </button>
      </div>

      {/* Divider */}
      <div className="w-16 h-0.5 bg-purple rounded-full mt-6"></div>
    </div>
  );
}