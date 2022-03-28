const getSavedCartItems = () => {
  // seu código aqui
  const cart = document.querySelector('.cart__items');
  cart.innerHTML = localStorage.getItem('itemList');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
