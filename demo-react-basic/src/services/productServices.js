import Axios from "axios";

const API = "http://127.0.0.1:5000/product";

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
