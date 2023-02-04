import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
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
}

export default class ProductListing {
  constructor(category, storageKey, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.storageKey = storageKey;
    this.listElement = listElement;
  }
  async init() {

    // render the list
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      getLocalStorage(this.storageKey),
      "afterBegin",
      true
    );
  }
}