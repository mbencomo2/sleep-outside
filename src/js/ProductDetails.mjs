import {
  qs,
  setClick,
  updateCartNumIcon,
} from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

export default class productDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.cart = new shoppingCart;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(this.product);
    setClick("#addToCart", () => this.cart.addToCart(this.product));
    setClick("#addToCart", updateCartNumIcon);
  }

  renderProductDetails(product) {
    document.title = `Sleep Outside | ${product.Name}`;
    const section = qs(".product-detail");
    section.innerHTML = `<h3>${product.Name}</h3>

    <h2 class="divider">${product.NameWithoutBrand}</h2>

    <div class="divider">
      <picture>
        <source
          media="(min-width:720px)"
          srcset="${product.Images.PrimaryExtraLarge}"
        />
        <source
          media="(min-width:540px)"
          srcset="${product.Images.PrimaryLarge}"
        />
        <source
          media="(min-width:360px)"
          srcset="${product.Images.PrimaryMedium}"
        />
        <img
          src="${product.Images.PrimaryLarge}"
          alt="${product.Name}"
        />
      </picture>
    </div>

    <p class="product-card__price">${product.ListPrice}</p>

    <p class="product__color">${product.Colors[0].ColorName}</p>

    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>

    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>`;
  }
}
