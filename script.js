function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const productToRemove = event.target;
  productToRemove.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Adiciona um produto ao carrinho de compras (precisa do obj com sku, nome e preço)
function addToCart(obj) {
  const cart = document.querySelector('.cart__items');
  const itemToCart = createCartItemElement(obj);
  cart.appendChild(itemToCart);
}

async function getObjfomItem(event) {
  const addBtn = event.target;
  // parent é o elemento inteiro referente ao botão clicado (com isso consigo as infomarções para criar o obj)
  const item = addBtn.parentNode;
  const productSku = getSkuFromProductItem(item);
  const response = await fetchItem(productSku);
  const productObj = {
    sku: response.id,
    name: response.title,
    salePrice: response.price,
  };
  addToCart(productObj);
}

// O parametro é o retorno da fetchProducts.results que é a array dos produtos
function appendItens(APIarray) {
  const items = document.querySelector('.items');
  // seleciono só as informações que preciso da API
  const itemsArray = APIarray.map((item) => {
    const shortObj = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    return shortObj;
  });
  // depois das informações necessárias é só percorrer o array
  itemsArray.forEach((item) => {
    const itenToadd = createProductItemElement(item);
    items.appendChild(itenToadd);
    const button = itenToadd.lastElementChild;
    button.addEventListener('click', getObjfomItem);
  });
}

window.onload = async () => {
  const api = await fetchProducts('computador');
  appendItens(api.results);
};