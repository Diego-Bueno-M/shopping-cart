const fetchItem = async (itemID) => {
  // seu código aqui
  if (!itemID) {
    return new Error('You must provide an url');
  }
  const promise = await fetch(`https://api.mercadolibre.com/items/${itemID}`);
  const response = await promise.json();
  return response;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
