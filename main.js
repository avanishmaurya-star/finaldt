document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initModals();
    initTabs();
    initSearch();
    initSmoothScrolling();
    
    // Initialize the download app button
    const downloadAppBtn = document.getElementById('download-app-btn');
    if (downloadAppBtn) {
        // We've already set the href in the HTML, but adding this for any dynamic buttons
        downloadAppBtn.setAttribute('href', 'http://shreyaslohiafr.github.io/dt-app1/Indoor%202.0.apk');
    }
    
    // If we have products loaded, display them
    if (typeof products !== 'undefined' && Array.isArray(products)) {
        displayProducts(products);
    }
    
    // Update cart display initially if cart.js is loaded
    if (typeof updateCartDisplay === 'function') {
        updateCartDisplay();
    }
    
    // Make sure newly added products get cart event listeners
    if (typeof refreshCartEventListeners === 'function') {
        const observer = new MutationObserver(function(mutations) {
            refreshCartEventListeners();
        });
        
        const productContainer = document.getElementById('product-container');
        if (productContainer) {
            observer.observe(productContainer, { childList: true, subtree: true });
        }
    }
});

// Enable smooth scrolling for all anchor links
function initSmoothScrolling() {
    // Get all anchor links that point to an ID on the page
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll smoothly to the target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL but without jumping (optional)
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Navbar functionality
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const userActions = document.querySelector('.user-actions');
    
    hamburger.addEventListener('click', () => {
        // Toggle mobile menu
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            userActions.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            
            userActions.style.display = 'flex';
            userActions.style.flexDirection = 'column';
            userActions.style.position = 'absolute';
            userActions.style.top = navLinks.scrollHeight + 70 + 'px';
            userActions.style.left = '0';
            userActions.style.right = '0';
            userActions.style.backgroundColor = 'white';
            userActions.style.padding = '20px';
            userActions.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });

    // Close mobile menu when window is resized
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style = '';
            userActions.style = '';
        }
    });

    // Close navigation on link click
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Add scroll behavior
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Modal functionality
function initModals() {
    console.log("Initializing modals...");
    
    // Cart Modal
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    
    console.log("Cart button:", cartBtn);
    console.log("Cart modal:", cartModal);
    
    if (!cartBtn) {
        console.error("Cart button not found!");
    }
    
    if (!cartModal) {
        console.error("Cart modal not found!");
    }
    
    const cartCloseBtn = cartModal ? cartModal.querySelector('.close-btn') : null;
    
    if (cartBtn && cartModal) {
        cartBtn.addEventListener('click', (e) => {
            console.log("Cart button clicked");
            e.preventDefault();
            cartModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Force a refresh of the cart display
            if (typeof updateCartDisplay === 'function') {
                console.log("Updating cart display from cart button click");
                updateCartDisplay();
            } else {
                console.error("updateCartDisplay function not found!");
            }
        });
        
        if (cartCloseBtn) {
            cartCloseBtn.addEventListener('click', () => {
                console.log("Cart close button clicked");
                cartModal.style.display = 'none';
                document.body.style.overflow = '';
            });
        } else {
            console.error("Cart close button not found!");
        }
    }
    
    // Login Modal
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const loginCloseBtn = loginModal.querySelector('.close-btn');
    
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    loginCloseBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = '';
        }
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Tabs functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            // Show the corresponding tab content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchProducts(query);
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchProducts(query);
            }
        }
    });
}

// Search for products
function searchProducts(query) {
    // Scroll to products section
    document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
    
    // Show loading state
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Searching products...</div>';
    
    // Simulate API call with setTimeout (will be replaced with actual API call)
    setTimeout(() => {
        // Filter products that match the query
        const filteredProducts = products.filter(product => {
            return (
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );
        });
        
        if (filteredProducts.length > 0) {
            displayProducts(filteredProducts);
        } else {
            productContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No products found for "${query}"</h3>
                    <p>Try different keywords or browse our categories</p>
                </div>
            `;
        }
    }, 500);
}

// Display products in the grid
function displayProducts(productsToDisplay) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
    
    // Check if current user is admin
    const isAdmin = isAdminUser();
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // Determine stock status class and text
        let stockClass, stockText;
        if (product.stock > 10) {
            stockClass = 'in-stock';
            stockText = 'In Stock';
        } else if (product.stock > 0) {
            stockClass = 'low-stock';
            stockText = 'Low Stock';
        } else {
            stockClass = 'out-of-stock';
            stockText = 'Out of Stock';
        }
        
        // Create HTML for product card
        let productActionsHTML = '';
        
        // Only show "Add to Cart" button for admin users
        if (isAdmin) {
            productActionsHTML = `
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="view-details" data-id="${product.id}">
                        <i class="fas fa-eye"></i> Details
                    </button>
                </div>
            `;
        } else {
            productActionsHTML = `
                <div class="product-actions">
                    <button class="view-details" data-id="${product.id}">
                        <i class="fas fa-eye"></i> Details
                    </button>
                </div>
            `;
        }
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₹${product.price.toLocaleString()}</p>
                <div class="product-stock ${stockClass}">
                    <i class="fas ${product.stock > 0 ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                    <span>${stockText}</span> ${product.stock > 0 ? `(${product.stock} available)` : ''}
                </div>
                <p class="product-location">
                    <i class="fas fa-map-marker-alt"></i> ${product.location}
                </p>
                ${productActionsHTML}
            </div>
        `;
        
        productContainer.appendChild(productCard);
        
        // Add event listeners only if admin (for Add to Cart)
        if (isAdmin) {
            const addToCartBtn = productCard.querySelector('.add-to-cart');
            if (product.stock > 0) {
                addToCartBtn.addEventListener('click', () => {
                    // Call the addToCart function defined in cart.js
                    if (typeof addToCart === 'function') {
                        addToCart(product);
                    }
                });
            } else {
                addToCartBtn.style.opacity = '0.5';
                addToCartBtn.style.cursor = 'not-allowed';
                addToCartBtn.innerHTML = '<i class="fas fa-times"></i> Out of Stock';
                
                // Show alternative products
                addToCartBtn.addEventListener('click', () => {
                    showAlternatives(product);
                });
            }
        }
        
        // Add event listener to View Details button
        const viewDetailsBtn = productCard.querySelector('.view-details');
        viewDetailsBtn.addEventListener('click', () => {
            viewProductDetails(product);
        });
    });
    
    // Refresh cart event listeners if the function exists
    if (typeof refreshCartEventListeners === 'function') {
        refreshCartEventListeners();
    }
}

// Function to check if current user is admin
function isAdminUser() {
    // Get current user from localStorage
    const userJson = localStorage.getItem('mallnav_current_user');
    const currentUser = userJson ? JSON.parse(userJson) : null;
    
    // Check if user is admin using multiple criteria for compatibility
    return currentUser && (
        currentUser.role === 'admin' || 
        currentUser.username === 'Harsh Singh' || // This is the ADMIN_USERNAME from admin.js
        currentUser.isAdmin === true
    );
}

// Show alternatives for out-of-stock products
function showAlternatives(product) {
    // Only admin users should see alternatives with Add to Cart
    const isAdmin = isAdminUser();
    
    // Filter products in the same category
    const alternatives = products.filter(p => 
        p.category === product.category && 
        p.id !== product.id && 
        p.stock > 0
    );
    
    if (alternatives.length === 0) {
        alert('No alternative products available at the moment.');
        return;
    }
    
    // Create and show alternatives popup
    const alternativesPopup = document.createElement('div');
    alternativesPopup.classList.add('modal');
    alternativesPopup.style.display = 'flex';
    
    let alternativesHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Alternative Products</h2>
            <p>The product "${product.name}" is currently out of stock. Here are some alternatives you might like:</p>
            <div class="alternatives-grid">
    `;
    
    alternatives.slice(0, 3).forEach(alt => {
        // Only show Add to Cart button for admin users
        const cartButtonHTML = isAdmin ? `
            <div class="product-actions">
                <a href="#" class="add-to-cart" data-id="${alt.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </a>
            </div>
        ` : '';
        
        alternativesHTML += `
            <div class="alternative-item">
                <div class="alternative-image">
                    <img src="${alt.image}" alt="${alt.name}">
                </div>
                <div class="alternative-details">
                    <h3>${alt.name}</h3>
                    <p class="alternative-price">₹${alt.price.toLocaleString()}</p>
                    <p class="alternative-stock in-stock">
                        <i class="fas fa-check-circle"></i> In Stock (${alt.stock} available)
                    </p>
                    ${cartButtonHTML}
                </div>
            </div>
        `;
    });
    
    alternativesHTML += `
            </div>
        </div>
    `;
    
    alternativesPopup.innerHTML = alternativesHTML;
    document.body.appendChild(alternativesPopup);
    document.body.style.overflow = 'hidden';
    
    // Close button functionality
    const closeBtn = alternativesPopup.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(alternativesPopup);
        document.body.style.overflow = '';
    });
    
    // Close when clicking outside
    alternativesPopup.addEventListener('click', (e) => {
        if (e.target === alternativesPopup) {
            document.body.removeChild(alternativesPopup);
            document.body.style.overflow = '';
        }
    });
    
    // Add to cart buttons (only if admin)
    if (isAdmin) {
        const addToCartBtns = alternativesPopup.querySelectorAll('.add-to-cart');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const altId = btn.getAttribute('data-id');
                const altProduct = products.find(p => p.id === parseInt(altId));
                addToCart(altProduct);
                document.body.removeChild(alternativesPopup);
                document.body.style.overflow = '';
            });
        });
    }
}

// View product details
function viewProductDetails(product) {
    // Check if current user is admin
    const isAdmin = isAdminUser();
    
    // Create and show product details popup
    const detailsPopup = document.createElement('div');
    detailsPopup.classList.add('modal');
    detailsPopup.style.display = 'flex';
    
    // Determine stock status class and text
    let stockClass, stockText;
    if (product.stock > 10) {
        stockClass = 'in-stock';
        stockText = 'In Stock';
    } else if (product.stock > 0) {
        stockClass = 'low-stock';
        stockText = 'Low Stock';
    } else {
        stockClass = 'out-of-stock';
        stockText = 'Out of Stock';
    }
    
    // Only show Add to Cart button for admin users
    const cartActionHTML = isAdmin ? `
        <div class="product-details-actions">
            <button class="add-to-cart-btn" data-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    ` : '';
    
    detailsPopup.innerHTML = `
        <div class="modal-content product-details-modal">
            <span class="close-btn">&times;</span>
            <div class="product-details-content">
                <div class="product-details-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details-info">
                    <h2>${product.name}</h2>
                    <p class="product-details-price">₹${product.price.toLocaleString()}</p>
                    <div class="product-details-stock ${stockClass}">
                        <i class="fas ${product.stock > 0 ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                        <span>${stockText}</span> ${product.stock > 0 ? `(${product.stock} available)` : ''}
                    </div>
                    <p class="product-details-location">
                        <i class="fas fa-map-marker-alt"></i> ${product.location}
                    </p>
                    <div class="product-details-description">
                        <h3>Description</h3>
                        <p>${product.description}</p>
                    </div>
                    ${cartActionHTML}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(detailsPopup);
    document.body.style.overflow = 'hidden';
    
    // Close button functionality
    const closeBtn = detailsPopup.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(detailsPopup);
        document.body.style.overflow = '';
    });
    
    // Close when clicking outside
    detailsPopup.addEventListener('click', (e) => {
        if (e.target === detailsPopup) {
            document.body.removeChild(detailsPopup);
            document.body.style.overflow = '';
        }
    });
    
    // Add to cart button functionality (only if admin)
    if (isAdmin && product.stock > 0) {
        const addToCartBtn = detailsPopup.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                addToCart(product);
                document.body.removeChild(detailsPopup);
                document.body.style.overflow = '';
            });
        }
    } else if (isAdmin) {
        const addToCartBtn = detailsPopup.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.style.opacity = '0.5';
            addToCartBtn.style.cursor = 'not-allowed';
            addToCartBtn.innerHTML = '<i class="fas fa-times"></i> Out of Stock';
        }
    }
}