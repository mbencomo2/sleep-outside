import ProductData from "./ProductData.mjs";
import ProductListing from "./productList.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const topProducts = ["880RR", "985RF", "985PR", "344YJ"];

const prodList = new ProductListing(
  "tents",
  dataSource,
  listElement,
  topProducts
);
prodList.init();
