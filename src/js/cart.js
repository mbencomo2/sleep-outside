import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function removeFromCart(parent) {
  //get the current cart contents
  const cartItems = getLocalStorage("so-cart");
  //find the cart item to be removed
  const itemToRemove = cartItems.find(
    //childNode 11 is the span element
    (item) => item.Id === parent.childNodes[11].dataset.id
  );
  //splice is used to remove the item from the cart
  //indexOf finds the first matching object in the array
  cartItems.splice(cartItems.indexOf(itemToRemove), 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function cartItemTemplate(item) {
  //uses a template literal to create a list item
  return `<li class="cart-card divider">
  <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="Product Image for ${item.NameWithoutBrand}"
    />
  </a>
  <a href="../product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}" data-function="remove" title="Remove from cart">
    X
  </span>
</li>`;
}

function manageCart(e) {
  //find the parent list element for the clicked element
  const parent = e.target.closest("li");
  //check to make sure the clicked element has a data=function attribute
  //the value must be "remove", otherwise we do nothing
  if (e.target.dataset.function === "remove") {
    removeFromCart(parent);
  }
}

//display the cart contents
renderCartContents();
//rather than create a new eventlistener for each remove buttton, instead...
//listen for clicks in the whole list and find the click target with a callback
document.querySelector(".product-list").addEventListener("click", manageCart);
