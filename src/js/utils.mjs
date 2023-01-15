// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  // fetch current array store there, add product to array, set in storage again as an string
  
  if(localStorage.getItem(key) === null){
    let array = [];
    array[0] = data;
    localStorage.setItem(key, JSON.stringify(array));
  }
  else{
    let all_objects = JSON.parse(localStorage.getItem(key));
    all_objects.push(data)
    localStorage.setItem(key, JSON.stringify(all_objects));}
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
