import React from 'react';
import {useCart} from '@shopify/hydrogen-react';
import {Link, useFetcher} from '@remix-run/react';
import {flattenConnection, Image, Money} from '@shopify/hydrogen-react';
import {CART_QUERY} from '../root';

const Cart = () => {
  const {cart} = useCart();

  return (
    <div>
      Cart Status: {status}
      {/* Remove this button from the cart component, as it should be in the product details component */}
      {/* <button onClick={() => linesAdd([merchandise])}>Add Line</button> */}
    </div>
  );
};

export function CartLineItems({linesObj}) {
  const lines = flattenConnection(linesObj);
  return (
    <div>
      {lines.map((line) => {
        return <LineItem key={line.id} lineItem={line} />;
      })}
    </div>
  );
}
function LineItem({lineItem}) {
  const {merchandise, quantity} = lineItem;

  console.log(lineItem);

  const lineAttributes = {
    price: lineItem.cost.totalAmount,
  };

  return (
    <div className="p-2">
      <div className="flex bg-[#d9e2ee] items-center  clip-path-notched-xlg">
        <div className="bg-[#a1acbf] p-1 clip-path-notched-xlg ">
          <div className="pt-4 px-4 clip-path-notched-xlg bg-[#ccd2e1] flex justify-center items-center ">
            <Image
              className="relative bottom-0"
              data={merchandise.image}
              width={125}
              height={125}
            />
          </div>
        </div>
        <div className="bg-[#a1acbf] py-12 px-12 w-fit clip-path-notched-r-xlg h-fit flex-1 items-center text-white text-2xl my-2">
          {merchandise.product.title}
          <div className="ml-2">
            {/* {Object.entries(lineAttributes).map(([key, value]) => (
              <div
                key={key}
                className="text-pDetailsUnselectedBlue text-md leading-tight"
              ></div>
            ))} */}
          </div>
        </div>
        {/* <ItemRemoveButton lineIds={[lineItem.id]} /> */}
      </div>
    </div>
  );
}

export async function loader({context}) {
  const cartId = await context.session.get('cartId');

  const cart = cartId
    ? (
        await context.storefront.query(CART_QUERY, {
          variables: {
            cartId,
            country: context.storefront.i18n.country,
            language: context.storefront.i18n.language,
          },
          cache: context.storefront.CacheNone(),
        })
      ).cart
    : null;

  return {cart};
}

function ItemRemoveButton({lineIds}) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value="REMOVE_FROM_CART" />
      <input type="hidden" name="linesIds" value={JSON.stringify(lineIds)} />
      <button
        className="transition bg-red border-white text-white hover:text-white hover:bg-black rounded-md font-small text-center my-1 mx-1 max-w-xl leading-none border w-8 h-8 flex items-center justify-center"
        type="submit"
      >
        <IconRemove />
      </button>
    </fetcher.Form>
  );
}
function IconRemove() {
  return (
    <svg
      fill="transparent"
      stroke="currentColor"
      viewBox="0 0 20 20"
      className="w-10 h-10"
    >
      <title>Remove</title>
      <path
        d="M4 6H16"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.5 9V14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 9V14" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5.5 6L6 17H14L14.5 6"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6L8 5C8 4 8.75 3 10 3C11.25 3 12 4 12 5V6"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export function CartSummary({cost}) {
  return (
    <>
      <dl>
        <div className="flex items-center justify-between text-2xl">
          <dt className="border-text text-white">Subtotal</dt>
          <dd className="border-text text-[#ffe48b]">FREE</dd>
          {/* <dd>
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd> */}
        </div>
        <div className="flex items-center justify-center">
          <dt className="flex text-lg items-center text-[#9099a9]">
            <span>Shipping and taxes calculated at check out.</span>
          </dt>
        </div>
      </dl>
    </>
  );
}
export function CartActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div className="bg-[#363636] p-0-5 clip-path-notched-sm pb-2">
      <div
        className="flex clip-path-notched-sm p-2 flex-1 text-center justify-center before:opacity-1 hover:before:opacity-0 bg-gradient-to-b before:transition-opacity relative from-[#ffcf65] via-[#eea462] to-[#de7e5e] clip-path-notched-sm
    before:absolute before:top-0 before:right-0 before:bg-gradient-to-b before:bottom-0 before:left-0 before:from-[#7fceff] before:via-[#6291db] before:to-[#597ed0]"
      >
        <a href={checkoutUrl} className="">
          <span className="uppercase relative text-white text-3xl light-text">
            Continue to Checkout
          </span>
        </a>
      </div>
    </div>
  );
}

export default Cart;
