import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  // Calculate the total amount to pay for the current products in cart (if there are any)
  let total = 0;
  if (cartItems.length != 0) {
    cartItems.forEach( item => total += item.FinalPrice);
  }
  // When calculated the final total, call the displayTotalCart() function
  displayTotalCart(total);

}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function displayTotalCart(total){
  // Display the HTML section "cart-footer" and show the total amount to pay for the items
  document.querySelector(".cart-footer").style.display = "block";
  let total_in_cart = document.getElementById("total-in-cart");
  total_in_cart.innerHTML = "Total: $"+total;
  console.log('In the function! $', total)
}

renderCartContents();
