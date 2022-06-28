class Storage{
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
}

module.exports = Storage
