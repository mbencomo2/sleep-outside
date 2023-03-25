const baseURL = "https://wdd330-backend.onrender.com/";

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  /**
   * Send an order to the server for processing
   * @param {object} payload The order data
   * @returns a bool signifying the request was successful
   */
  async checkoutB(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
    return await fetch(baseURL + "checkout", options).then(convertToJson);
  }

  async loginRequest(creds) {
    console.log("test");
    console.log(creds);
    console.log(JSON.stringify(creds));
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    }
    const response = await fetch(baseURL + "login", options).then(convertToJson);
    return response.accessToken;
  }


  async getOrders(token) {
    const options = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    return await fetch(baseURL + "orders", options).then(convertToJson);
  }
}
