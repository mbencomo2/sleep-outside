import { qs, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class Admin {
  constructor(outputSelector) {
    this.mainElement = qs(outputSelector);
    this.token = null;
    this.services = new ExternalServices();
  }
  async login(creds, next) {
    console.log(creds);
    try {
      this.token = await this.services.loginRequest(creds);
      next();
    }
    catch(err) {
      console.log(err);
      alertMessage(err.message.message);
    }
  }
  showLogin() {
    const $form = `
    <section class="products">
      <form action="">
        <fieldset>
          <legend>Login</legend>
          <label class="top" for="email">Email:
            <input type="email" name="email" id="email" value="user1@email.com">
          </label>
          <label class="top" for="password">Password:
            <input type="password" name="password" id="password">
          </label>
          <button type="button" id="loginBtn">Login</button>
        </fieldset>
      </form>
    </div>`
    this.mainElement.innerHTML = $form;
    qs("#loginBtn").addEventListener("click", this.login.bind(this));
    qs("#loginBtn").addEventListener("click", (e) => {
      const email = qs("#email").value;
      const password = qs("#password").value;
      this.login({ email, password }, this.showOrders.bind(this));
    });
  }
  showOrders() {
    console.log("AAAAAAAA");
  }
}