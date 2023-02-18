import { getLocalStorage, qs } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function postItemTemplate(product) {
  return `{
    id: ${product.Id},
    name: ${product.Name},
    price: ${product.FinalPrice},
    quantity: ${product.Quantity}
  }`;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  return items.map(postItemTemplate);
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.numOfItems = 0;
    this.externalServices = new ExternalServices();
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }
  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const cart = getLocalStorage("so-cart");
    cart.forEach(item => {
      this.numOfItems += item.Quantity;
      this.itemTotal += item.Quantity * item.FinalPrice;
    });
  }
  calculateOrdertotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = this.numOfItems === 0 ? 0 : ((this.numOfItems - 1) * 2 + 10);
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    // display the totals.
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    qs("#totalItems").insertAdjacentHTML("afterBegin", this.numOfItems);
    qs("#total").insertAdjacentHTML("afterBegin", this.itemTotal);
    qs("#shippingEstimate").insertAdjacentHTML("afterBegin", this.shipping);
    qs("#tax").insertAdjacentHTML("afterBegin", this.tax);
    qs("#orderTotal").insertAdjacentHTML("afterBegin", this.orderTotal);
  }


  async checkout() {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const JSONForm = formDataToJSON(qs("#checkoutForm"));
    const cart = getLocalStorage("so-cart");
    const items = packageItems(cart);

    let checkoutObj = { 
      ...JSONForm,
      items : items,
      orderTotal : this.orderTotal,
      shipping : this.shipping,
      tax: this.tax
    };
    // call the checkout method in our ExternalServices module and send it our data object.
    console.log(await this.externalServices.checkout(checkoutObj));
  }

}
