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
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(productId) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get("product");
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

export function swingElementById(elementId) {
  const element = document.querySelector(`#${elementId}`);
  const totalTime = 500; // in milliseconds.
  const frameDuration = 10 // in milliseconds.
  const numberOfFrames = totalTime/frameDuration;
  const maxAngle = 30; // max angle of rotation.

  let x = 0;
  const id = setInterval(frame, frameDuration);
  function frame() {
    if (x >= numberOfFrames) {
      clearInterval(id);
    } else {
      x += 1;
      // Turns element right and left only until max angle.
      let angle = Math.round(
        Math.sin(x * Math.PI / (numberOfFrames / 2)) * maxAngle
      );
      element.style.transform = `rotate(${angle}deg)`;
    }
  }
}