import Axios from "axios";

const API = "https://5fa04305e21bab0016dfd001.mockapi.io/api/v1/listphone";

export class ProductService {
  getProduct() {
    return Axios.get(API);
  }

  getDetail(id) {
    return Axios.get(`${API}/${id}`);
  }

  addProduct(item) {
    return Axios.post(API, item);
  }

  deleteProduct(id) {
    return Axios.delete(`${API}/${id}`);
  }

  updateProduct(id, item) {
    return Axios.put(`${API}/${id}`, item);
  }
}
