import {loader} from './Cart';

export async function getCart(context) {
  const cart = await loader(context);
  return {cart};
}
