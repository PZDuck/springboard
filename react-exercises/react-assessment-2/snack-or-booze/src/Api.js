import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

class SnackOrBoozeApi {
  /** Fetch all Snacks from json-db */

  static async getSnacks() {
    const result = await axios.get(`${BASE_API_URL}/snacks`);
    return result.data;
  }

  static async getDrinks() {
    /** Fetch all Drinks from json-db */

    const result = await axios.get(`${BASE_API_URL}/drinks`);
    return result.data;
  }

  static async addSnack(data) {
    /** Add a Snack item to json-db */
    const result = await axios.post(`${BASE_API_URL}/snacks`, data);
    return result;
  }

  static async addDrink(data) {
    /** Add a Drink item to json-db */

    const result = await axios.post(`${BASE_API_URL}/drinks`, data);
    return result;
  }
}

export default SnackOrBoozeApi;
