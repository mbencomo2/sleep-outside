import { loadHeaderFooter, setClick } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

const checkout = new checkoutProcess();
checkout.init();
pageInit();

setClick("#checkout", checkout.checkout);

async function pageInit() {
  await loadHeaderFooter();
  checkout.calculateOrdertotal();
}
