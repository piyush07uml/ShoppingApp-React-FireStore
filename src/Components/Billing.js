import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { billGenFunc } from './billGenFunc';






class Billing extends Component {

    state = {
        coupon: ''
    }


    onChangeCoupon = (e) => {

        const input = e.target.value;
        this.setState({
            coupon: input
        })

    }

    applyCouponHandler = () => {
        const { cartList, firestore } = this.props
        const { coupon } = this.state
        console.log('coupon', coupon)

        const bill = billGenFunc(cartList, coupon);

        firestore.update({ collection: 'bill', doc: 'bill' }, bill)

    }


    render() {
        const { bill, cartList } = this.props



        if (cartList) {
            if (cartList.length === 0) {
                return (
                    <div>
                        <h3 className="big-text">Add Items In Cart First</h3>
                        <Link className="btn btn-primary" to="/" >Go To Home</Link>
                    </div>
                )
            }
        }

        if (bill) {

            console.log('bill', bill.is)
            return (

                <div className="container">

                    <div className="container mt-5 ">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item"><Link to="/cartList">Cart</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Billing:</li>
                            </ol>
                        </nav>
                    </div>


                    <div className=" mb-5 mt-5 ">
                        <div className="d-block"><label className="text-primary">Have A     Coupon?</label>
                        </div>
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <div className="input-group  ">

                                    <input type="text" className="form-control" placeholder="Add Coupon" aria-label="Add Coupon" aria-describedby="button-addon2"
                                        name="coupon" value={this.state.coupon} onChange={this.onChangeCoupon}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button" id="button-addon2" onClick={this.applyCouponHandler}>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>{bill[0].isCouponAplied ? <p className="text-success">Coupon Is Applied <i className="fas fa-check-circle"></i></p> : null}</div>
                    </div>



                    <div className="container billing-card-container mt-4 ">
                        <div className="card-header container mb-3 billing-card-style">
                            <div className="card-header ">Billing:</div>

                            <div className="card-body">
                                <div className="container row">
                                    <p className="text-primary col-md-8 col-sm-4  ">No.of Items:-</p>
                                    <p className="card-text col-md-4 col-sm-8 text-center">{bill[0].billItems}</p>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="container row">
                                    <p className="text-primary col-md-8 col-sm-4 ">Cart Amount:-</p>
                                    <p className="card-text col-md-4 col-sm-8 text-center">{bill[0].billAmount.toFixed(2)}{'\u20B9'}</p>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="container row">
                                    <p className="text-primary col-md-8 col-sm-8 ">Shiping:-</p>
                                    <p className="card-text col-md-4 col-sm-4 text-center">Free</p>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="container row">
                                    <p className="text-primary col-md-8 col-sm-8 ">GST(18%):-</p>
                                    <p className="card-text col-md-4 col-sm-4 text-center">{bill[0].billGST.toFixed(2)}{'\u20B9'}</p>
                                </div>
                            </div>


                            <div className="card-body">
                                <div className="container row">
                                    <p className="text-primary col-md-8 ">Discount Applied:-</p>
                                    <p className="card-text col-md-4 text-center">{bill[0].billDiscount.toFixed(2)}{'\u20B9'}</p>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="container row">
                                    <p className="text-primary col-md-8 ">Total:-</p>
                                    <p className="card-text col-md-4 text-center">{bill[0].billTotal.toFixed(2)}{'\u20B9'}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="container mt-5 mb-5">
                        <button type="button" className="btn btn-primary btn-lg  m-auto">
                            Proceed To Pay <i class="fas fa-arrow-circle-right"></i>
                        </button>
                    </div>
                </div>

            )
        } else {
            return null
        }


    }
}


export default compose(firestoreConnect([{ collection: 'bill' }, { collection: 'cartList' }]), connect((state, props) => ({
    bill: state.firestore.ordered.bill,
    cartList: state.firestore.ordered.cartList
})))(Billing);