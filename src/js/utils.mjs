// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// add data to local storage
export function addToLocalStorage(key, data) {
  // if storage data is falsy starts an array, otherwise gets storage data
  let storageData = getLocalStorage(key) || [];

  // copy the current array and add the new data
  let addNewData = [...storageData, data];

  // save it
  setLocalStorage(key, addNewData);
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

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

function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return fetch(path).then((data) => data.text());
}

export async function loadHeaderFooter() {
  const footerHtml = await loadTemplate("../partials/footer.html");
  const headerHtml = await loadTemplate("../partials/header.html");
  const headerElem = qs("#main-header");
  const footerELem = qs("#main-footer");

  renderWithTemplate(headerHtml, headerElem);
  renderWithTemplate(footerHtml, footerELem);
}

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
  // For each word push its capitalized version to capWords.
  words = words.map((word) => word[0].toUpperCase() + word.substring(1));
  // Join the capWords into a sentence again.
  let sentence = words.join(" ");

  return sentence;
}

export function currencyFormatter(value) {
  let currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return currency.format(value);
}

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement("div");
  // add a class to style the alert
  alert.classList.add("alert");

  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function(e) {
    if (e.target.innerText == "X") {
      main.removeChild(this);
    }
  })
  // add the alert to the top of main
  const main = document.querySelector("#checkoutForm");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  // we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0,0);
}

export function removeAllAlerts() {
  const elements = document.querySelectorAll(".alert");
  for (let i = 0; i < elements.length; i++) {
  	elements[i].remove();
  }
}