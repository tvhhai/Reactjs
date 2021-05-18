import {
  ADD_CART,
  ADD_PRODUCT,
  BUY_PRODUCT,
  DELETE_CART,
  DELETE_PRODUCT,
  FETCH_DETAIL,
  FETCH_PRODUCT,
  NUMBER_QUANTITY,
  SEARCH_PRODUCT,
  START_LOADING,
  STOP_LOADING,
} from "../type/type";
import Swal from "sweetalert2";

const initialState = {
  listProduct: [],
  productDetail: null,
  isLoading: false,
  selected: "",
  search: [],
  cart: []
};

const defaultReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {

    case FETCH_PRODUCT: {
      state.listProduct = payload;
      return { ...state } //setState
    }

    case FETCH_DETAIL: {
      state.productDetail = payload;
      return { ...state };
    }

    case ADD_PRODUCT: {
      let updateList = [...state.listProduct];
      updateList.push(payload);
      state.listProduct = updateList;
      return { ...state };
    }

    case START_LOADING: {
      state.isLoading = true;
      return { ...state }
    }

    case STOP_LOADING: {
      state.isLoading = false;
      return { ...state }
    }

    case DELETE_PRODUCT: {
      let updateList = [...state.listProduct];
      let index = updateList.findIndex((product) => product.id === action.id);
      if (index === -1) {
        updateList.splice(payload, index);
        state.listProduct = updateList;
      }

      return { ...state };
    }

    case SEARCH_PRODUCT: {
      const key = payload;
      state.selected = key;
      if (key == "") {
        state.search = [];
      } else {
        const update = state.listProduct.filter((product) => product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1);
        state.search = update;
      }

      return { ...state };
    }

    case ADD_CART: {
      let cart = [...state.cart];
      const index = cart.findIndex((cart) => {
        return cart.id === action.payload.id;
      });

      if (index !== -1) {
        cart[index].quantity += 1;
      } else {
        cart = [...cart, action.payload];
      }
      // cart.push(action.payload);
      state.cart = cart;
      return { ...state };
    }

    case NUMBER_QUANTITY: {
      let { status, product } = payload;
      let cart = [...state.cart];
      const index = cart.findIndex((cart) => {
        return cart.id === product.id;
      });
      if (index !== -1) {
        if (status) {
          cart[index].quantity += 1;
        } else {
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
          } else {
            Swal.fire("Max decline!", "", "warning");
          }
        }
      }
      state.cart = cart;
      return { ...state };
    }

    case DELETE_CART: {
      let cart = [...state.cart];
      const index = cart.findIndex((cart) => {
        return cart.id === payload.id;
      });
      if (index !== -1) {
        cart.splice(cart[index], 1);
      }
      state.cart = cart;
      return { ...state };
    }

    case BUY_PRODUCT: {
      state.cart = [];
      Swal.fire("Buy successfully!", "", "success");
      return { ...state }

    }

    default:
      return state;
  }
};
export default defaultReducer;






  // { id: "1", name: "Iphone 12 Pro max", price: "24000", image: "data:image/jpeg;base64,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" },
    // { id: "2", name: "Samsung Note 20 ultra", price: "18000", image: "https://media.cungcau.vn/files/baochau/2020/08/06/galaxy-note-20-1921.jpeg" },
    // { id: "3", name: "Oppo A920", price: "14000", image: "https://cdn.tgdd.vn/Products/Images/42/220654/oppo-a92-tim-600x600.jpg" },