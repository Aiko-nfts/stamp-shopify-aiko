import React, {useState, useEffect} from 'react';
import {AddToCartButton} from '@shopify/hydrogen-react';
import {useMatches, useFetcher} from '@remix-run/react';

const ProductDetails = ({details, onClose}) => {
  const [root] = useMatches();
  const fetcher = useFetcher();
  const selectedLocale = root?.data?.selectedLocale;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  if (!details) return null;

  const sizes = Array.from(
    new Set(
      details.variants.edges.map(
        (variant) => variant.node.selectedOptions[0].value,
      ),
    ),
  );

  const colors = Array.from(
    new Set(
      details.variants.edges.map(
        (variant) => variant.node.selectedOptions[1].value,
      ),
    ),
  );

  const handleSizeSelect = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleColorSelect = (e) => {
    setSelectedColor(e.target.value);
  };

  const lines = [{merchandiseId: selectedVariant, quantity: 1}];

  // const lines = [{merchandiseId: details.variants.edges.id, quantity: 1}];

  const handleAddToCart = async (e) => {
    const variants = e.variants.edges;

    if (!selectedSize || !selectedColor) return;

    variants.forEach((variant) => {
      if (
        variant.node.selectedOptions[0].value === selectedSize &&
        variant.node.selectedOptions[1].value === selectedColor
      ) {
        const variantId = variant.node.id;
        console.log(variantId);
        setSelectedVariant(variantId);
      }
    });

    if (selectedVariant) {
      // You can now use the AddToCartButton instead of useAddItemToCart
      return <AddToCartButton variantId={selectedVariant} />;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-secondary opacity-50 backdrop-blur-lg"
      ></div>

      <div className="flex flex-col max-w-3xl relative bg-tab clip-path-notched-sm">
        <div className="text-center">
          <h1 className="text-white py-1 font-medium py-2">
            {'aikommerce > product_details > '}
            {details.title}
          </h1>
        </div>
        <div className="flex relative bg-gradient-to-b from-primary via-primary to-secondary clip-path-notched-sm shadow-lg max-w-3xl">
          {details.images.edges.length > 0 && (
            <div className="clip-path-notched-sm bg-secondary">
              <img
                src={details.images.edges[0].node.transformedSrc}
                alt={details.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="w-8/12 px-2 flex flex-col ">
            <div className="flex flex-col items-start	">
              <h1 className="mb-1 text-tab text-2xl font-medium">
                A:\{details.title}
              </h1>
              <span className="text-sm leading-tight text-span">
                {details.description}
              </span>

              <div className="my-4">
                <p className="inline text-tab text-2xl font-medium">
                  {'<select size>'}
                </p>
                <select
                  id="size-select"
                  value={selectedSize}
                  onChange={handleSizeSelect}
                  className="mt-1 block w-full"
                >
                  <option value="">Choose a size</option>
                  {sizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="my-4">
                <label
                  htmlFor="color-select"
                  className="block text-sm font-medium text-tab"
                >
                  Select color:
                </label>
                <select
                  id="color-select"
                  value={selectedColor}
                  onChange={handleColorSelect}
                  className="mt-1 block w-full"
                >
                  <option value="">Choose a color</option>
                  {colors.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <p className="inline text-tab text-2xl font-medium">
                {'<price>'}
              </p>
              <div className="py-2 px-2 w-fit bg-darkerblue clip-path-notched-sm">
                <p className="inline text-white text-2xl uppercase font-bold">
                  {details.priceRange.minVariantPrice.amount}
                </p>
                <p className="inline text-yellow-400 text-2xl uppercase font-bold">
                  {' '}
                  {details.priceRange.minVariantPrice.currencyCode}
                </p>
              </div>
            </div>

            {/* Render available sizing here */}

            <div className="flex flex-row justify-between	">
              <fetcher.Form action="/cart" method="post">
                <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
                <input
                  type="hidden"
                  name="countryCode"
                  value={selectedLocale?.country ?? 'US'}
                />
                <input
                  type="hidden"
                  name="lines"
                  value={JSON.stringify(lines)}
                />
                <button
                  onClick={() => handleAddToCart(details)}
                  disabled={!selectedSize || !selectedColor}
                  className="bg-darkerblue text-l text-white py-3 px-9 clip-path-notched-sm  uppercase font-medium	"
                >
                  Add to Cart
                </button>
              </fetcher.Form>

              <button className="bg-tertiary text-l text-white py-3 px-9 clip-path-notched-sm uppercase font-medium	">
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
