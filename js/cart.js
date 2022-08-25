const addEmptyCart = () => `<p>No items in cart yet, add one first!</p>`;

const populateCards = (mate) => `<div class="card" style="width: 18rem;">
                <img src="./images/Mate_Cincelado_1-265x331.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${mate.title}</h5>
                    <p class="card-text">$ ${mate.price}</p>
                   <button class="btn btn-danger delete-cart-btn" data-mate-id="${mate.id}">Remove from cart</button>
                </div>
            </div>`;

const removeFromLocalStorage = (mateId) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(
    cart.findIndex((el) => el.id === mateId),
    1
  );
  localStorage.setItem("cart", JSON.stringify(cart));
  swal("Item removed to cart");
};

const addRemoveToCartEL = () => {
  const matesCardsBtns = document.getElementsByClassName("delete-cart-btn");
  Array.prototype.forEach.call(matesCardsBtns, (btn) =>
    btn.addEventListener("click", () => {
      removeFromLocalStorage(btn.getAttribute("data-mate-id"));
      updateHtml();
    })
  );
};

const updateHtml = () => {
  const cartContainer = document.getElementById("cartContainer");
  const cart = JSON.parse(localStorage.getItem("cart"));
  cartContainer.innerHTML =
    cart && cart.length ? cart.map((el) => populateCards(el)) : addEmptyCart();
  addRemoveToCartEL();
};

// Listen to dom load to paste items
addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cartContainer");
  const localStorageCart = JSON.parse(localStorage.getItem("cart"));
  cartContainer.innerHTML =
    localStorageCart && localStorageCart.length
      ? localStorageCart.map((mate) => populateCards(mate))
      : addEmptyCart();
  addRemoveToCartEL();
});
