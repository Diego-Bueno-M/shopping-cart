const saveCartItems = () => {
  // seu código aqui
  const cart = document.querySelector('.cart__items');
  const saveCart = localStorage.setItem('itemList', cart.innerHTML);
  return saveCart;
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
