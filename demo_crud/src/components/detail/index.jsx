import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { addCart, getDetail } from "../../redux/actions/product.actions";
import { useDispatch, useSelector } from "react-redux";

export default function Detail() {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.substr(8);
  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  const productDetail = useSelector(
    (state) => state.defaultReducer.productDetail
  );
  const isLoading = useSelector(
    (state) => state.defaultReducer.isLoading
  );

  if (isLoading) {
    return (
      <div className="loading">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  return (
    <div className="container hightDiv">
      <h1 className="text-dark text-center">DETAIL</h1>

      <div className="card text-left bg-light">
        <div className="row">
          <div className="col-6">
            <img
              className="card-img-top p-2"
              style={{ width: "500px" }}
              src={productDetail?.image}
              alt="product"
            />
          </div>
          <div className="col-6">
            <div className="card-body">
              <h1 className="card-title text-secondary">
                {productDetail?.name}
              </h1>
              <h3 className="card-text text-danger">
                Price: {productDetail?.price} $
              </h3>
              <p className="card-text">
                <span style={{ fontWeight: "bold" }}>Description :</span> Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Minima
                tempora laudantium repellendus praesentium, illo itaque alias
                accusantium id tenetur consequatur corporis voluptatum unde
                provident, veritatis repudiandae eos, minus perferendis sed amet
                totam nemo animi. Dolore tempora, repellendus porro molestias
                molestiae quia assumenda quo vitae quas ea minus, itaque
                accusantium. Quia!
              </p>
              <button className="ml-2 btn btn-primary px-5" onClick={() => {
                dispatch(addCart(productDetail))
              }}>
                <i class="fa fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
