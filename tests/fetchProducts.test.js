require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('testa se é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function')
  });
  test(`testa se ao executar a função passando 'computador' como argumento a função fetch é chamada`, async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  test(`testa se ao executar a função passando 'computador' como argumento a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"`, async () => {
    expect.assertions(1);
    const endpoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })
  test(`testa se ao executar a função passando 'computador' como argumento retorna um objeto igual à computadorSearch`, async () => {
    expect.assertions(1);
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  })
  test(`testa se ao executar a função sem parametro retorna o erro 'You must provide an url'`, async () => {
    expect.assertions(1);
    const result = await fetchProducts('');
    expect(result).toStrictEqual(new Error('You must provide an url'));
  })
    
});
