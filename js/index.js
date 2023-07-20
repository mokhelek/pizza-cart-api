let pizzaCartInstance = pizzaCartLogic()

document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartLogic', pizzaCartLogic);
  });



// const dropdownElem = document.querySelector(".type-filter-dropdown");
// dropdownElem.addEventListener("change", function (e){
//   // alert(e.target.value)
//   pizzaCartInstance.filterPizzas(e.target.value)

// })

