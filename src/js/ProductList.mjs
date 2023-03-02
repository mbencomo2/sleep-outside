import ImageCarousel from "./ImageCarousel.mjs";
import { productTemplate } from "./ProductDetails.mjs";
import { renderListWithTemplate, currencyFormatter } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src=${product.Images.PrimaryMedium}
        alt=${product.Name}
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">List Price: ${currencyFormatter(
        product.ListPrice
      )}</p>
      <p class="product-card__price">Final Price: ${currencyFormatter(
        product.FinalPrice
      )}</p>
      <p class="product-card__price">Total Discount: ${currencyFormatter(
        product.ListPrice - product.FinalPrice
      )}</p>
    </a>
    <span class="product-card__view" data-id=${product.Id}>View</span>
  </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);

    // render the list
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterBegin",
      true
    );

    document
      .querySelectorAll(".product-card__view")
      .forEach((elem) =>
        elem.addEventListener("click", (e) => this.displayModal(e))
      );
  }
  // TODO: Create a method that inserts HTML into a modal for each product listing
  async displayModal(e) {
    let id = e.target.dataset.id;
    let product = await this.dataSource.findProductById(id);
    let modal = document.querySelector(".modal");
    let modalContent = document.querySelector(".product-detail");
    let html = productTemplate(product);
    modalContent.insertAdjacentHTML("beforeend", html);
    modal.style.display = "block";
    document.querySelector(".close-modal").addEventListener("click", () => {
      modal.style.display = "none";
      modalContent.innerHTML = "";
    });
    let carousel = new ImageCarousel();
    carousel.showSlides();
    document.querySelector("#addToCart").remove();
  }
}
