import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { deleteCart, numberQuantity } from '../../redux/actions/product.actions';
export default function Cart() {
    const cart = useSelector((state) => state.defaultReducer.cart);
    const dispatch = useDispatch();
    const renderCart = () => {
        return cart.map((item, index) => {
            return (
                <tr key={index}>

                    <td>{item.name}</td>
                    <td><img src={item.image} style={{ width: "60px" }} alt="product" /></td>
                    <td>
                        <button className="btn btn-primary p-1" onClick={() => {
                            dispatch(numberQuantity(item, false))
                        }}>-</button>
                        {item.quantity}
                        <button className="btn btn-primary p-1" onClick={() => {
                            dispatch(numberQuantity(item, true))
                        }}>+</button>
                    </td>
                    <td>{(item.price).toLocaleString()}</td>
                    <td>{(item.price * item.quantity).toLocaleString()}</td>
                    <td><button className="btn btn-danger pfa-rotate-180" onClick={() => {
                        dispatch(deleteCart(item))
                    }}><i class="fa fa-trash"></i></button></td>
                </tr>
            )
        })
    }
    const renderAmount = () => {
        return cart.reduce((total, item) => {
            return total += (item.price * item.quantity);
        }, 0)
    }

    return (
        <div>
            <table className="table text-center">
                <thead className="thead-dark">
                    <tr>

                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Sum</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {renderCart()}
                </tbody>
                <tfoot>
                    <tr className="text-right font-weight-bold text-danger">
                        <td colSpan="5">Total</td>
                        <td className="text-left">{renderAmount().toLocaleString()}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
