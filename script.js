const contactForm = document.getElementById('contact');
const container = document.getElementById('container');

// Check if both elements exist before adding event listener
if (contactForm && container) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        container.innerHTML = "Form Submitted!";
    });
}




/* PRODUCT PAGE */
const productPageCont = document.getElementById('productPageCont');
if (productPageCont) {
    const nameElem = productPageCont.querySelector('h2');
    const priceElem = productPageCont.querySelector('p');
    const imgElem = productPageCont.querySelector('img');

    nameElem.innerHTML = window.localStorage.getItem("productName");
    priceElem.innerHTML = window.localStorage.getItem("productPrice");
    imgElem.src = window.localStorage.getItem("productImg");

    const addToCartBtn = document.getElementById("addToCart");

    addToCartBtn.addEventListener("click", () => {
        let product = {
            name: nameElem.innerHTML,
            price: priceElem.innerHTML,
            img: imgElem.src
        };
        addToCart(product);
    });
}
if(document.querySelector('.cupcakeDiv')){
  generateProducts();
}


function generateProducts() {
  const cupcakeCont = document.querySelector(".cupcakeDiv .product-container");
  const cakeCont = document.querySelector(".cakeDiv .product-container");

  fetch('products.json')
    .then(response => response.json())
    .then(json => {
      const { cupcakes, weddingCakes } = json;

      cupcakes.forEach(product => {
        const item = createProductElement(product);
        cupcakeCont.appendChild(item);
      });

      weddingCakes.forEach(product => {
        const item = createProductElement(product);
        cakeCont.appendChild(item);
      });
    });
}

function createProductElement(product) {
  const item = document.createElement("div");
  item.className = "product";

  item.innerHTML = `
    <img src="${product.imgSrc}" alt="${product.name}" class="product-image">
    <h2 class="product-title">${product.name}</h2>
    <p class="product-price">${product.price}</p>
  `;

  item.addEventListener("click", () => {
    window.localStorage.setItem("productName", product.name);
    window.localStorage.setItem("productPrice", product.price);
    window.localStorage.setItem("productImg", product.imgSrc);
    window.location = "product.html";
  });

  return item;
}


function generateCart() {
    let products =  JSON.parse(window.localStorage.getItem("cart")) || [];

    const cartContainer = document.getElementById("cart");
    let total = 0;

    for (let product of products) {
      const item = document.createElement("div");
      item.className = "cart-item";

      const priceValue = parseFloat(product.price.replace("$", ""));
      total += priceValue;

      item.innerHTML = `
        <div class="item-image">
          <img src="${product.img}" alt="${product.name}" />
        </div>
        <div class="item-details">
          <div class="item-title">${product.name}</div>
          <div class="item-price">Price: ${product.price}</div>
        </div>
      `;

      cartContainer.appendChild(item);
    }
    const summary = document.createElement("div");
    summary.className = "summary";
    summary.textContent = `Total: $${total.toFixed(2)}`;
    cartContainer.appendChild(summary);
  }

if(document.getElementById('cart')){
    generateCart();
}

function addToCart(product) {
    // Get the current cart from localStorage (or initialize it as an empty array if none exists)
    let products = JSON.parse(window.localStorage.getItem("cart")) || [];

    // Add the new product to the cart
    products.push(product);

    // Save the updated cart back to localStorage
    window.localStorage.setItem("cart", JSON.stringify(products));

    alert(product.name + " succesfully added to cart");
}
