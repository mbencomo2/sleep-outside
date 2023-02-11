import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter, updateCartNumIcon } from "./utils.mjs";

initPage();

async function initPage() {
  const productId = getParam("product");
  const dataSource = new ProductData("tents");
  
  const product = new ProductDetails(productId, dataSource);

  await loadHeaderFooter();
  setTimeout(updateCartNumIcon, 1000);
  product.init();
}
