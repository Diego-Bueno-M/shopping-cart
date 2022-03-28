const saveCartItems = (item) => {
  const saved = localStorage.setItem('cartItems', item);
  return saved;
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
