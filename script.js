const itens = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  // coloque seu código aqui
  const teste = event.target;
  cartItems.removeChild(teste);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const funcaoTeste = async (param) => {
  const data = await fetchProducts(param);
  const item = {};
  data.results.forEach((element) => {
    item.sku = element.id;
    item.name = element.title;
    item.image = element.thumbnail;
    itens.appendChild(createProductItemElement(item));
  });
};

const funcaoTeste2 = async (param) => {
  const data = await fetchItem(param);
  const item = {
  sku: data.id,
  name: data.title,
  salePrice: data.price,
  };
  cartItems.appendChild(createCartItemElement(item));
};

window.onload = () => {
  funcaoTeste('computador');
  funcaoTeste2('MLB1341706310');
 };
