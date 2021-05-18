import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buyProduct, searchProduct } from "../../redux/actions/product.actions";
import Cart from "./cart";

export default function Header() {
  const dispatch = useDispatch();

  const [key, setkey] = useState("");
  const handleChange = (e) => {
    const key = e.target.value;
    setkey(key);
  };
  const cart = useSelector((state) => state.defaultReducer.cart);

  const renderQuantity = () => {
    return cart.reduce((sum, item) => {
      return (sum += item.quantity);
    }, 0);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProduct(key));
    // setkey("")
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <a className="navbar-brand" href="#">
        Demo
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to="/admin" className="nav-link">
              Admin
            </NavLink>
          </li>
        </ul>
        <form onSubmit={handleSearch} className="form-inline my-2 my-lg-0 ml-5">
          <input
            className="form-control mr-sm-2"
            type="text"
            value={key}
            name="search"
            onChange={handleChange}
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>

        <div className="ml-5">
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-danger px-3"
            data-toggle="modal"
            data-target="#exampleModal4"
          >
            <i
              class="fa fa-shopping-cart mr-1"
              style={{ fontSize: "22px" }}
            ></i>
            ({renderQuantity()})
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal4"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Your cart
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Cart />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => dispatch(buyProduct())}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
