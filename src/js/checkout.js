import {
  loadHeaderFooter,
  setClick,
  updateCartNumIcon
} from "./utils.mjs";
import checkoutProcess from "./CheckoutProcess.mjs";

const checkout = new checkoutProcess();
checkout.init();
pageInit();

setClick("#checkout", (e) => checkout.checkout());

async function pageInit() {
  await loadHeaderFooter();
  updateCartNumIcon();
  checkout.calculateOrdertotal();
}
