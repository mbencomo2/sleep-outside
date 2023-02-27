import {
  qs,
  getLocalStorage,
  setLocalStorage,
  addToLocalStorage,
  renderListWithTemplate,
  swingElementById,
  updateCartNumIcon,
} from "./utils.mjs";

// shoppingCart class for handling cart actions
export default class shoppingCart {
  /**
   * Render the current cart contents using a template
   */
  renderCartContents() {
    const cart = getLocalStorage("so-cart") ?? [];
    renderListWithTemplate(
      cartItemTemplate,
      qs(".product-list"),
      cart,
      "afterbegin",
      true
    );
    // call the displayTotalCart() function
    this.displayTotalCart(cart);
  }
  /**
   * Add an item to the cart. If the item already
   * exists in the cart, increase its quantity.
   * @param {*} product
   */
  addToCart(product) {
    let cart = getLocalStorage("so-cart"),
      newProduct = { ...product, Quantity: 1 },
      item = cart.find((carItem) => carItem.Id == product.Id);

    if (item) {
      item.Quantity++;
      setLocalStorage("so-cart", cart);
    } else {
      addToLocalStorage("so-cart", newProduct);
    }

    swingElementById("cartIcon");
  }

  /**
   * Remove an item from the cart, based in
   * the product ID
   * @param {string} itemId
   */
  removeFromCart(itemId) {
    //get the current cart contents
    const cart = getLocalStorage("so-cart");
    //find the cart item to remove
    const cartItem = cart.find((item) => item.Id === itemId);
    //indexOf returns the first found element's index, and splice removes it
    cart.splice(cart.indexOf(cartItem), 1);
    //set the modified cart in localStorage
    setLocalStorage("so-cart", cart);
    //render the new cart
    this.renderCartContents();
    updateCartNumIcon();
  }

  /**
   * Changes the quantity of an item in the cart.
   * @param {string} itemId The Id of the cart item to be modified
   * @param {int} amount The new quantity
   */
  changeQuantity(itemId, amount = 1) {
    const cart = getLocalStorage("so-cart"),
      cartItem = cart.find((item) => item.Id == itemId);
    cartItem.Quantity = +amount;
    setLocalStorage("so-cart", cart);
    this.renderCartContents();
  }

  /**
   * Calculate the total cart value and display it in .cart-footer
   * @param {array} cart
   */
  displayTotalCart(cart) {
    if (cart.length > 0) {
      // Display the HTML section "cart-footer" and show the total amount to pay for the items
      const total = cart.reduce(
        (sum, current) => sum + current.FinalPrice * current.Quantity,
        0
      );
      qs(".cart-footer").style.display = "block";
      const totalElem = qs("#total-in-cart");
      totalElem.innerHTML = `Total: $${total.toFixed(2)}`;
    } else {
      qs(".cart-footer").style.display = "none";
    }
  }
}

/**
 * Create an HTML string with details from the cart item.
 * Automatically selects the quantity option.
 * @param {*} item
 * @returns an HTML string
 */
function cartItemTemplate(item) {
  // Create the options
  let options = [],
    option = (num) => `<option value="${num}">${num}</option>`;
  for (let i = 0; i < 9; i++) options.push(option(i + 1));

  return `<li class="cart-card divider">
    <a href="../product_pages/index.html?product=${
      item.Id
    }" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="../product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <label class="cart-card__quantity" for="quantity">Qty: 
      <select id="quantity-${item.Id}" data-id="${
    item.Id
  }" data-function="quantity">
        <option value="${item.Quantity}" selected disabled hidden>${
    item.Quantity
  }</option>
        ${options.join("").trim()}
        <option value="10+">10+</option>
      </select>
      <input type="number" id="quantity-plus-${item.Id}" data-id="${
    item.Id
  }" hidden>
    </label>
    <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(
      2
    )}</p>
    <button class="cart-card__remove" data-id="${
      item.Id
    }" data-function="remove" title="Remove from cart">
    &times;
    </button>
  </li>`;
}
