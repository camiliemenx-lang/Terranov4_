
/* ======================================================
   PROYECTO: TERRANOV4
   ARCHIVO: script.js
   DESCRIPCIÓN: INTERACTIVIDAD + ANIMACIONES + CARRITO
====================================================== */


/* ======================================================
   VARIABLES GLOBALES
====================================================== */
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const searchInput = document.getElementById('searchInput');
const productCards = document.querySelectorAll('.product-card');

let cart = [];


/* ======================================================
   FUNCIONES DEL CARRITO
====================================================== */

// Agregar producto al carrito
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product-card');

        const name = product.querySelector('h3').innerText;
        const priceText = product.querySelector('.price').innerText;
        const price = parseInt(priceText.replace(/\D/g, ''));

        cart.push({ name, price });

        updateCart();
        showNotification(`${name} agregado al carrito 🛒`);
    });
});

// Actualizar carrito
function updateCart() {
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price}
            <button onclick="removeItem(${index})">❌</button>
        `;

        cartItemsContainer.appendChild(li);
    });

    cartCount.innerText = cart.length;
    cartTotal.innerText = `$${total}`;
}

// Eliminar producto
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}


/* ======================================================
   MODAL DEL CARRITO
====================================================== */

// Abrir carrito
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

// Cerrar al hacer click afuera
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});


/* ======================================================
   BUSCADOR DINÁMICO
====================================================== */

if (searchInput) {
    searchInput.addEventListener('keyup', () => {
        const value = searchInput.value.toLowerCase();

        productCards.forEach(card => {
            const name = card.querySelector('h3').innerText.toLowerCase();

            if (name.includes(value)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}


/* ======================================================
   ANIMACIONES AL HACER SCROLL (REVEAL)
====================================================== */

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

document.querySelectorAll('.card, .product-card, section').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});


/* ======================================================
   EFECTOS AL HACER CLICK (RIPPLE EFFECT)
====================================================== */

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {

        const circle = document.createElement('span');
        circle.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        circle.style.left = e.clientX - rect.left + 'px';
        circle.style.top = e.clientY - rect.top + 'px';

        this.appendChild(circle);

        setTimeout(() => circle.remove(), 600);
    });
});


/* ======================================================
   NOTIFICACIONES (TOAST)
====================================================== */

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'toast';
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show-toast');
    }, 100);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}


/* ======================================================
   SCROLL SUAVE EN NAVBAR
====================================================== */

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});


/* ======================================================
   VALIDACIÓN FORMULARIO PEDIDO
====================================================== */

const orderForm = document.getElementById('order-form');

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    showNotification("Pedido enviado correctamente ✅");

    orderForm.reset();
});


/* ======================================================
   EFECTO PARALLAX HERO
====================================================== */

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');

    let scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});


/* ======================================================
   EFECTO NAVBAR SCROLL (CAMBIO DE COLOR)
====================================================== */

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 50) {
        navbar.style.background = '#1b5e20';
    } else {
        navbar.style.background = 'var(--primary)';
    }
});


/* ======================================================
   INICIALIZACIÓN
====================================================== */

console.log("Terranov4 App cargada correctamente 🌱");

document.addEventListener("DOMContentLoaded", () => {

    console.log("JS cargado correctamente ✅");

    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    // 🔍 VALIDACIÓN
    if (!track || slides.length === 0 || !nextBtn || !prevBtn) {
        console.error("❌ ERROR: El carrusel no se encontró bien en el HTML");
        return;
    }

    let index = 0;

    function update() {
        console.log("Slide actual:", index);
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        update();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        update();
    });

});

/* ======================================================
   POWERPOINT INTERACTIVO
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".ppt-slide");
    const dots = document.querySelectorAll(".dot");
    const next = document.querySelector(".ppt-next");
    const prev = document.querySelector(".ppt-prev");

    let index = 0;

    function showSlide(i) {

        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[i].classList.add("active");
        dots[i].classList.add("active");
    }

    next.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        showSlide(index);
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    });

    // CLICK EN DOTS
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            showSlide(index);
        });
    });

});


