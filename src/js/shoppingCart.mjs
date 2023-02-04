import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
  qs,
} from "./utils.mjs";

// shoppingCart class for handling cart actions
export default class shoppingCart {
  renderCartContents() {
    const cartItems = getLocalStorage("so-cart");
    renderListWithTemplate(
      cartItemTemplate,
      qs(".product-list"),
      cartItems,
      "afterbegin",
      true
    );
    // Calculate the total amount to pay for the current products in cart (if there are any)
    let total = 0;
    if (cartItems.length != 0) {
      cartItems.forEach((item) => (total += item.FinalPrice));
    }
    // When calculated the final total, call the displayTotalCart() function
    this.displayTotalCart(total.toFixed(2));
  }

  removeFromCart(parent) {
    //get the current cart contents
    const cartItems = getLocalStorage("so-cart");
    //childNode 11 is the span element
    //use this so we still target the correct product
    const action = parent.childNodes[11].dataset.id;
    //find the cart item to remove
    const cartItem = cartItems.find((item) => item.Id === action);
    //indexOf returns the first found element's index, and splice removes it
    cartItems.splice(cartItems.indexOf(cartItem), 1);
    //set the modified cart in localStorage
    setLocalStorage("so-cart", cartItems);
    //render the new cart
    this.renderCartContents();
  }

  displayTotalCart(total) {
    // Display the HTML section "cart-footer" and show the total amount to pay for the items
    qs(".cart-footer").style.display = "block";
    let total_in_cart = qs("#total-in-cart");
    total_in_cart.innerHTML = "Total: $" + total;
  }
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
    Remove from cart
    </span>
  </li>`;

  return newItem;
}
