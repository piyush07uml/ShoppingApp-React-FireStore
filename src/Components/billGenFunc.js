

export const billGenFunc = (cartList, input = null) => {

    let billAmount = 0
    let billGST;
    let billDiscount = 0;
    let billTotal;
    let billItems;
    let bill;
    let isCouponAplied = false


    billAmount = cartList.reduce((accumalator, item) => accumalator + item.totalPrice, 0)

    billGST = billAmount / 100 * 18;


    if (input === "DISC30" && billAmount >= 9000) {
        billDiscount = billAmount / 100 * 30
        isCouponAplied = true;
    } else if (billAmount >= 5000) {
        billDiscount = 500
    }






    billTotal = billAmount + billGST - billDiscount;


    billItems = cartList.length

    bill = {
        billAmount,
        billGST,
        billDiscount,
        billTotal,
        billItems,
        isCouponAplied
    };

    return bill;


}


