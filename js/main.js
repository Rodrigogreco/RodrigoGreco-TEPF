let mates = undefined;

const addToCart = (mateId) => {
  const actualCart = JSON.parse(localStorage.getItem("cart"));
  const mateToAdd = mates.find((mate) => mate.id === mateId);
  const newCart = actualCart ? [...actualCart, mateToAdd] : [mateToAdd];
  localStorage.setItem("cart", JSON.stringify(newCart));
  swal("Item added to cart");
};

const addAddToCartEL = () => {
  const matesCardsBtns = document.getElementsByClassName("add-cart-btn");
  Array.prototype.forEach.call(matesCardsBtns, (btn) =>
    btn.addEventListener("click", () =>
      addToCart(btn.getAttribute("data-mate-id"))
    )
  );
};

const populateCards = (mate) => `<div class="card" style="width: 18rem;">
                <img src="./images/Mate_Cincelado_1-265x331.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${mate.title}</h5>
                    <p class="card-text">$ ${mate.price}</p>
                   <button class="btn btn-primary add-cart-btn" data-mate-id="${mate.id}">Add to cart</button>
                </div>
            </div>`;

const loadContent = () => {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = mates.map((mate) => populateCards(mate));
  addAddToCartEL();
};

// Fetch items
addEventListener("DOMContentLoaded", () => {
  fetch("https://6306b6ef3a2114bac753949d.mockapi.io/mates")
    .then((response) => response.json())
    .then((data) => {
      mates = data;
      loadContent();
    });
});
