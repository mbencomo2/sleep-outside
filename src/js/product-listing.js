import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import {
  qs,
  getParam,
  loadHeaderFooter,
  capitalize,
  updateCartNumIcon,
} from "./utils.mjs";

const category = getParam("category");
const title = category.replace("-", " ");
const dataSource = new ExternalServices(category);
const productList = new ProductList(category, dataSource, qs(".product-list"));
pageInit();

async function pageInit() {
  await loadHeaderFooter();
  updateCartNumIcon();

  productList.init();

  qs("#sub-title").insertAdjacentHTML("beforeend", capitalize(title));
  qs("title").insertAdjacentHTML("beforeend", capitalize(title));
}
