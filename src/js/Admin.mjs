import ExternalServices from "./ExternalServices.mjs";
import { alertMessage, formDataToJSON, qs, removeAllAlerts } from "./utils.mjs";

export default class Admin {
  /**
   * Admin preforms login requests and stores the user's auth tokens. This class also
   * builds the login form and displays order information.
   * @param {*} mainElem The main element of the page
   */
  constructor(mainElem) {
    this.main = mainElem;
    this.externalServices = new ExternalServices();
    this.token = null;
    this.orders = null;
  }
  /**
   * Submit a login request and store the resulting auth token.
   */
  async login() {
    let form = qs("form"),
      creds = formDataToJSON(form);

    try {
      this.token = await this.externalServices.loginRequests(creds);
      this.showOrders();
    } catch (error) {
      removeAllAlerts();
      alertMessage(error.message.message);
    }
  }
  /**
   * Display the login form and handle form submission
   */
  showLogin() {
    let html = `<h1>Login</h1><form action='#' method='POST' onsubmit='return false'><label for='email' class='top'>Email<input type='email' name='email' id='email' required/></label><label for='password' class='top'>Password<input type='password' name='password' id='password' required/></label><button id="login" type='submit'>Login</button></form>`;
    this.main.insertAdjacentHTML("beforeend", html);
    qs("#login").addEventListener("click", (e) => {
      e.preventDefault();
      let Form = qs("form");
      if (Form.checkValidity() == false) {
        // Highlight the invalid field
        let list = Form.querySelectorAll(":invalid");
        for (let item of list) {
          item.focus();
        }
      } else {
        this.login();
      }
    });
  }
  /**
   * Fetches order data and displays it
   */
  async showOrders() {
    try {
      this.orders = await this.externalServices.getOrders(
        this.token.accessToken
      );
      let tableTemplate = (row) =>
          `<h1>Pending Orders</h1></ht><table><tr><th>OrderID</th><th>Customer Email</th><th>Time Created</th></tr>${row}</table>`,
        orderDate = new Date(this.orders.createdAt),
        order = `<tr><td>${this.orders.id}</td><td>${this.orders.userId}</td><td>${orderDate}</td></tr>`;
      this.main.innerHTML = "";
      this.main.insertAdjacentHTML("beforeend", tableTemplate(order));
    } catch (error) {
      alertMessage(error.message.message);
    }
  }
}
