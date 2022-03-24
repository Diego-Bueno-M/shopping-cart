require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('testa se é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function')
  })
  test(`testa se ao executar a função passando 'MLB1615760527' como argumento a função fetch é chamada`, async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  test(`testa se ao executar a função passando 'MLB1615760527' como argumento a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"`, async () => {
    expect.assertions(1);
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })
  test(`testa se ao executar a função passando 'MLB1615760527' como argumento retorna um objeto igual à item`, async () => {
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  })
  test(`testa se ao executar a função sem parametro retorna o erro 'You must provide an url'`, async () => {
    expect.assertions(1);
    const result = await fetchItem('');
    expect(result).toStrictEqual(new Error('You must provide an url'));
  })
});
