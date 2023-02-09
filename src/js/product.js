import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter, updateCartNumIcon } from "./utils.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);

// we need to await loadHeaderFooter or else it will try to render 
// the cart icon number when it doesn't exist yet
initPage();

async function initPage() {
  await loadHeaderFooter();
  setTimeout(updateCartNumIcon, 1000);
  product.init();
}
