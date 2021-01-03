var coursesAPI = 'http://localhost:3000/product';
//Get API
let getAPI = (callback) =>
{
  fetch(coursesAPI)
    .then((response) =>
    {
      return response.json();
    })
    .then(callback);
};
//run
function start()
{
  getAPI(loadJson);
}
window.addEventListener('load', start());





function loadJson(product)
{
  console.log(product);





  product.map((el) =>
  {
    renderHtml(el);
  })

  const allProducts = document.querySelectorAll('.buy-btn');

  const buyList = getBuyName(allProducts);

  buyList.forEach((element, index) =>
  {
    document.querySelector(`.${ element }`).addEventListener('click', () =>
    {

      if(checkLogin()==false){
        window.location.assign('login.html');
      }

      document.querySelector(`.${ element }`).style.backgroundColor = '#966d4b';
      productQuantity();
      setCartItem(product[index]);
      reRenderQuantity();
      DOM.cart.style.right = '0';
      
    })
  })
  cartAnimation();
}
//render cart
function renderCart(item, id,product)
{
  var html = `<div class="item item-${ id }">
  <ul>
    <li class="item-adjust item-adjust-${ id }">
      <span class="plus">+</span>
      <span class="number">${ item.status }</span>
      <span class="minus"><i class="fas fa-minus" style="font-size:14px"></i></span>
    </li>
    <li class="cart-img">
        <img src="${ item.img }" alt="">
    </li>
    <li class="cart-name">${ spliceCartName(item.name) }</li>
    <li class="cart-price">${ item.price }</li>
    <li class="cancel"><i class="fas fa-times" id="del-cart-${ id }"></i></li>
  </ul>
</div>`;
  DOM.cartBody.insertAdjacentHTML('beforeend', html);
  plusItem(item,id);
}


//delete item form cart
function deleteCart(id, product)
{ 
  const del = document.getElementById(`del-cart-${ id }`);

  del.addEventListener('click', () =>
  {
    //remove parent item
    recountQuantity(id);
    del.parentNode.parentNode.parentNode.remove();
    let cartItem = localStorage.getItem('cartItem');
    cartItem = JSON.parse(cartItem);
    product.status = 0;
    cartItem[id].status = 0;
    delete cartItem[id];
    cartItem = JSON.stringify(cartItem);
    // NOTE  reset cartItem on localStorage
    localStorage.setItem('cartItem', cartItem);
    // RESET style for buy button
    document.querySelector(`.buy-btn-${ id }`).style.backgroundColor = 'rgb(204, 112, 37)';
    reRenderQuantity();
    SumPrice();
  })
}

function SumPrice()
{ 
  let cartItem = localStorage.getItem('cartItem');
  cartItem = JSON.parse(cartItem);
  if (cartItem)
  {
    let priceView = Object.keys(cartItem).reduce((sum, current) =>
    {
      let prefixPrice = cartItem[current].price.split(' ')[0];
      let price = prefixPrice.split('.').join('');
      price = parseInt(price) * cartItem[current].status;
      return sum += price;
    }, 0);
    priceView = priceView.toString();
    let result = '';
    let count = 0;
    let finalPice = priceView.split('');
    for (let i = finalPice.length - 1; i >= 0; i--)
    {
      if (count == 3)
      {
        result += '.';
        count = 0;
      }
      result += finalPice[i];
      count++;
    }
    
    result = result.toString().split('').reverse().join('');
    document.querySelector('.total-price').textContent = result + ' đ';
  }
}

function recountQuantity(id)
{
  let getLocalQuantity = localStorage.getItem('productQuantity');

  getLocalQuantity = parseInt(getLocalQuantity);

  let itemAdjust = document.querySelector(`.item-adjust-${ id }`);

  let quantity = itemAdjust.childNodes[3].textContent;

  quantity = parseInt(quantity);

  getLocalQuantity = getLocalQuantity - quantity;

  localStorage.setItem('productQuantity', getLocalQuantity);

  DOM.cartItem.textContent = getLocalQuantity + ' items';
}



//splice name in cart
function spliceCartName(element)
{
  let name = element.split('(');

  return name[0];
}
//add item to cart
function addToCart(product)
{
  document.querySelector('.cart-body').innerHTML = '';

  let cartItem = localStorage.getItem('cartItem');

  if (cartItem)
  {

    cartItem = JSON.parse(cartItem);

    const cartID = Object.keys(cartItem);

    cartID.map((el) =>

    {
      renderCart(cartItem[el], el,product);
      deleteCart(el, product);
      
    })
  }
}

function plusItem(product,id){
  const adjust = document.querySelector(`.item-adjust-${id}`);
  let cartItem = localStorage.getItem('cartItem');
  cartItem = JSON.parse(cartItem);
  let quantity = localStorage.getItem('productQuantity');
  quantity = parseInt(quantity);
  let number = parseInt(adjust.children[1].textContent);
  adjust.children[0].addEventListener("click",()=>{
          cartItem[id].status += 1;
          number += 1;
          adjust.children[1].textContent = cartItem[id].status;
          localStorage.setItem('cartItem',JSON.stringify(cartItem));
          SumPrice();
          productQuantity();
  });
}

function cartAnimation()
{
  DOM.closeCart.addEventListener('click', () =>
  {
    DOM.cart.style.right = '-100%';
  })
}

function checkLogin()
{
  const login = localStorage.getItem('sign');

  if (login)
  {
    return true;
  }
  return false;
}

function setCartItem(product)
{

  let cartItem = localStorage.getItem('cartItem');

  cartItem = JSON.parse(cartItem);

  if (cartItem)
  {
    if (cartItem[product.id] == undefined)
    {
      cartItem = {
        ...cartItem,
        [product.id]: product
      }
    }
    cartItem[product.id].status += 1;
  } else
  {
    product.status = 1;
    cartItem = {
      [product.id]: product
    }
  }
  cartItem = JSON.stringify(cartItem);

  localStorage.setItem('cartItem', cartItem);
  addToCart(product);
  SumPrice();
}





function reRenderQuantity()
{   
  let cartItem = localStorage.getItem('cartItem');

  if (cartItem)
  {
    cartItem = JSON.parse(cartItem);

    let quantity = 0;
    Object.keys(cartItem).forEach(key =>
    {
      quantity += cartItem[key].status;
    })
    localStorage.setItem('productQuantity', quantity);

    document.querySelector('#cart-item').textContent = `${ quantity } items`;
  }
}

var DOM = {
  cart: document.querySelector('.cart'),
  closeCart: document.querySelector('.fa-times-circle'),
  cartItem: document.querySelector('#cart-item'),
  cartBody: document.querySelector('.cart-body')
}

function productQuantity()
{
  let quantity = localStorage.getItem('productQuantity');

  if (quantity){
    quantity = parseInt(quantity);

    quantity += 1;

    localStorage.setItem('productQuantity', quantity);

    DOM.cartItem.textContent = quantity + ' items';
    
  } else
  {

    localStorage.setItem('productQuantity', 1);

    DOM.cartItem.textContent = 1 + ' items';
  }
}

function getProductTagName(productName)
{

  const tagName = productName.name.split(' ');

  return tagName;
}

//get buy all button name
function getBuyName(list)
{
  const productList = Object.keys(list).map((key) =>{
    return list[key].classList[1];
  })
  return productList;
}
///render len html
function renderHtml(el)
{
  var html = '<div class="product__item product-' + el.id + '"><a class="product__item-top" href="product.html?id=' +
    el.id + '"><span id="new">Mới</span><span id="hot">Hot</span><img src="' + el.img + '" id="item-img" alt=""></a><div class="product__item-bottom"><a class="product__item-bottom-link"><div class="item-inf"><div class="item-name">' + el.name + '</div><div class="item-price">' + el.price + '</div></div><div class="item-buy"><span  class="buy-btn buy-btn-' + el.id + '">Mua</span></div></a><div class="product__item-bottom-gift"><p>1. Tặng<span> Cường lực - Ốp lưng - Tai nghe</span> khi mua BHV</p><p>2. Giảm <span>100K</span> áp dụng HSSV Mua BHV</p></div></div></div>';
    
    document.querySelector('.product').insertAdjacentHTML('beforeend', html);
}
//Them vao json
// function create(data,callback){
//   var options={
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   }
//   fetch(coursesAPI,options)
//     .then((response)=>{
//       response.json();
//     })
//     .then(callback)
// }






// function adjustCartItem(id){
//   const adjust = document.querySelector(`.item-adjust-${id}`);
//   const plus = adjust.children[0];
//   let cartItem = localStorage.getItem('cartItem');
//   cartItem = JSON.parse(cartItem);
//   plus.addEventListener('click',()=>{
//         productQuantity();
//         cartItem[id].status += 1;
//   })
// }

