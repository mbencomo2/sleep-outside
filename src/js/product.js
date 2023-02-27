import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ImageCarousel from "./ImageCarousel.mjs";
import { qs, getParam, loadHeaderFooter, updateCartNumIcon } from "./utils.mjs";

const productId = getParam("product");
const dataSource = new ExternalServices("tents");
const product = new ProductDetails(productId, dataSource);
const carousel = new ImageCarousel();
initPage();

async function initPage() {
  await loadHeaderFooter();
  updateCartNumIcon();

  await product.init();
  carousel.showSlides();

  qs(".carousel-container").addEventListener("click", (e) => carouselMan(e));
}

function carouselMan(e) {
  let action = e.target.dataset.action;
  switch (action) {
    case "slide":
      carousel.slideIndex += +e.target.dataset.index;
      carousel.showSlides();
      break;

    case "change":
      carousel.slideIndex = +e.target.dataset.index + 1;
      carousel.showSlides();
      break;

    default:
      break;
  }
}
