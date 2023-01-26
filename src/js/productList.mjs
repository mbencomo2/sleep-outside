import { renderListWithTemplate } from "./utils.mjs";
function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.NameWithoutBrand}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.ListPrice}</p></a>
  </li>`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    async init() {
      const list = await this.dataSource.getData();
      renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
  }