import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';


class CartList extends Component {

    componentWillUnmount() {
        console.log('cartList unmount')
    }

    render() {
        const { cartList } = this.props;


        if (cartList) {

            if (cartList.length === 0) {
                return (
                    <div>
                        <h3 className="big-text">Your Cart Is Empty</h3>
                        <Link className="btn btn-primary" to="/" >Go To Home</Link>
                    </div>
                )

            } else {
                return (
                    <div>

                        <div className="container mt-5 ">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><Link to="/">Products</Link></li>
                                    <li class="breadcrumb-item active" aria-current="page">Cart:</li>
                                </ol>
                            </nav>
                        </div>

                        {
                            cartList.map((item) => {
                                return <CartItem item={item} key={item.id} />
                            })
                        }

                    </div >
                )
            }
        } else {
            return null
        }
    }
}


export default compose(firestoreConnect([{
    collection: 'cartList'
}]), connect((state, props) => ({
    cartList: state.firestore.ordered.cartList
})))(CartList);