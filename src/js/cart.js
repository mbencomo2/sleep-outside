import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

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
  renderCartContents();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="../product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}" data-function="remove" title="Remove from cart">
  ❌
  </span>
</li>`;

  return newItem;
}

function manageCart(e) {
  //find the parent element for the clicked element
  const parent = e.target.closest("li");
  //only call remove from cart if the clicked element has a data-function value of"remove"
  if (e.target.dataset.function === "remove") {
    removeFromCart(parent);
  }
}

renderCartContents();
//rather than create a listener for each remove button
//instead create a handler for the whole list
//click events will bubble through the nodes until it reaches the handler
//we can find the clicked element using e.target
document.querySelector(".product-list").addEventListener("click", manageCart);
