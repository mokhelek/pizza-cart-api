function pizzaCartLogic() {
    return {
        displayData() {
            axios.get(`https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartCode}/get`).then((result) => {
                this.userCart = result.data;
            });
        },
        newCart() {
            axios.get("https://pizza-api.projectcodex.net/api/pizza-cart/create?username=mokhelek").then((result) => {
                localStorage["cartCode"] = result.data.cart_code;
                this.cartCode = JSON.parse(localStorage["cartCode"]);
            });
        },
        paymentAmount: "",
        paymentFeedback: "",
        cartCode: "",
        userCart: [],
        pizzaList: [], // ? I can filter this
        favoritePizzas:[],
        viewCart: false,
        checkoutClicked: false,
        clickCheckout() {
            this.checkoutClicked = !this.checkoutClicked;
            this.orderSummery();
        },
        addToCart(pizzaID) {
            axios
                .post("https://pizza-api.projectcodex.net/api/pizza-cart/add", {
                    cart_code: this.cartCode,
                    pizza_id: pizzaID,
                })
                .then(() => {
                    this.displayData();
                });
        },

        addToFavorites(pizzaID){
            axios.post("https://pizza-api.projectcodex.net/api/pizzas/featured", {
                "username" : "mokhelek",
                "pizza_id" : pizzaID
            })
            .then(() => {
                this.displayFavoritePizzas();
            });
        },
        displayFavoritePizzas(){
            axios.get(`https://pizza-api.projectcodex.net/api/pizzas/featured?username=mokhelek`).then((result) => {
                this.favoritePizzas = result.data ;
                console.log("Featured Pizzas  ",result.data)
            });
        },

        removeFromCart(pizzaID) {
            axios
                .post("https://pizza-api.projectcodex.net/api/pizza-cart/remove", {
                    cart_code: this.cartCode,
                    pizza_id: pizzaID,
                })
                .then(() => {
                    this.displayData();
                })
                .catch((error) => {
                    console.error("Error adding pizza to cart:", error);
                });
        },

        clickViewCart() {
            this.viewCart = !this.viewCart;
        },
        submitPayment() {
            axios
                .post("https://pizza-api.projectcodex.net/api/pizza-cart/pay", {
                    cart_code: this.cartCode,
                    amount: this.paymentAmount,
                })
                .then((response) => {
                    // this.displayData();
                    console.log(response.data);

                    if (response.data.status == "success") {
                        this.paymentFeedback = "Payment successful";
                        this.newCart();

                        setTimeout(() => {
                            location.reload();
                        }, 3000);
                    } else {
                        this.paymentFeedback = "Insufficient payment amount";
                    }
                });
        },

        init() {
            axios.get("https://pizza-api.projectcodex.net/api/pizzas").then((result) => {
                this.pizzaList = result.data.pizzas;
            });

            if (localStorage["cartCode"]) {
                this.cartCode = localStorage.getItem("cartCode");
            } else {
                this.newCart();
            }

            this.displayData();
            this.displayFavoritePizzas();
            console.log("FAVORITE PIZZAS ",this.favoritePizzas)
        },

        orderSummery() {
            let quantity = 0;
            for (i in this.userCart.pizzas) {
                quantity += this.userCart.pizzas[i].qty;
            }
            return quantity;
        },
        filterPizzas(type) {
            // this.pizzaList = this.pizzaList.filter((pizza) => type == "" || pizza.type == type);
            console.log(this.pizzaList)
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
* POST https://pizza-api.projectcodex.net/api/pizza-cart/remove
content-type: application/json 

{
    "cart_code": "Jz0uuXv0ep",
    "pizza_id":"7"
}


### Pay for the cart 
* POST https://pizza-api.projectcodex.net/api/pizza-cart/pay
content-type: application/json 

{
	"cart_code" : "Jz0uuXv0ep",
	"amount" : "500"

}



*/
