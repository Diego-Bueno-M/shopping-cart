const cart = document.querySelector('.cart__items');

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

const createCounter = () => {
  const cartItems = document.querySelector('.cart');
  const counter = document.createElement('div');
  counter.className = 'total-price';
  counter.innerText = 'Subtotal';
  cartItems.appendChild(counter);
  return counter;
};

const counterCalculate = async (param) => {
  const counter = createCounter();
  if (!param) {
    const cartItems = document.querySelector('.cart__items');
    const items = cartItems.childNodes;
    let totalPrice = 0;
    items.forEach((product) => {
      const productText = product.innerText;
      // uso do indexOf com a ajuda do site => https://www.devmedia.com.br/javascript-indexof-encontrando-a-posicao-de-um-caractere-ou-string/39422
      const priceIndex = productText.indexOf('$');
      // uso do substring com a ajuda do site => https://www.devmedia.com.br/javascript-substring-selecionando-parte-de-uma-string/39232
      const produtPrice = productText.substring(priceIndex + 1);
      totalPrice += parseFloat(produtPrice);
  });
  counter.innerText = `Subtotal R$${totalPrice}`;
  } else if (param === 0) {
    counter.innerText = 'Subtotal R$ 0';
  }
};

function cartItemClickListener(event) {
  // coloque seu código aqui
  const productToRemove = event.target;
  productToRemove.remove();
  console.log(productToRemove);
  counterCalculate();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function setLocalStorage() {
  saveCartItems(cart.innerHTML);
}

const eraseItems = () => {
  cart.innerHTML = '';
  setLocalStorage();
  counterCalculate(0);
};

// Adiciona um produto ao carrinho de compras (precisa do obj com sku, nome e preço)
function addToCart(obj) {
  const eraseBtn = document.querySelector('.empty-cart');
  
  const itemToCart = createCartItemElement(obj);
  cart.appendChild(itemToCart);
  // tenho que chamar a função de apagar todos os itens aqui, pq é aqui que esta sendo criada a lista
  eraseBtn.addEventListener('click', eraseItems);
  setLocalStorage();
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
  counterCalculate();
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
 // depois percorro o array para pegar outras informações a adiconar o evento de cliclk
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
  setLocalStorage();
  getSavedCartItems();
  // createCounter();
};