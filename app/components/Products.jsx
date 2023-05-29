import React, {useState, useEffect} from 'react';
import {Link} from '@remix-run/react';
import {AddToCartButton} from '@shopify/hydrogen-react';
import {useLocation} from '@remix-run/react';

import {useMatches, useFetcher} from '@remix-run/react';

const Products = ({products}) => {
  const location = useLocation();
  console.log(location);
  const [hovered, setHovered] = useState(null);
  const [root] = useMatches();

  const fetcher = useFetcher();
  const selectedLocale = root?.data?.selectedLocale;

  const [selectedVariant, setSelectedVariant] = useState(null);

  const lines = [{merchandiseId: selectedVariant, quantity: 1}];

  const handleAddToCart = (product) => {
    const variants = product.variants.edges;
    const variant = variants[0].node.id;
    setSelectedVariant(variant);

    if (variant) {
      return <AddToCartButton variantId={selectedVariant} />;
    }
  };

  // const handleAddToCart = async (e) => {
  //   const variants = e.variants.edges;

  //   let variant = variants[0].node.id;
  //   setSelectedVariant(variant);
  //   onProductClick(product);

  //   if (selectedVariant) {
  //     console.log(selectedVariant);
  //     return <AddToCartButton variantId={selectedVariant} />;
  //   }
  // };

  return (
    <ul className="flex gap-6 items-center justify-center">
      {products.edges.slice(0, 2).map(({node: product}) => (
        <fetcher.Form action="/cart" method="post" key={product.id}>
          <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
          <input
            type="hidden"
            name="countryCode"
            value={selectedLocale?.country ?? 'US'}
          />
          <input type="hidden" name="lines" value={JSON.stringify(lines)} />
          <button
            key={product.id}
            onClick={() => handleAddToCart(product)}
            className={`text-center transition-all ease-in-out ${
              hovered === product.id ? 'translate-y-2' : ''
            }`}
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
                      hovered === product.id ? 'to-[#6c4d25]' : 'to-[#3f5989]'
                    }`}
                    ></div>
                    <span className="bottom-0 absolute w-full flex justify-center items-center text-white text-xl pb-6">
                      {product.title}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </button>
        </fetcher.Form>
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
