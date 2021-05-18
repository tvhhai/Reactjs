import React, { useEffect } from "react";
import Table from "./table";
import Form from "./form";
import { useDispatch } from "react-redux";
import { getProduct } from "../../redux/actions/product.actions";

export default function Manager() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProduct());
    }, []);

    return (
        <div className="container hightDiv">
            <h1 className="text-danger text-center">ADMIN</h1>
            <div>
                <Form />
            </div>
            <Table />
        </div>
    );
}
