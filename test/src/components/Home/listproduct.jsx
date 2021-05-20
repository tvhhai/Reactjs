import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../redux/actions/product.actions";
import Product from "./product";

const ListProduct = () => {
  const dispatch = useDispatch();

  //Gọi API khi vào component
  useEffect(() => {
    dispatch(getProduct());
  }, []);

  //Lấy dữ liệu từ Reducer
  const listProduct = useSelector((state) => state.defaultReducer.listProduct);
  const isLoading = useSelector((state) => state.defaultReducer.isLoading);
  const search = useSelector((state) => state.defaultReducer.search);

  //Loading: Chờ nhân dữ liệu từ API
  if (isLoading) {
    return (
      <div className="loading">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (search.length > 0) {
    return (
      <div className="container">
        <div className="row mt-4">
          {search?.map((item, index) => (
            <Product key={index} item={item} search={search} />
          ))}
        </div>
      </div>
    );
  }

  //Nhận được dữ liệu thì render ra VIEW
  //GỌi Product và truyền props item qua
  return (
    <div className="container">
      <div className="row mt-4">
        {listProduct?.map((item, index) => (
          <Product key={index} item={item} search={search} />
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
