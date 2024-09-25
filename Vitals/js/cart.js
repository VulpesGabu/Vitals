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
    updateCart();
}

function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Inicializa el carrito al cargar la página
document.addEventListener('DOMContentLoaded', updateCart);

