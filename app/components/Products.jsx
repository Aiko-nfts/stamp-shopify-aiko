import React, {useState} from 'react';
import {Link} from '@remix-run/react';

const Products = ({products, onProductClick}) => {
  const totalBoxes = 10;
  const productsCount = products.edges.length;
  const emptyBoxes = totalBoxes - productsCount;
  const [hovered, setHovered] = useState(null);

  return (
    <ul className="flex gap-6 items-center justify-center">
      {products.edges.map(({node: product}) => (
        <li
          key={product.id}
          className={`text-center transition-all ease-in-out ${
            hovered === product.id ? 'translate-y-2' : ''
          }`}
          onClick={() => onProductClick(product)}
        >
          {product.images.edges.length > 0 && (
            <div
              className={`ease-in clip-path-notched-lrg w-54 h-70 pb-3 flex justify-center items-center transition-all duraction-200 bg-[#363636]`}
            >
              <div
                className={`ease-in clip-path-notched-lrg w-50 h-62 flex justify-center items-center transition-all	 duraction-200 ${
                  hovered === product.id ? 'bg-[#ffe9a7]' : 'bg-[#85aae4]'
                } `}
              >
                <div
                  onMouseEnter={() => setHovered(product.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`ease-in clip-path-notched-lrg w-48 h-60 relative transition-all	 bg-gradient-to-b duraction-200 ${
                    hovered === product.id
                      ? 'from-[#ffe9a7] via-[#ffe9a7] to-[#6c4d25]'
                      : 'from-[#85aae4] via-[#85aae4] to-[#adb9cf]'
                  } `}
                >
                  <img
                    src={product.images.edges[0].node.transformedSrc}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <div
                    className={`ease-in overlay absolute top-0 left-0 w-full h-full transition-all	 bg-gradient-to-b from-transparent via-transparent duraction-200
                    ${
                      hovered === product.id ? 'to-[#6c4d25]' : 'to-[#adb9cf]'
                    }`}
                  ></div>
                  <span className="bottom-0 absolute w-full flex justify-center items-center text-white text-xl pb-6">
                    A3 Season Print
                  </span>
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

{
  /* <div className="clip-path-notched py-3 absolute bottom-0 bg-tertiary w-full opacity-0 transition-opacity duration-300 clip-path[notched] group-hover:opacity-100">
                <h2 className="text-l text-white font-bold leading-tight">
                  A:\{product.title}
                </h2>
                <p className="text-l text-price font-bold leading-tight	">
                  {product.priceRange.minVariantPrice.amount}{' '}
                  {product.priceRange.minVariantPrice.currencyCode}
                </p>
              </div> */
}

export default Products;
