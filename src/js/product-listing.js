import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {
  qs,
  getParam,
  loadHeaderFooter,
  capitalizeParam
} from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const topProducts = ["880RR", "985RF", "985PR", "344YJ"];
const dataSource = new ProductData(category);
const productList = new ProductList(
  category,
  dataSource,
  qs(".product-list"),
  topProducts
);
productList.init();

qs("#sub-title").insertAdjacentHTML("beforeend", capitalizeParam(category));
qs("title").insertAdjacentHTML("beforeend", capitalizeParam(category));
