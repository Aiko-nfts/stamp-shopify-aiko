import React, {useState, useEffect} from 'react';
import {Link} from '@remix-run/react';
import {AddToCartButton} from '@shopify/hydrogen-react';
import {useLocation} from '@remix-run/react';
import * as CryptoJS from 'crypto-js';
import {useMatches, useFetcher} from '@remix-run/react';
import {useDispatch, useSelector} from 'react-redux';
import {setCouponCode} from '../state/codeSlice';
import {setRedeemableAmount} from '../state/redeemableSlice';
import {setCouponError} from '../state/couponErrorSlice';

const Products = ({products}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const encryptedObject = location.search.substring(8);
  const [noCoupon, setNoCoupon] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [key, setKey] = useState('aikoaikoaiko');
  const [decryptedObject, setDecryptedObject] = useState({
    rewards: 0,
    wallet: 0,
  });
  const [allocatedRewards, setAllocatedRewards] = useState(0);
  const [root] = useMatches();
  const [inCart, setInCart] = useState(['']);

  const fetcher = useFetcher();
  const selectedLocale = root?.data?.selectedLocale;

  const [selectedVariant, setSelectedVariant] = useState(null);

  const lines = [{merchandiseId: selectedVariant, quantity: 1}];

  const rewardsInCart = useSelector((state) => state.reward.activeReward);

  // rewardsInCart = rewardsInCart?.map((object) => object.merchandise.product.id);

  console.log(rewardsInCart?.map((object) => object.merchandise.product.id));

  useEffect(() => {
    setInCart(rewardsInCart?.map((object) => object.merchandise.product.id));
    console.log(inCart);
  }, [rewardsInCart]);

  const handleAddToCart = (product) => {
    const cartProduct = product.id;
    const variants = product.variants.edges;
    const variant = variants[0].node.id;
    setSelectedVariant(variant);

    console.log(variant);
    console.log(inCart);
    console.log(cartProduct);

    if (variant) {
      if (inCart.includes(cartProduct)) {
        console.log('already in cart');
        return;
      }
      // else return <AddToCartButton variantId={selectedVariant} />;
    }
  };

  function toBase64Url(base64) {
    return base64.replace('+', '-').replace('/', '_').replace(/=+$/, '');
  }

  function fromBase64Url(base64url) {
    base64url = base64url.replace('-', '+').replace('_', '/');
    while (base64url.length % 4) {
      base64url += '=';
    }
    return base64url;
  }

  function decrypt(ciphertext, key) {
    const bytes = CryptoJS.AES.decrypt(fromBase64Url(ciphertext), key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }

  function isValidDecryptedObject(object) {
    return (
      object &&
      typeof object === 'object' &&
      'rewards' in object &&
      'wallet' in object
    );
  }

  useEffect(() => {
    try {
      const object = decrypt(encryptedObject, key);
      if (isValidDecryptedObject(object)) {
        setDecryptedObject(object);
        setAllocatedRewards(object.rewards);
        console.log('Decrypted object:', object);
        dispatch(setCouponCode(object.wallet));
        dispatch(setRedeemableAmount(object.rewards));
      } else {
        console.error(
          'Decrypted object does not have the expected shape:',
          object,
        );
      }
    } catch (error) {
      setNoCoupon(true);
      dispatch(setCouponError(true));
    }
  }, [encryptedObject]);

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
      {[...products.edges.slice(0, allocatedRewards)].map(
        ({node: product}, i) => (
          <>
            {!inCart.includes(product.id) && (
              <fetcher.Form action="/cart" method="post" key={product.id}>
                <>
                  <input
                    type="hidden"
                    name="cartAction"
                    value={'ADD_TO_CART'}
                  />
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
                    key={product.id}
                    onClick={() => handleAddToCart(product)}
                    className={`text-center transition-all ease-in-out ${
                      hovered === product.id ? 'translate-y-2' : ''
                    }`}
                  >
                    {product.images.edges.length > 0 && (
                      <div
                        className={`ease-in clip-path-notched-lrg w-43 h-54 2xl:w-54 2xl:h-70 pt-1 pb-3 flex justify-center items-center transition-all duraction-200 bg-[#363636]`}
                      >
                        <div
                          className={`ease-in clip-path-notched-lrg w-39 h-52 2xl:w-50 2xl:h-62 flex justify-center items-center transition-all duraction-200 ${
                            inCart.includes(product.id)
                              ? 'bg-[#ffe9a7]'
                              : hovered === product.id
                              ? 'bg-[#ffe9a7]'
                              : 'bg-[#85aae4]'
                          }`}
                        >
                          <div
                            onMouseEnter={() => setHovered(product.id)}
                            onMouseLeave={() => setHovered(null)}
                            className={`ease-in clip-path-notched-lrg w-36 h-50 2xl:w-48 2xl:h-60 relative transition-all bg-gradient-to-b duraction-200 ${
                              inCart.includes(product.id)
                                ? 'from-[#ffe9a7] via-[#ffe9a7] to-[#6c4d25]'
                                : hovered === product.id
                                ? 'from-[#ffe9a7] via-[#ffe9a7] to-[#6c4d25]'
                                : 'from-[#85aae4] via-[#85aae4] to-[#adb9cf]'
                            } 
                    
                    `}
                          >
                            <img
                              src={product.images.edges[0].node.transformedSrc}
                              alt={product.title}
                              className="absolute top-0 left-0 w-full h-full object-cover font-thin"
                            />
                            <div
                              className={`ease-in overlay absolute top-0 left-0 w-full h-full transition-all	 bg-gradient-to-b from-transparent via-transparent duraction-200
                    ${
                      inCart.includes(product.id)
                        ? 'to-[#6c4d25]'
                        : hovered === product.id
                        ? 'to-[#6c4d25]'
                        : 'to-[#3f5989]'
                    }`}
                            ></div>
                            <span className="bottom-0 absolute w-full flex justify-center tracking-tighter items-center text-white text-md 2xl:text-xl pb-3 2xl:pb-6">
                              {product.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                </>
              </fetcher.Form>
            )}

            {inCart.includes(product.id) && (
              <button
                key={product.id}
                className={`text-center transition-all ease-in-out ${
                  hovered === product.id ? 'translate-y-2' : ''
                }`}
              >
                {product.images.edges.length > 0 && (
                  <div
                    className={`ease-in clip-path-notched-lrg w-43 h-54 2xl:w-54 2xl:h-70 pt-1 pb-3 flex justify-center items-center transition-all duraction-200 bg-[#363636]`}
                  >
                    <div
                      className={`ease-in clip-path-notched-lrg w-39 h-52 2xl:w-50 2xl:h-62 flex justify-center items-center transition-all duraction-200 ${
                        inCart.includes(product.id)
                          ? 'bg-[#ffe9a7]'
                          : hovered === product.id
                          ? 'bg-[#ffe9a7]'
                          : 'bg-[#85aae4]'
                      }`}
                    >
                      <div
                        onMouseEnter={() => setHovered(product.id)}
                        onMouseLeave={() => setHovered(null)}
                        className={`ease-in clip-path-notched-lrg w-36 h-50 2xl:w-48 2xl:h-60 relative transition-all bg-gradient-to-b duraction-200 ${
                          inCart.includes(product.id)
                            ? 'from-[#ffe9a7] via-[#ffe9a7] to-[#6c4d25]'
                            : hovered === product.id
                            ? 'from-[#ffe9a7] via-[#ffe9a7] to-[#6c4d25]'
                            : 'from-[#85aae4] via-[#85aae4] to-[#adb9cf]'
                        } 
                    
                    `}
                      >
                        <img
                          src={product.images.edges[0].node.transformedSrc}
                          alt={product.title}
                          className="absolute top-0 left-0 w-full h-full object-cover font-thin"
                        />
                        <div
                          className={`ease-in overlay absolute top-0 left-0 w-full h-full transition-all	 bg-gradient-to-b from-transparent via-transparent duraction-200
                    ${
                      inCart.includes(product.id)
                        ? 'to-[#6c4d25]'
                        : hovered === product.id
                        ? 'to-[#6c4d25]'
                        : 'to-[#3f5989]'
                    }`}
                        ></div>
                        <span className="bottom-0 absolute w-full flex justify-center tracking-tighter items-center text-white text-md 2xl:text-xl pb-3 2xl:pb-6">
                          {product.title}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            )}
          </>
        ),
      )}
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
