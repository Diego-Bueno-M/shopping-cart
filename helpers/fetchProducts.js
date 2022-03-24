const fetchProducts = async (query) => {
  // seu código aqui
  if (!query) {
    return new Error('You must provide an url');
  }
  const promise = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const response = await promise.json();
  return response;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
