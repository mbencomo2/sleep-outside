import {
  addToLocalStorage
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
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart(this.product).bind(this));
  }

  addToCart(product) {
    addToLocalStorage("so-cart", product);
  }

  renderProductDetails(product) {
    document.pageTitle = `Sleep Outside | ${product.Name}`
    const section = document.querySelector(".product-detail")
    section.innerHTML = `<h3>${product.Name}</h3>

    <h2 class="divider">${product.NameWithoutBrand}</h2>

    <div class="divider">
      <picture>
        <source
          media="(min-width:720px)"
          srcset="${product.Image}"
        />
        <source
          media="(min-width:540px)"
          srcset="${product.Image.replace("320","240")}"
        />
        <source
          media="(min-width:360px)"
          srcset="${product.Image.replace("320","160")}"
        />
        <img
          src="${product.Image}"
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
    </div>`
  }
}
