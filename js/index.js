let pizzaCartInstance = pizzaCartLogic()

document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartLogic', pizzaCartLogic);
  });

