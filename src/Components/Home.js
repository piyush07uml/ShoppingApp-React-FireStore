import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Products from './Products';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';






class Home extends Component {



    componentWillUnmount() {
        console.log('Home unmount')
    }

    render() {
        const { products } = this.props
        if (products) {
            return (
                <div>
                    <div className="container mt-5 ">
                        <nav aria-label="breadcrumb bg-info">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item active" aria-current="page">Products:</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="align-products container">

                        {products.map((product) => {
                            return <Products products={product} key={product.id} />
                        })}
                    </div>

                </div>



            )

        } else {
            return null
        }

    }
}

export default compose(firestoreConnect([{ collection: 'products' }]), connect((state, props) => ({
    products: state.firestore.ordered.products
})))(Home);