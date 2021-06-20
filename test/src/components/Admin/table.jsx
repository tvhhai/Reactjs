import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../redux/actions/product.actions";

const Table = () => {
  const listProduct = useSelector((state) => state.defaultReducer.listProduct);
  const search = useSelector((state) => state.defaultReducer.search);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const [values, setValues] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
  });

  const [open, setOpen] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }
  const resetForm = () => {
    setValues({
      id: "",
      name: "",
      price: "",
      image: "",
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
      dispatch(updateProduct(values.id, values));
      setOpen(!open);
      resetForm();
    } else {
      alert("Value isn't null");
    }
  };

  const renderFormUpdate = () => {
    if (open) {
      return (
        <form
          style={{ border: "1px solid #ccc" }}
          className="px-4 py-1 mb-3"
          onSubmit={handleSubmit}
          noValidate
        >
          <h4 className="text-center text-warning">Product update</h4>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Id</label>
                <input
                  disabled
                  style={{ cursor: "no-drop" }}
                  value={values.id}
                  name="id"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                />
              </div>
            </div>
            <div className="col-6">
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
            </div>
            <div className="col-6">
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
            </div>
            <div className="col-6">
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
            </div>
          </div>
          <button type="submit" className="btn btn-warning w-25 m-auto">
            Update
          </button>
        </form>
      );
    }
  };

  const renderTable = () => {
    if (search.length > 0) {
      return search?.map((item, index) => {
        return (
          <tr key={index}>
            <th scope="row">{item.id}</th>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
              <img src={item.image} style={{ width: "100px" }} />
            </td>
            <td>
              {/* <Update item={item} /> */}
              <button
                className="btn btn-warning"
                onClick={() => {
                  setOpen(!open);
                  setValues({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                  });
                }}
              >
                Update
              </button>
              <button
                className="btn btn-danger ml-2"
                onClick={() => {
                  dispatch(deleteProduct(item.id));
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
    return listProduct.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>
            <img src={item.image} style={{ width: "100px" }} />
          </td>
          <td>
            {/* <Update item={item} /> */}
            <button
              className="btn btn-warning"
              onClick={() => {
                setOpen(!open);
                setValues({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                });
              }}
            >
              Update
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => {
                dispatch(deleteProduct(item.id));
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container">
      <div className="mt-3">
        <table class="table table-dark text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
        {renderFormUpdate()}
      </div>
    </div>
  );
};

export default Table;
