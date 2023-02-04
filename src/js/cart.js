import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.js";

const shoppingCart = new ShoppingCart(
  "cart",
  "so-cart",
  document.querySelector(".product-list"),
);
shoppingCart.init();

function removeFromCart(parent) {
  //get the current cart contents
  const cartItems = getLocalStorage("so-cart");
  //find the cart item to remove
  const cartItem = cartItems.find(
    //childNode 11 is the span element
    (item) => item.Id === parent.childNodes[11].dataset.id
  );
  //indexOf returns the first found element's index, and splice removes it
  cartItems.splice(cartItems.indexOf(cartItem), 1);
  //set the modified cart in localStorage
  setLocalStorage("so-cart", cartItems);
  //render the new cart
  shoppingCart.init();
}

function manageCart(e) {
  //find the parent element for the clicked element
  const parent = e.target.closest("li");
  //only call remove from cart if the clicked element has a data-function value of"remove"
  if (e.target.dataset.function === "remove") {
    removeFromCart(parent);
  }
}

//rather than create a listener for each remove button
//instead create a handler for the whole list
//click events will bubble through the nodes until it reaches the handler
//we can find the clicked element using e.target
document.querySelector(".product-list").addEventListener("click", manageCart);

loadHeaderFooter();
