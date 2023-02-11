import { loadHeaderFooter, qs, updateCartNumIcon } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

const cart = new shoppingCart();
pageInit();

function manageCart(e) {
  const target = e.target;
  //only call remove from cart if the clicked element has a data-function value of"remove"
  if (target.dataset.function === "remove") {
    cart.removeFromCart(target.dataset.id);
  }
}

async function pageInit() {
  await loadHeaderFooter();
  updateCartNumIcon();
  cart.renderCartContents();

  //rather than create a listener for each remove button
  //instead create a handler for the whole list
  //click events will bubble through the nodes until it reaches the handler
  //we can find the clicked element using e.target
  qs(".product-list").addEventListener("click", manageCart);
}
