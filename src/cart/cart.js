
export class Cart {
    constructor(){
        this.key = 'IT_SPA_CART';

        if(!this.exists()){
            this.setItSpaCart([]);
        }
    }

    get() {
        const cookies = document.cookie.split(';');
        return cookies.find(cookie => cookie.startsWith(this.key))

    }

    exists() {
        return this.get() !== undefined
    }

    getItSpaCart(){
        const cookieValue = this.get().slice(this.key.length + 1); //12
        const parsedValue = JSON.parse(cookieValue);

        return parsedValue;
    }

    setItSpaCart(value){
        const stringifiedValue = JSON.stringify(value);
        document.cookie = `${this.key}=${stringifiedValue}`;
    }
//zakadajac ze koszyk jest tablica
    add(item){
        const cartValue = this.getItSpaCart();
        cart.setItSpaCart([...cartValue, item]);
        //cartValue.concat(item)
    }

    remove(item){
        const cartValue = this.getItSpaCart();
        const itemInCart = cartValue.findIndex(val => val.name === item);
        if(itemInCart !== -1){
            cartValue.splice(itemInCart, 1);
            this.setItSpaCart(cartValue);
        }
    }
    
    
};


// export class Cart {

//     constructor() {
//         this.key = 'IT_SPA_CART';
//     }

//     get() {
//         const cookies = document.cookie.split(';');

//         // zwraca ciag znakow ("IT_SPA_CART=wartosc") lub undefined
//         return cookies.find(cookie => cookie.startsWith(this.key));
//     }

//     exists() {
//         return this.get() !== undefined;
//     }


//     getItSpaCart() {
//         const cookieValue = this.get().slice(12);
//         const parsedValue = JSON.parse(cookieValue);

//         return parsedValue;
//     }

//     setItSpaCart(value) {
//         const stringifiedValue = JSON.stringify(value);
//         document.cookie = `${this.key}=${stringifiedValue}`;
//     }

//     // WAŻNE: zakładając, że koszyk jest tablicą
//     add(item) {
//         // dodaje produkt do koszyka
//         const cartValue = this.getItSpaCart();
//         this.setItSpaCart([...cartValue, item]);
//     }

//     remove(item) {
//         // usuwa produkt z koszyka
//         const cartValue = this.getItSpaCart();
//         const itemInCart = cartValue.findIndex(
//                                 val => val.name === item.name
//                             );

//         if (itemInCart !== -1) {
//             cartValue.splice(itemInCart, 1);
//             this.setItSpaCart(cartValue);
//         }
//     }
// }