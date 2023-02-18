import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import {
  getParam,
  loadHeaderFooter,
  updateCartNumIcon
} from "./utils.mjs";

initPage();

async function initPage() {
  const productId = getParam("product");
  const dataSource = new ExternalServices("tents");

  const product = new ProductDetails(productId, dataSource);

  await loadHeaderFooter();
  setTimeout(updateCartNumIcon, 1000);
  product.init();
}
