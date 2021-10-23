
import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Select from 'react-select';
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



class CartItem extends Component {

    componentWillUnmount() {
        console.log('cartItem unmount')
    }


    state = {
        size: { value: "M", label: "M" },
        quantity: { value: 1, label: "1" }
    }


    static getDerivedStateFromProps(nextProps, prevState) {

        const { item, cartList, firestore } = nextProps;
        const { size, quantity } = item;

        console.log('piyush')

        const bill = billGenFunc(cartList);

        console.log('bill', bill);

        firestore.update({ collection: 'bill', doc: 'bill' }, bill)


        return {
            size,
            quantity
        }



    }


    quantityHandler = (e) => {

        const { item, firestore } = this.props;
        const { name, price, uid, size, quantity, totalPrice, img } = item;

        const newTotal = price * e.value

        const updatedItem = {
            name,
            price,
            uid,
            size,
            quantity: e,
            totalPrice: newTotal,
            img
        }

        firestore.update({ collection: 'cartList', doc: item.id }, updatedItem)


        this.setState({ quantity: e })
    }

    sizeHandler = (e) => {

        const { item, firestore } = this.props;
        const { name, price, uid, size, quantity, totalPrice, img } = item;

        const updatedItem = {
            name,
            price,
            uid,
            size: e,
            quantity,
            totalPrice, img
        }

        firestore.update({ collection: 'cartList', doc: item.id }, updatedItem)

        this.setState({ size: e });


    }






    deleteHandler = () => {
        const { firestore, item, cartList } = this.props;



        firestore.delete({ collection: 'cartList', doc: item.id })

    }




    render() {
        const { item, cartList } = this.props;
        if (cartList) {

            return (
                <div>
                    <div className="card mb-3 mt-4 container" style={{ maxWidth: '940px' }}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={item.img} className="card-img cart-card-image-style" alt="..." />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body cart-card-body-style">
                                    <h4 className="card-title text-dark">{item.name}</h4>



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

                                        <label className="text-primary mr-2 mt-2  label-style"  >Quantity:-</label>
                                        <Select
                                            value={this.state.quantity}
                                            onChange={this.quantityHandler}
                                            options={quantity}
                                            name="quantity"
                                            placeholder="Quantity"
                                            className="select-style"
                                        />
                                    </div>

                                </div>
                                <h5 className="text-success">Total Price: {'\u20B9'}{item.price} {<i className="fas fa-times"></i>} {item.quantity.value} (Q) = {'\u20B9'}{item.totalPrice}</h5>

                            </div>
                            <div className="col-md-2 m-auto">
                                <i className="far fa-trash-alt fa-2x" onClick={this.deleteHandler}></i>
                                <p className="text-secondary" onClick={this.deleteHandler}>Remove</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}


export default compose(firestoreConnect([{ collection: 'cartList' }]), connect((state, props) => ({
    cartList: state.firestore.ordered.cartList
})))(CartItem)