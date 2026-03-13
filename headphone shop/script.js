const products = [
    { id: 1, name: "Green Lion GL-400 Kids Wireless Head Phone - Pink", price: 199, image: "images/Green Lion GL-400 Kids Wireless Head Phone - Pink  GNK400HPPK.jpeg" },
    { id: 2, name: "JBL Tune 670NC - Noise Cancelling Headphones - Purple ", price: 249, image: "images/JBL Tune 670NC - Noise Cancelling Headphones - Purple  JBLT670NCPUR.jpeg" },
    { id: 3, name: "JBL Tune 720BT Wireless Over-Ear Headphones – Black", price: 179, image: "images/JBL Tune 720BT Wireless Over-Ear Headphones – Black  T720BTBLK.jpeg"  },
    { id: 4, name: "Logitech G733 LIGHTSPEED Wireless Gaming Headset with Suspension Headband - Black", price: 129, image: "images/Logitech G733 LIGHTSPEED Wireless Gaming Headset with Suspension Headband - Black  981-000863.jpeg"  },
    { id: 5, name: "Porodo Soundtec Zen Active Noise-Cancellation Headphone", price: 299, image: "images/Porodo Soundtec Zen Active Noise-Cancellation Headphone  PD-STWLEP025-BK.jpeg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];


const productList = document.getElementById("product-list");

function renderProducts(filter = "") {
    productList.innerHTML = "";

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" class="product-img">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(card);
    });
}

renderProducts();



document.getElementById("search").addEventListener("input", (e) => {
    renderProducts(e.target.value);
});


function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}



function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

updateCartCount();


const cartBtn = document.getElementById("cart-btn");
const cartPopup = document.getElementById("cart-popup");

cartBtn.addEventListener("click", () => {
    showCart();
    cartPopup.classList.remove("hidden");
});

document.querySelector(".close-cart").addEventListener("click", () => {
    cartPopup.classList.add("hidden");
});

function showCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(div);
    });

    document.getElementById("cart-total").textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
    updateCartCount();
}