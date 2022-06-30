const { storage } = require("../data/storage")
const { InformationMissing } = require('../utils/errors.js')

class Store{
    constructor(products, purchases){
        this.super();
        this.products = products
        this.purchases = purchases
    }

    static setProducts(products){
        products = products
    }

    static setPurchases(purchases){
        purchases = purchases
    }

    static getProducts(){
        return products
    }

    static getPurchases(){
        return purchases
    }

    static async recordPurchase(newPurchase){
        console.log('newPurchase.user: ', newPurchase.user);
        if (newPurchase.user.name == "" || newPurchase.user.email == ""){
            throw new InformationMissing()
        }

        const newReciept = {
            id: storage.get("purchases").length,
            user: newPurchase.user,
            shoppingCart: newPurchase.shoppingCart,
            total: newPurchase.subtotal + (newPurchase.subtotal * 0.0875),
            createdAt: new Date()
        }

        console.log('newReciept: ', newReciept);
        storage.add("purchases", newReciept)
        console.log("Purchase added")

        return newPurchase
    }
}

module.exports = Store
