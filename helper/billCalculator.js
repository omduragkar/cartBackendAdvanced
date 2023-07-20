const { PRODUCT, SERVICE } = require("../constants/type");

const calculateItemValueHelper = (item, quantity) => {
    let totalBill = {
        billAmount: 0,
        taxAmount: 0,
        totalAmount: 0
    };
    quantity = Number(quantity);
    let price = Number(item.price*quantity);
    totalBill.billAmount += price;
    console.log({totalBill, price, item})
    // Apply tax calculation based on the price range and item type
    if (item.type == PRODUCT) {
        /**
         * Tax PA: PC is 12% for items with price > 1000 and <= 5000
         * Tax PB: PC is 18% for items with price > 5000
         * Tax PC: PC is 200 for all items
         */
        if (price > (1000*quantity) && price <= (5000*quantity)) {
            totalBill.taxAmount += price * 0.12;
        } else if (price > (5000*quantity)) {
            totalBill.taxAmount += price * 0.18;
        } 
        totalBill.taxAmount += (200*quantity); // Apply Tax PC to all products with a flat tax amount of 200
    } else if (item.type == SERVICE) {
        /**
         * Tax SA: SC is 10% for items with price > 1000 and <= 8000
         * Tax SB: SC is 15% for items with price > 8000
         * Tax SC: SC is 100 for all items
         * 
         */
        if (price > (1000*quantity) && price <= (8000*quantity)) {
            totalBill.taxAmount += price * 0.1;
        } else if (price > (8000*quantity)) {
            totalBill.taxAmount += price * 0.15;
        }
        totalBill.taxAmount += (100*quantity); // Apply Tax SC to all services with a flat tax amount of 100
    }
    totalBill.totalAmount = totalBill.billAmount + totalBill.taxAmount;
    return totalBill;
};     

const calculateItemValue = async (item, quantity) => {
    let totalBill = await new Promise((resolve, reject) => {
        const totalBill = calculateItemValueHelper(item, quantity);
        resolve(totalBill);
    })
    return totalBill;
}


const calculateCartValueHelper = (cartItems) => {
    let totalBill = {
        cartBillAmount: 0,
        cartTax: 0,
        cartTotalAmount: 0
    };
    cartItems.forEach(item => {
        totalBill.cartBillAmount += item.billAmount;
        totalBill.cartTax += item.taxAmount;
        totalBill.cartTotalAmount += item.totalAmount;
    });
    return totalBill;
}
const calculateCartValue = async (cart) => {
    let totalBill = await new Promise((resolve, reject) => {
        const totalBill = calculateCartValueHelper(cart);
        resolve(totalBill);
    })
    return totalBill;
}
module.exports = {calculateItemValue, calculateCartValue};

