import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ImageCarousel from "./ImageCarousel.mjs";
import { getParam, loadHeaderFooter, updateCartNumIcon } from "./utils.mjs";

const productId = getParam("product");
const dataSource = new ExternalServices("tents");
const product = new ProductDetails(productId, dataSource);
initPage();

async function initPage() {
  await loadHeaderFooter();
  updateCartNumIcon();

  await product.init();
  const carousel = new ImageCarousel();
  carousel.showSlides();
}
