import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/actions/product.actions";

export default function Product(props) {
  let { item } = props;
  const dispatch = useDispatch();

  return (
    <div className="col-4">
      <div className="card text-white bg-dark">
        <img
          className="card-img-top"
          style={{ width: "320px", height: "300px" }}
          src={item.image}
          alt=""
        />

        <div className="card-body">
          <h4 className="card-title">{item.name}</h4>
          <p className="card-text">{item.price}</p>

          <button size="small" className="btn btn-secondary">
            <NavLink
              className="nav-link text-white p-0"
              to={`/detail/${item.id}`}
            >
              Detail
            </NavLink>
          </button>

          <button
            className="ml-2 btn btn-primary"
            onClick={() => {
              dispatch(addCart(item));
            }}
          >
            <i class="fa fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
