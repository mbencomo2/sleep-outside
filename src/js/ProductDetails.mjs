import {
  addToLocalStorage,
  setClick,
  qs,
  updateCartNumIcon,
  swingElementById
} from "./utils.mjs";

export default class productDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(this.product);
    let addItem = this.addToCart.bind(productDetails);
    setClick("#addToCart", () => addItem(this.product));
    setClick("#addToCart", updateCartNumIcon);
  }

  addToCart(product) {
    addToLocalStorage("so-cart", product);
    swingElementById("cartIcon");
  }

  renderProductDetails(product) {
    document.title = `Sleep Outside | ${product.Name}`;
    const section = qs(".product-detail");
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
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

    <p class="product-card__price">List Price: ${formatter.format(product.ListPrice)}</p>
    <p class="product-card__price">Final Price: ${formatter.format(product.FinalPrice)}</p>
    <p class="product-card__price">Total Discount: ${formatter.format(product.ListPrice - product.FinalPrice)}</p>

    <p class="product__color">${product.Colors[0].ColorName}</p>

    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>

    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>`;
  }
}
