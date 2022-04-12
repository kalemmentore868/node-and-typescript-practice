const removeCartBtns = document.querySelectorAll(".btn-danger");
const quantityInputs = document.querySelectorAll(".cart-quantity-input");
const addToCartBtns = document.querySelectorAll(".shop-item-button");

for (let btn of removeCartBtns) {
  btn.addEventListener("click", removeCartItem);
}

for (let input of quantityInputs) {
  input.addEventListener("change", quatityChanged);
}

for (let addToCartBtn of addToCartBtns) {
  addToCartBtn.addEventListener("click", addToCart);
}

document
  .querySelector(".btn-purchase")
  .addEventListener("click", purchaseClicked);

function purchaseClicked() {
  alert("thanks for your purchase");
  const cartItemContainer = document.querySelectorAll(".cart-items")[0];
  while (cartItemContainer.hasChildNodes()) {
    cartItemContainer.removeChild(cartItemContainer.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  const btnClicked = event.target;
  btnClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function addToCart(event) {
  const button = event.target;
  const shopItem = button.parentElement.parentElement;
  const title = shopItem.querySelector(".shop-item-title").innerText;
  const price = shopItem.querySelector(".shop-item-price").innerText;
  const imgSrc = shopItem.querySelector(".shop-item-image").src;

  addRowToCart(title, price, imgSrc);
  updateCartTotal();
}

function addRowToCart(title, price, imgSrc) {
  const cartRow = document.createElement("div");
  const cartItemContainer = document.querySelectorAll(".cart-items")[0];
  cartRow.classList.add("cart-row");
  const cartItemNames = cartItemContainer.querySelectorAll(".cart-item-title");
  for (let cartItemName of cartItemNames) {
    if (cartItemName.innerText === title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  const cartRowContent = `
 
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>

    `;
  cartRow.innerHTML = cartRowContent;
  cartItemContainer.append(cartRow);
  cartRow
    .querySelector(".btn-danger")
    .addEventListener("click", removeCartItem);

  cartRow
    .querySelector(".cart-quantity-input")
    .addEventListener("change", quatityChanged);
}

function quatityChanged(event) {
  input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  updateCartTotal();
}

const updateCartTotal = () => {
  const cartItemContainer = document.querySelectorAll(".cart-items")[0];
  const cartRows = cartItemContainer.querySelectorAll(".cart-row");
  let total = 0;
  for (let cartRow of cartRows) {
    const priceElement = cartRow.querySelector(".cart-price");
    const quantiyElement = cartRow.querySelector(".cart-quantity-input");

    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantity = quantiyElement.value;
    total += price * quantity;
  }

  total = Math.round(total * 100) / 100;
  document.querySelector(".cart-total-price").innerText = `$${total}`;
};
