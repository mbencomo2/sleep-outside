import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {
  qs,
  getParam,
  loadHeaderFooter,
  capitalize,
  updateCartNumIcon,
} from "./utils.mjs";

pageInit();

async function pageInit() {
  await loadHeaderFooter();
  updateCartNumIcon();

  const category = getParam("category");
  const title = category.replace("-", " ");
  const dataSource = new ProductData(category);
  const productList = new ProductList(
    category,
    dataSource,
    qs(".product-list")
  );
  productList.init();

  qs("#sub-title").insertAdjacentHTML("beforeend", capitalize(title));
  qs("title").insertAdjacentHTML("beforeend", capitalize(title));
}
