import React, { Component } from 'react'
import ListProduct from './listproduct'

export default class Index extends Component {
    render() {
        return (
            <div className="hightDiv">
                <h1 className="text-warning text-center">HOME PAGE</h1>
                <ListProduct />
            </div>
        )
    }
}
