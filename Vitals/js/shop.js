function addToCart(productName, productPrice, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.name === productName);

    
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1) {
        return; // No hacer nada si la cantidad no es válida
    }

    if (existingProduct) {
        existingProduct.quantity += qty; // Sumar la cantidad
    } else {
        cart.push({ name: productName, price: productPrice, quantity: qty });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(cart);
}

function updateCartCount(cart) {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    
    if (totalItems > 0) {
        cartCount.style.display = 'inline'; // Mostrar el círculo
        cartCount.textContent = totalItems; // Actualizar la cantidad
    } else {
        cartCount.style.display = 'none'; // Ocultar el círculo si no hay productos
    }
}

// Llamar a la función para inicializar el contador en la carga de la página
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount(cart);
});


