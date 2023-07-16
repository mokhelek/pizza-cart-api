function pizzaCartLogic() {
    return {
        cartCode: "",
        userCart: [],
        addToCart(pizzaID) {
            axios
                .post("https://pizza-api.projectcodex.net/api/pizza-cart/add", {
                    cart_code: this.cartCode,
                    pizza_id: pizzaID,
                })
                .then(function (response) {
                    console.log(response);
                });

                console.log(this.userCart)
        },
        removeFromCart(pizzaID) {
            axios
                .post("https://pizza-api.projectcodex.net/api/pizza-cart/remove", {
                    cart_code: this.cartCode,
                    pizza_id: pizzaID,
                })
                .then(function (response) {
                    console.log(response);
                });

                console.log(this.userCart)
        },
        createCartCode() {},
        viewCart: false,
        clickViewCart() {
            this.viewCart = !this.viewCart;
        },

        pizzaList: [],
        init() {
            axios.get("https://pizza-api.projectcodex.net/api/pizzas").then((result) => {
                this.pizzaList = result.data.pizzas;
            });

            if (localStorage["cartCode"]) {
                this.cartCode = localStorage.getItem("cartCode");
            } else {
                axios.get("https://pizza-api.projectcodex.net/api/pizza-cart/create?username=mokhelek").then((result) => {
                    localStorage["cartCode"] = result.data.cart_code;
                    this.cartCode = JSON.parse(localStorage["cartCode"]);
                });
            }

            axios.get(`https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartCode}/get`).then((result) => {
                // this.pizzaList = result.data.pizzas;
                console.log("MY CART ITEMS ", result.data.pizzas);
                this.userCart = result.data.pizzas;
            });
        },
    };
}

/*


* GET https://pizza-api.projectcodex.net/api/pizzas


### create a cart for a user
* GET https://pizza-api.projectcodex.net/api/pizza-cart/create?username=mokhelek 


### Get a Cart
* GET https://pizza-api.projectcodex.net/api/pizza-cart/Jz0uuXv0ep/get


### Add Pizza to cart

* POST https://pizza-api.projectcodex.net/api/pizza-cart/add
content-type: application/json 

{
    "cart_code": "Jz0uuXv0ep",
    "pizza_id":"7"
}


### Remove Pizza from Cart
POST https://pizza-api.projectcodex.net/api/pizza-cart/remove
content-type: application/json 

{
    "cart_code": "Jz0uuXv0ep",
    "pizza_id":"7"
}


### Pay for the cart 
POST https://pizza-api.projectcodex.net/api/pizza-cart/pay
content-type: application/json 

{
	"cart_code" : "Jz0uuXv0ep",
	"amount" : "500"

}



*/
