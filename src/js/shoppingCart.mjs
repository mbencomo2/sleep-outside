import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
  qs,
} from "./utils.mjs";

// shoppingCart class for handling cart actions
export default class shoppingCart {
  renderCartContents() {
    const cartItems = getLocalStorage("so-cart") ?? [];
    renderListWithTemplate(
      cartItemTemplate,
      qs(".product-list"),
      cartItems,
      "afterbegin",
      true
    );
    // call the displayTotalCart() function
    this.displayTotalCart(cartItems);
  }

  removeFromCart(itemId) {
    //get the current cart contents
    const cartItems = getLocalStorage("so-cart");
    //find the cart item to remove
    const cartItem = cartItems.find((item) => item.Id === itemId);
    //indexOf returns the first found element's index, and splice removes it
    cartItems.splice(cartItems.indexOf(cartItem), 1);
    //set the modified cart in localStorage
    setLocalStorage("so-cart", cartItems);
    //render the new cart
    this.renderCartContents(cartItems);
  }

  displayTotalCart(cart) {
    if (cart.length > 0) {
      // Display the HTML section "cart-footer" and show the total amount to pay for the items
      const total = cart.reduce((sum, current) => sum + current.FinalPrice, 0);
      qs(".cart-footer").style.display = "block";
      const totalElem = qs("#total-in-cart");
      totalElem.innerHTML = `Total: $${total.toFixed(2)}`;
    } else {
      qs(".cart-footer").style.display = "none";
    }
  }
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
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
}
