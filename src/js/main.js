import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, qs } from "./utils.mjs";

const topProducts = ["880RR", "985RF", "985PR", "344YJ"];
const dataSource = new ProductData("tents");
const productList = new ProductList(
  "tents",
  dataSource,
  qs(".product-list"),
  topProducts
);
loadHeaderFooter();
productList.init();
