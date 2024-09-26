let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
        <td>${item.name}</td>
        <td>
            <input type="number" value="${item.quantity}" min="1" class="quantity-input" onchange="updateQuantity(${index}, this.value)">
        </td>
        <td>$${item.price * item.quantity}</td>
        <td>
            <button class="btn btn-danger" onclick="removeFromCart(${index})">Eliminar</button>
        </td>
        `;
        
        cartItems.appendChild(row);
        total += item.price * item.quantity;
    });

    document.getElementById('total-price').innerText = `Total: $${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart(); // Actualiza la vista del carrito
    updateCartCount(cart); // Actualiza el contador del carrito
}

function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart(); // Actualiza la vista del carrito
    updateCartCount(cart); // Actualiza el contador del carrito
}

function clearCart() {
    cart = []; // Vacía el carrito
    localStorage.setItem('cart', JSON.stringify(cart)); // Actualiza el almacenamiento local
    updateCart(); // Actualiza la vista del carrito
    updateCartCount(cart); // Actualiza el contador del carrito
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
    updateCart(); // Asegúrate de que se actualice la vista del carrito
    updateCartCount(cart); // Inicializa el contador
});

