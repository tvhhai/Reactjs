import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, getProduct } from "../../redux/actions/product.actions";

export default function Form() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const [values, setValues] = useState({
    id: "1",
    name: "",
    price: "",
    image: "",
  });

  const resetForm = () => {
    setValues({
      id: "1",
      name: "",
      price: "",
      image: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      values.id !== "" &&
      values.name !== "" &&
      values.price !== "" &&
      values.image !== ""
    ) {
      dispatch(addProduct(values));
      resetForm();
    } else {
      alert("Value isn't null");
    }
  };

  return (
    <div className="mt-5">
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary w-25"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Add product
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add
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
              <form className="p-3" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">ID</label>
                  <input
                    //value={values.id}
                    name="id"
                    onChange={handleChange}
                    type="text"
                    placeholder="Auto add"
                    disabled
                    className="form-control"
                    id="exampleInputEmail1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail2">Name</label>
                  <input
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail2"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail3">Price</label>
                  <input
                    value={values.price}
                    name="price"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail3"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail4">Link Image</label>
                  <input
                    value={values.image}
                    name="image"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail4"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-25 m-auto">
                  Add
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
