import { loadHeaderFooter, setClick } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

const cart = new shoppingCart();

loadHeaderFooter();
cart.renderCartContents();
//rather than create a listener for each remove button
//instead create a handler for the whole list
//click events will bubble through the nodes until it reaches the handler
//we can find the clicked element using e.target
setClick(".product-list", manageCart);

function manageCart(e) {
  //find the parent element for the clicked element
  const parent = e.target.closest("li");
  //only call remove from cart if the clicked element has a data-function value of"remove"
  if (e.target.dataset.function === "remove") {
    cart.removeFromCart(parent);
  }
}
