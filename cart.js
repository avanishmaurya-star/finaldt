// Initialize cart
let cart = [];

// Get the current logged-in user
function getCurrentUser() {
    const userJson = localStorage.getItem('mallnav_current_user');
    return userJson ? JSON.parse(userJson) : null;
}

// Check if current user is an admin
function isAdminUser() {
    // Get current user
    const currentUser = getCurrentUser();
    
    // We need to check if the user has admin privileges
    // The original check was using ADMIN_USERNAME which might not be accessible here
    // Instead, let's check if the user has a role property set to 'admin'
    // or if the username matches any of the known admin usernames
    return currentUser && (
        currentUser.role === 'admin' || 
        currentUser.username === 'Harsh Singh' || // This is the ADMIN_USERNAME from admin.js
        currentUser.isAdmin === true // Check additional property
    );
}

// Load cart from localStorage when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    
    // Add event listeners to any initial "Add to Cart" buttons
    attachCartEventListeners();
    
    // Initialize cart count
    updateCartCount();
    
    // Initialize cart display
    updateCartDisplay();
    
    // Add event listener to checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
    
    // Show/hide cart elements based on user role
    updateCartVisibility();
});

// Show or hide cart elements based on user role
function updateCartVisibility() {
    const isAdmin = isAdminUser();
    console.log("Is admin user:", isAdmin);
    
    // Show cart for admin users, hide for non-admin
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.style.display = isAdmin ? 'inline-flex' : 'none';
    }
    
    // Show/hide other cart-related elements
    const cartElements = document.querySelectorAll('.cart-related:not(#cart-btn)');
    cartElements.forEach(element => {
        element.style.display = isAdmin ? 'block' : 'none';
    });
}

// Hide cart elements for non-admin users (replaced by updateCartVisibility)
function hideCartElements() {
    updateCartVisibility();
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('mallnav_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('mallnav_cart', JSON.stringify(cart));
}

// Find product by ID
function findProductById(productId) {
    // Check if products is defined and available
    if (typeof products !== 'undefined' && Array.isArray(products)) {
        return products.find(p => p.id === productId);
    } else {
        console.error('Products array is not available');
        return null;
    }
}

// Add to cart function
function addToCart(product) {
    // Check if user is admin first
    if (!isAdminUser()) {
        showToast('Only administrators can add items to cart');
        return;
    }
    
    console.log("Adding product to cart:", product);
    
    // Check if product is in stock
    if (product.stock <= 0) {
        showToast('This product is out of stock');
        return;
    }
    
    // Check if adding more would exceed available stock
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
        // Check if we have enough stock to add one more
        if (existingItem.quantity >= product.stock) {
            showToast(`Sorry, only ${product.stock} items in stock`);
            return;
        }
        
        // Increment quantity if already in cart
        existingItem.quantity++;
        console.log("Updated quantity for existing item:", existingItem);
    } else {
        // Add new item to cart
        cart.push({
            product: product,
            quantity: 1
        });
        console.log("Added new item to cart, current cart:", cart);
    }
    
    // Save cart to localStorage
    saveCartToStorage();
    
    // Update cart count display
    updateCartCount();
    
    // Update cart items display
    updateCartDisplay();
    
    // Show confirmation message
    showToast(`${product.name} added to cart!`);
}

// Update cart count in the navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    
    console.log("Updating cart display. Current cart:", cart);
    
    // Clear current cart display
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
            if (cartTotalAmount) {
                cartTotalAmount.textContent = '₹0.00';
            }
            return;
        }
        
        // Calculate total
        let total = 0;
        
        // Add each item to the cart display
        cart.forEach(item => {
            console.log("Adding item to display:", item);
            const itemTotal = item.product.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.product.image}" alt="${item.product.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.product.name}</h3>
                    <p class="cart-item-price">₹${item.product.price.toLocaleString()}</p>
                    <div class="cart-item-actions">
                        <button class="quantity-btn decrease-btn" data-id="${item.product.id}">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn increase-btn" data-id="${item.product.id}">+</button>
                        <span class="remove-item" data-id="${item.product.id}">
                            <i class="fas fa-trash"></i>
                        </span>
                    </div>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
            
            // Add event listeners for quantity buttons and remove button
            const decreaseBtn = cartItem.querySelector('.decrease-btn');
            const increaseBtn = cartItem.querySelector('.increase-btn');
            const removeBtn = cartItem.querySelector('.remove-item');
            
            decreaseBtn.addEventListener('click', () => {
                decreaseQuantity(item.product.id);
            });
            
            increaseBtn.addEventListener('click', () => {
                increaseQuantity(item.product.id);
            });
            
            removeBtn.addEventListener('click', () => {
                removeFromCart(item.product.id);
            });
        });
        
        // Update total amount
        if (cartTotalAmount) {
            cartTotalAmount.textContent = `₹${total.toLocaleString()}`;
            console.log("Updated cart total:", total);
        }
    } else {
        console.error("Cart items container not found!");
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    // Check if user is admin
    if (!isAdminUser()) {
        showToast('Only administrators can modify cart');
        return;
    }
    
    const cartItem = cart.find(item => item.product.id === productId);
    
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            // Remove the item if quantity becomes 0
            removeFromCart(productId);
            return;
        }
        
        // Save cart to localStorage
        saveCartToStorage();
        
        // Update cart display
        updateCartCount();
        updateCartDisplay();
    }
}

// Increase quantity
function increaseQuantity(productId) {
    // Check if user is admin
    if (!isAdminUser()) {
        showToast('Only administrators can modify cart');
        return;
    }
    
    const cartItem = cart.find(item => item.product.id === productId);
    
    if (cartItem) {
        // Check if we're exceeding available stock
        if (cartItem.quantity < cartItem.product.stock) {
            cartItem.quantity++;
            
            // Save cart to localStorage
            saveCartToStorage();
            
            // Update cart display
            updateCartCount();
            updateCartDisplay();
        } else {
            showToast(`Sorry, only ${cartItem.product.stock} items in stock.`);
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    // Check if user is admin
    if (!isAdminUser()) {
        showToast('Only administrators can modify cart');
        return;
    }
    
    const itemIndex = cart.findIndex(item => item.product.id === productId);
    
    if (itemIndex !== -1) {
        // Remove item from cart array
        cart.splice(itemIndex, 1);
        
        // Save cart to localStorage
        saveCartToStorage();
        
        // Update cart display
        updateCartCount();
        updateCartDisplay();
    }
}

// Display toast notification
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast-notification');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        document.body.appendChild(toast);
        
        // Style the toast
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = 'var(--primary-color)';
        toast.style.color = 'white';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '1000';
        toast.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        toast.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    }
    
    // Set message
    toast.textContent = message;
    
    // Show toast
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
    }, 3000);
}

// Update attachCartEventListeners to properly add products
function attachCartEventListeners() {
    console.log('Attaching cart event listeners');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    console.log('Found ' + addToCartButtons.length + ' add to cart buttons');
    
    addToCartButtons.forEach(button => {
        // Skip if already has event listener
        if (button.getAttribute('data-listener') === 'true') {
            return;
        }
        
        button.setAttribute('data-listener', 'true');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const productId = parseInt(button.getAttribute('data-id'));
            console.log('Add to cart clicked for product ID:', productId);
            
            // Find the product by ID
            const product = findProductById(productId);
            
            if (product && product.stock > 0) {
                console.log('Adding product to cart:', product);
                addToCart(product);
            } else {
                console.error('Product not found or out of stock:', productId);
                showToast('Sorry, this product is unavailable.');
            }
        });
    });
}

// Function to handle new product elements added to the DOM (for search results)
function refreshCartEventListeners() {
    attachCartEventListeners();
}

// Function to proceed to checkout
function proceedToCheckout() {
    // Check if user is admin
    if (!isAdminUser()) {
        showToast('Only administrators can check out');
        return;
    }
    
    // Check if cart is empty
    if (cart.length === 0) {
        showToast('Your cart is empty');
        return;
    }
    
    // Proceed with checkout
    showOrderConfirmation();
}

// Function to show order confirmation
function showOrderConfirmation() {
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.querySelector('.cart-total');
    
    if (cartModal && cartItems && cartTotal) {
        // Check if user is logged in
        const currentUser = getCurrentUser();
        if (!currentUser) {
            // Redirect to login if not logged in
            cartModal.style.display = 'none';
            document.body.style.overflow = '';
            
            if (typeof showToast === 'function') {
                showToast('Please log in to place an order');
            }
            
            // Show login modal
            const loginModal = document.getElementById('login-modal');
            if (loginModal) {
                loginModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
            
            return;
        }
        
        // Hide current cart content
        cartItems.style.display = 'none';
        cartTotal.style.display = 'none';
        
        // Generate order ID
        const orderId = `ORD-${Math.floor(Math.random() * 10000) + 10000}`;
        
        // Calculate total
        const total = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        
        // Create order object
        const order = {
            id: orderId,
            date: new Date().toISOString(),
            status: 'pending',
            products: cart.map(item => ({
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
                image: item.product.image || 'https://via.placeholder.com/70x70'
            })),
            total: total
        };
        
        // Get user-specific orders key
        const userEmail = currentUser.email;
        const ordersKey = `mallnav_orders_${userEmail}`;
        
        // Save order to localStorage
        const existingOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
        existingOrders.unshift(order); // Add new order at the beginning
        localStorage.setItem(ordersKey, JSON.stringify(existingOrders));
        
        // Update product stock in localStorage
        updateProductStock();
        
        // Refresh orders list if orders modal is open
        const ordersModal = document.getElementById('orders-modal');
        if (ordersModal && ordersModal.style.display === 'flex') {
            // Get active tab status
            const activeTab = ordersModal.querySelector('.order-tab.active');
            const status = activeTab ? activeTab.getAttribute('data-status') : 'all';
            
            // Refresh orders list
            if (typeof filterOrders === 'function') {
                filterOrders(status);
            }
        }
        
        // Create confirmation content
        const confirmationContent = document.createElement('div');
        confirmationContent.classList.add('order-confirmation');
        confirmationContent.innerHTML = `
            <div class="confirmation-header">
                <i class="fas fa-check-circle"></i>
                <h2>Order Confirmed!</h2>
                <p>Your order has been placed successfully.</p>
            </div>
            <div class="order-details">
                <p>Order #${orderId}</p>
                <p>Date: ${new Date().toLocaleDateString()}</p>
                <p>Items: ${cart.reduce((total, item) => total + item.quantity, 0)}</p>
                <p>Total: ₹${total.toLocaleString()}</p>
            </div>
            <button class="primary-btn continue-shopping">Continue Shopping</button>
        `;
        
        // Add to modal
        cartModal.querySelector('.modal-content').appendChild(confirmationContent);
        
        // Add event listener to continue shopping button
        const continueBtn = confirmationContent.querySelector('.continue-shopping');
        continueBtn.addEventListener('click', () => {
            // Close modal
            cartModal.style.display = 'none';
            document.body.style.overflow = '';
            
            // Clear cart
            cart = [];
            saveCartToStorage();
            updateCartCount();
            
            // Reset cart display for next time
            setTimeout(() => {
                confirmationContent.remove();
                cartItems.style.display = '';
                cartTotal.style.display = '';
                updateCartDisplay();
            }, 500);
        });
    }
}

// Function to update product stock after purchase
function updateProductStock() {
    // Check if products array is available in memory
    if (typeof products !== 'undefined' && Array.isArray(products)) {
        // Update stock for each product in cart
        cart.forEach(item => {
            const productId = item.product.id;
            const quantity = item.quantity;
            
            // Find product in the products array
            const product = products.find(p => p.id === productId);
            
            if (product) {
                // Reduce stock
                product.stock -= quantity;
                
                // Ensure stock doesn't go below zero
                if (product.stock < 0) {
                    product.stock = 0;
                }
                
                console.log(`Updated stock for ${product.name}. New stock: ${product.stock}`);
            }
        });
        
        // Save updated products to localStorage for persistence
        localStorage.setItem('mallnav_products', JSON.stringify(products));
        
        // Dispatch event to notify about stock update
        window.dispatchEvent(new CustomEvent('stockUpdated'));
        
        // If there's any displayed products on page, refresh them
        if (typeof displayProducts === 'function') {
            displayProducts(products);
        }
    } else {
        console.error('Products array not available for stock update');
    }
} 