import { loadHeaderFooter, updateCartNumIcon } from "./utils.mjs";

pageInit();

async function pageInit() {
  await loadHeaderFooter();
  updateCartNumIcon();
}
