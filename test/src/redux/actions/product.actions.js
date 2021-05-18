// import { ProductService } from "../../services/productServices";
import { createAction } from ".";
import { productService } from "../../services";
import Swal from "sweetalert2";
import {
    ADD_CART,
    ADD_PRODUCT,
    AMOUNT_MONEY,
    BUY_PRODUCT,
    DELETE_CART,
    DELETE_PRODUCT,
    FETCH_DETAIL,
    FETCH_PRODUCT,
    NUMBER_QUANTITY,
    SEARCH_PRODUCT,
    START_LOADING,
    STOP_LOADING,
    UPDATE_PRODUCT,
} from "../type/type";


export const startLoading = () => {
    return {
        type: START_LOADING,
    };
}

export const stopLoading = () => {
    return {
        type: STOP_LOADING,
    }
}



export const getProduct = () => {
    return (dispatch) => {
        dispatch(startLoading());
        productService
            .getProduct()
            .then((res) => {
                dispatch(createAction(FETCH_PRODUCT, res.data));
                dispatch(stopLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(stopLoading());
            });
    };
};

export const getDetail = (id) => {
    return (dispatch) => {
        dispatch(startLoading());
        productService
            .getDetail(id)
            .then((res) => {
                dispatch(createAction(FETCH_DETAIL, res.data));
                dispatch(stopLoading());
            })
            .catch((err) => {
                console.log(err);
                dispatch(stopLoading());
            });
    };
};

export const addProduct = (item) => {
    return (dispatch) => {
        productService
            .addProduct(item)
            .then((res) => {
                dispatch(createAction(ADD_PRODUCT, res.data));
                // dispatch(getProduct());
                Swal.fire("Add Successfully...", "", "success");
            })
            .catch((err) => console.log(err));
    };
};

export const deleteProduct = (id) => {
    return (dispatch) => {
        Swal.fire({
            title: "Are you sure ?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK !",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    productService.deleteProduct(id).then((res) => {
                        dispatch(createAction(DELETE_PRODUCT, res.data));
                        dispatch(getProduct());
                    });
                    Swal.fire("Delete Successfully!", "success");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const updateProduct = (id, item) => {
    return (dispatch) => {
        productService
            .updateProduct(id, item)
            .then((res) => {
                dispatch(createAction(UPDATE_PRODUCT, res.data));
                dispatch(getProduct());
                Swal.fire("Update Successfully...", "", "success");
            })
            .catch((err) => console.log(err));
    };
};


export const searchProduct = (keyword) => {
    return (dispatch) => {
        dispatch(createAction(SEARCH_PRODUCT, keyword));
        console.log(keyword)
    }
}

export const addCart = (product) => {
    const productCart = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
    }
    return (dispatch) => {
        dispatch(createAction(ADD_CART, productCart));
    };
};




export const deleteCart = (product) => {
    return (dispatch) => {
        dispatch(createAction(DELETE_CART, product));
    };
};


export const numberQuantity = (product, status) => {
    return (dispatch) => {
        dispatch(createAction(NUMBER_QUANTITY, { product, status }));
    };
};




export const buyProduct = () => {
    return (dispatch) => {
        dispatch(createAction(BUY_PRODUCT))
    }
}