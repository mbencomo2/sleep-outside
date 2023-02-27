/**
 * wrapper for querySelector...returns matching element
 * @param {string} selector
 * @param {DOM Object} parent Optional, specify a parent element
 * @returns A DOM element matching the selector
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

/**
 * retrieve data from localstorage
 * @param {string} key
 * @returns Data from localStorage
 */
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? [];
}

/**
 * save data to local storage
 * @param {string} key
 * @param {*} data
 */
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * add data to local storage
 * @param {string} key
 * @param {*} data
 */
export function addToLocalStorage(key, data) {
  // if storage data is falsy starts an array, otherwise gets storage data
  let storageData = getLocalStorage(key) || [];

  // copy the current array and add the new data
  let addNewData = [...storageData, data];

  // save it
  setLocalStorage(key, addNewData);
}

/**
 * set a listener for both touchend and click
 * @param {string} selector
 * @param {function} callback
 */
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });
  qs(selector).addEventListener("click", callback);
}

/**
 * Get a URL parameter
 * @param {string} param The name of the URL parameter
 * @returns The value of the URL parameter
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

/**
 * Render a list with a callback template into a given element.
 * @param {function} templateFn
 * @param {DOM Object} parentElement The element to insert the rendered list into
 * @param {array} list An array of objects to process
 * @param {string} position Optional, where to insert the list
 * @param {bool} clear Optional, whether to clear the element before insertion
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

/**
 * Insert html into an element with a given template, uses "afterbegin".
 * @param {string} template An HTML formatted string
 * @param {DOM Object} parentElement The element to insert the template into
 * @param {*} data Optional data to process
 * @param {function} callback Optional callback to process data
 */
function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

/**
 * Fetch HTML from a file and return the text as a string
 * @param {string} path The path to an HTML template
 * @returns the raw html as a string
 */
function loadTemplate(path) {
  return fetch(path).then((data) => data.text());
}

/**
 * Load the header and footer from partial html files
 */
export async function loadHeaderFooter() {
  const footerHtml = await loadTemplate("../partials/footer.html");
  const headerHtml = await loadTemplate("../partials/header.html");
  const headerElem = qs("#main-header");
  const footerELem = qs("#main-footer");

  renderWithTemplate(headerHtml, headerElem);
  renderWithTemplate(footerHtml, footerELem);
}

/**
 * Swings an element from right to left +/- 30degs
 * @param {string} elementId
 */
export function swingElementById(elementId) {
  const element = qs(`#${elementId}`);
  const totalTime = 500; // in milliseconds.
  const frameDuration = 10; // in milliseconds.
  const numberOfFrames = totalTime / frameDuration;
  const maxAngle = 30; // max angle of rotation.

  let x = 0;
  let animate = setTimeout(function run() {
    if (x >= numberOfFrames) {
      clearTimeout(animate);
    } else {
      x++;
      // Turns element right and left only until max angle.
      let angle = Math.round(
        Math.sin((x * Math.PI) / (numberOfFrames / 2)) * maxAngle
      );
      element.style.transform = `rotate(${angle}deg)`;
    }
    setTimeout(run, frameDuration);
  }, 0);
}

/**
 * Updates the cart icon with a superscript number of items in the cart
 */
export function updateCartNumIcon() {
  const cartCount = getLocalStorage("so-cart").length;
  const numElement = document.getElementById("cart-icon-number");

  numElement.style.display = cartCount ? "block" : "none";
  numElement.innerHTML = cartCount;
}

/**
 * Takes a string of words and returns the string with each
 * word capitalized.
 * @param {string} str a word or sentence to capitalize
 * @returns a string with each word capitlized
 */
export function capitalize(str) {
  // Splits the parameter into separate words.
  let words = str.split(" ");
  // For each word push its capitalized version to words.
  words = words.map((word) => word[0].toUpperCase() + word.substring(1));
  // Join the words into a sentence again.
  let sentence = words.join(" ");

  return sentence;
}

/**
 * Takes a currency amount and converts it to USD
 * @param {int} value
 * @returns value formatted as USD
 */
export function currencyFormatter(value) {
  let currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return currency.format(value);
}

/**
 * Creates an alert with a custom message.
 * @param {string} message A message to include in the alert
 * @param {bool} scroll True: scroll to the top left of the page
 */
export function alertMessage(message, scroll = true) {
  let p = `<p class="alert">${message}<span class="close-icon">X</span></p>`;
  if (scroll) window.scrollTo(0, 0);
  qs("main").insertAdjacentHTML("afterBegin", p);
  qs(".close-icon").addEventListener("click", (e) => {
    e.target.closest("p").remove();
  });
}

/**
 * Removes all alerts on the page
 */
export function removeAllAlerts() {
  const elements = document.querySelectorAll(".alert");
  for (let i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
}
