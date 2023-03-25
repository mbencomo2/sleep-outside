import { loadHeaderFooter, updateCartNumIcon } from "./utils.mjs";
import Admin from "./Admin.mjs";

const admin = new Admin("main");
pageInit();

async function pageInit() {
  await loadHeaderFooter();
  updateCartNumIcon();
  admin.showLogin();
}