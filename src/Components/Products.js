import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import Spinner from './Spinner';
import { billGenFunc } from './billGenFunc';



const size = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" }
]

const quantity = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" }
]





class Products extends Component {


    state = {
        size: { value: "M", label: "M" },
        quantity: { value: 1, label: "1" },
        isInCart: false
    }

    componentWillUnmount() {
        console.log('products unmount')
    }



    static getDerivedStateFromProps(nextProps, prevState) {
        const { cartList, products, firestore } = nextProps;
        let status = false

        if (cartList) {


            const bill = billGenFunc(cartList);
            console.log('bill', bill)
            firestore.update({ collection: 'bill', doc: 'bill' }, bill)


                .then(() => {
                    console.log('updated')
                })


            if (cartList.length === 0) {
                return {
                    isInCart: false
                }
            }

            cartList.map((item) => {
                return item.uid === products.id ? status = true : item
            })

            return {
                isInCart: status
            }

        } else {
            return null
        }
    }



    addCartHandler = () => {

        const { firestore, products, cartList } = this.props;
        const { name, price, id, img } = products;
        const { quantity, size } = this.state;

        const totalPrice = price * quantity.value


        const cartItem = { name, price, uid: id, img, quantity, size, totalPrice }

        firestore.add({ collection: 'cartList' }, cartItem)

        this.setState({
            isInCart: true
        })


    }


    quantityHandler = (e) => {

        this.setState({ quantity: e })
    }

    sizeHandler = (e) => {

        this.setState({ size: e });


    }





    render() {

        const { products, cartList } = this.props

        console.log('render')


        if (cartList) {
            return (

                <div className="card product-card-style m-3  mt-5">
                    <img src={products.img} className="card-img-top product-image-style" alt="..." />
                    <div className="card-body">

                        <h5 className="card-title mb-3">{products.name}</h5>



                        <div className="mb-1 size-quant-style">
                            <label className="text-primary mr-3 mt-2 label-style"  >Size:-</label>
                            <Select
                                value={this.state.size}
                                onChange={this.sizeHandler}
                                options={size}
                                name="size"
                                placeholder="Size"
                                className="select-style"

                            />
                        </div>

                        <div className="mb-3 size-quant-style">

                            <label className="text-primary mr-2 mt-2 label-style"  >Quantity:-</label>
                            <Select
                                value={this.state.quantity}
                                onChange={this.quantityHandler}
                                options={quantity}
                                name="quantity"
                                placeholder="Quantity"
                                className="select-style"
                            />
                        </div>






                        <p className="card-text product-price-style">{'\u20B9'}{products.price}</p>
                        {this.state.isInCart ? <Link className="btn btn-success" to="/cartList">Go To Cart</Link> :
                            <button className="btn btn-success"
                                onClick={this.addCartHandler}
                            >
                                Add To Cart
                        </button>}
                    </div>
                </div >
            )
        } else {
            return null
        }


    }
}

export default compose(firestoreConnect([{ collection: 'cartList' }]), connect((state, props) => ({
    cartList: state.firestore.ordered.cartList ? state.firestore.ordered.cartList : null
})))(Products)