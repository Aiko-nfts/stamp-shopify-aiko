import React from 'react';
import {useCart} from '@shopify/hydrogen-react';
import {Link, useFetcher} from '@remix-run/react';
import {flattenConnection, Image, Money} from '@shopify/hydrogen-react';
import {CART_QUERY} from '../root';

const Cart = () => {
  const {linesAdd, status} = useCart();

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
  const size = merchandise.selectedOptions[0].value;
  const color = merchandise.selectedOptions[1].value;

  console.log(lineItem);

  const lineAttributes = {
    size: size,
    color: color,
    price: lineItem.cost.totalAmount,
  };

  return (
    <div className="p-2">
      <div className="flex gap-2 bg-formDarkBlue">
        <Image data={merchandise.image} width={125} height={125} />
        <div className="flex-1 items-center text-pDetailsUnselectedBlue text-lg my-2">
          A:\{merchandise.product.title}
          <div className="ml-2">
            {Object.entries(lineAttributes).map(([key, value]) => (
              <div
                key={key}
                className="text-pDetailsUnselectedBlue text-md leading-tight"
              >
                {key === 'price' ? (
                  <div className=" items-center">
                    <div className="text-pDetailsUnselectedBlue flex text-md leading-tight">
                      &lt;{key}&gt;:&nbsp;
                      <span className="text-yellow flex">
                        <Money data={lineItem.cost.totalAmount} />
                        &nbsp;
                        {`${merchandise.price.currencyCode}`}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    &lt;{key}&gt;: <span className="text-white">{value}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <ItemRemoveButton lineIds={[lineItem.id]} />
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
          <dt> &lt;subtotal&gt;</dt>
          <dd>
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="flex items-center">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-green-600">Free and carbon neutral</dd>
        </div>
      </dl>
    </>
  );
}
export function CartActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div className="flex flex-col mt-2">
      <a
        href={checkoutUrl}
        className="bg-black text-white px-6 py-3 w-full rounded-md text-center font-medium"
      >
        Continue to Checkout
      </a>
    </div>
  );
}

export default Cart;
