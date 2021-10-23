import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';



class AppNavbar extends Component {
    render() {
        const { cartList } = this.props
        if (cartList) {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-primary nav-style m-0 p-0 pl-3 pr-3">
                    <div className="container">
                        <Link className="navbar-brand nav-text-big" to="/">Shopping App</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active pt-3 pr-3">
                                    <Link className="nav-link" to="/"><i className="fas fa-home fa-2x"></i><span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item active pr-3">
                                    <Link className="nav-link nav-cart-icon-style" to="/cartList"><span className="badge badge-pill badge-success nav-badge-style">{cartList.length}</span><i className="fas fa-cart-plus fa-2x"></i></Link>
                                </li>
                                <li className="nav-item active pt-3">
                                    <Link className="nav-link " to="/billing"><i className="fab fa-amazon-pay fa-3x"></i></Link>
                                </li>

                                <li className="nav-item active">

                                </li>

                            </ul>

                        </div>
                    </div>
                </nav>
            )
        } else {
            return <Spinner />
        }
    }
}

export default compose(firestoreConnect([{ collection: 'cartList' }]), connect((state, props) => ({
    cartList: state.firestore.ordered.cartList
})))(AppNavbar)

