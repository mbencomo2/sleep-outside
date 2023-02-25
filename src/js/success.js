import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

//load page functions
pageInit();

/**
 * Wrapper for our page functionality
 */
async function pageInit() {
  // Await loading header and fooder so cart icon updates apprpriately
  await loadHeaderFooter();

  //Clear the contents of the cart
  const cart = new shoppingCart();
  cart.clearCart();
}
