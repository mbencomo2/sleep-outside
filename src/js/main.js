import { loadHeaderFooter, updateCartNumIcon } from "./utils.mjs";
import Alert from './Alert.js';

pageInit();

async function pageInit() {
  await loadHeaderFooter();
  updateCartNumIcon();
}

// Create a new instance of the Alert class
async function pageInit() {

  const alert = new Alert();
  const mainElement = document.querySelector('main');
  mainElement.insertAdjacentHTML('afterbegin', alert.render());
}

