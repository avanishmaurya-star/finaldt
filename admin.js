document.addEventListener('DOMContentLoaded', () => {
    initAdminLogin();
});

// Admin credentials
const ADMIN_USERNAME = "Harsh Singh";
const ADMIN_PASSWORD = "harshsingh0774tto";

// Initialize admin login functionality
function initAdminLogin() {
    const adminForm = document.getElementById('admin-form');
    
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        
        // Validate credentials
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Create admin user object and save to localStorage
            const adminUser = {
                username: username,
                email: 'admin@mallnav.com',
                role: 'admin',
                isAdmin: true,
                joinDate: new Date().toISOString()
            };
            
            // Save admin user to localStorage
            localStorage.setItem('mallnav_current_user', JSON.stringify(adminUser));
            
            // Trigger cart visibility update if cart.js is loaded
            if (typeof updateCartVisibility === 'function') {
                updateCartVisibility();
            }
            
            // Hide login modal
            document.getElementById('login-modal').style.display = 'none';
            document.body.style.overflow = '';
            
            // Update UI to show logged-in state
            updateLoggedInUI(adminUser);
            
            // Show admin dashboard
            showAdminDashboard();
        } else {
            // Show error message
            alert('Invalid admin credentials. Please try again.');
        }
    });
}

// Update UI for logged-in admin
function updateLoggedInUI(user) {
    // Update login button to show username
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.textContent = user.username;
        loginBtn.removeEventListener('click', showLoginModal);
        loginBtn.addEventListener('click', showProfileModal);
    }
    
    // Show an admin badge if possible
    const userActions = document.querySelector('.user-actions');
    if (userActions) {
        // Remove existing admin badge if any
        const existingBadge = userActions.querySelector('.admin-badge');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        // Add admin badge
        const adminBadge = document.createElement('span');
        adminBadge.classList.add('admin-badge');
        adminBadge.textContent = 'Admin';
        adminBadge.style.backgroundColor = '#ff6b6b';
        adminBadge.style.color = 'white';
        adminBadge.style.padding = '3px 8px';
        adminBadge.style.borderRadius = '10px';
        adminBadge.style.fontSize = '12px';
        adminBadge.style.marginLeft = '5px';
        loginBtn.appendChild(adminBadge);
    }
}

// Show admin dashboard
function showAdminDashboard() {
    // Create dashboard modal
    const dashboardModal = document.createElement('div');
    dashboardModal.classList.add('modal');
    dashboardModal.id = 'admin-dashboard-modal';
    
    dashboardModal.innerHTML = `
        <div class="modal-content admin-dashboard">
            <span class="close-btn">&times;</span>
            <h2>Admin Dashboard</h2>
            <div class="admin-actions" style="margin-bottom: 15px; text-align: right;">
                <button id="admin-view-cart" class="secondary-btn" style="margin-right: 10px;">
                    <i class="fas fa-shopping-cart"></i> View Cart
                </button>
                <button id="admin-logout" class="danger-btn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
            <div class="admin-tabs">
                <button class="admin-tab-btn active" data-tab="inventory">Inventory Management</button>
                <button class="admin-tab-btn" data-tab="analytics">Analytics</button>
                <button class="admin-tab-btn" data-tab="settings">Settings</button>
            </div>
            
            <div class="admin-tab-content active" id="inventory-tab">
                <div class="inventory-header">
                    <h3>Product Inventory</h3>
                    <div class="inventory-actions">
                        <input type="text" id="inventory-search" placeholder="Search products...">
                        <button id="add-product-btn">Add New Product</button>
                    </div>
                </div>
                <div class="inventory-table-container">
                    <table class="inventory-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price (₹)</th>
                                <th>Stock</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="inventory-table-body">
                            <!-- Table rows will be inserted dynamically -->
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="admin-tab-content" id="analytics-tab">
                <h3>Analytics Dashboard</h3>
                <div class="analytics-cards">
                    <div class="analytics-card">
                        <h4>Total Sales</h4>
                        <p class="analytics-value">₹248,500</p>
                        <p class="analytics-change positive">+15% from last month</p>
                    </div>
                    <div class="analytics-card">
                        <h4>Total Visitors</h4>
                        <p class="analytics-value">12,845</p>
                        <p class="analytics-change positive">+8% from last month</p>
                    </div>
                    <div class="analytics-card">
                        <h4>Conversion Rate</h4>
                        <p class="analytics-value">3.2%</p>
                        <p class="analytics-change negative">-0.5% from last month</p>
                    </div>
                    <div class="analytics-card">
                        <h4>Low Stock Items</h4>
                        <p class="analytics-value">8</p>
                        <p class="analytics-change neutral">Same as last month</p>
                    </div>
                </div>
                <div class="analytics-charts">
                    <div class="chart-container">
                        <h4>Sales by Category</h4>
                        <div class="placeholder-chart">Chart visualization would appear here</div>
                    </div>
                    <div class="chart-container">
                        <h4>Most Searched Products</h4>
                        <div class="placeholder-chart">Chart visualization would appear here</div>
                    </div>
                </div>
            </div>
            
            <div class="admin-tab-content" id="settings-tab">
                <h3>System Settings</h3>
                <div class="settings-form">
                    <div class="settings-section">
                        <h4>General Settings</h4>
                        <div class="form-group">
                            <label for="store-name">Store Name</label>
                            <input type="text" id="store-name" value="MallNav Demo Store">
                        </div>
                        <div class="form-group">
                            <label for="contact-email">Contact Email</label>
                            <input type="email" id="contact-email" value="info@mallnav.com">
                        </div>
                        <div class="form-group">
                            <label for="store-phone">Phone Number</label>
                            <input type="text" id="store-phone" value="+91 1234567890">
                        </div>
                    </div>
                    <div class="settings-section">
                        <h4>Notification Settings</h4>
                        <div class="form-group checkbox">
                            <input type="checkbox" id="notify-low-stock" checked>
                            <label for="notify-low-stock">Notify when product stock is low</label>
                        </div>
                        <div class="form-group checkbox">
                            <input type="checkbox" id="notify-orders" checked>
                            <label for="notify-orders">Notify on new orders</label>
                        </div>
                        <div class="form-group checkbox">
                            <input type="checkbox" id="notify-reviews">
                            <label for="notify-reviews">Notify on new customer reviews</label>
                        </div>
                    </div>
                    <button class="save-settings-btn">Save Settings</button>
                </div>
            </div>
        </div>
    `;
    
    // Add the dashboard to the body
    document.body.appendChild(dashboardModal);
    dashboardModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add styles for the admin dashboard
    addAdminStyles();
    
    // Initialize dashboard functionality
    initDashboard();
    
    // Add event listener to close button
    const closeBtn = dashboardModal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(dashboardModal);
        document.body.style.overflow = '';
    });
    
    // Close when clicking outside the content
    dashboardModal.addEventListener('click', (e) => {
        if (e.target === dashboardModal) {
            document.body.removeChild(dashboardModal);
            document.body.style.overflow = '';
        }
    });
    
    // Add event listener for view cart button
    const viewCartBtn = dashboardModal.querySelector('#admin-view-cart');
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', () => {
            // Close admin dashboard
            document.body.removeChild(dashboardModal);
            document.body.style.overflow = '';
            
            // Open cart modal
            const cartModal = document.getElementById('cart-modal');
            if (cartModal) {
                cartModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Refresh cart display if function exists
                if (typeof updateCartDisplay === 'function') {
                    updateCartDisplay();
                }
            }
        });
    }
    
    // Add event listener for logout button
    const logoutBtn = dashboardModal.querySelector('#admin-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear user data
            localStorage.removeItem('mallnav_current_user');
            
            // Close admin dashboard
            document.body.removeChild(dashboardModal);
            document.body.style.overflow = '';
            
            // Reset UI
            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) {
                loginBtn.textContent = 'Login';
                // Remove admin badge if exists
                const adminBadge = loginBtn.querySelector('.admin-badge');
                if (adminBadge) {
                    adminBadge.remove();
                }
            }
            
            // Hide cart elements
            if (typeof updateCartVisibility === 'function') {
                updateCartVisibility();
            }
        });
    }
}

// Initialize dashboard functionality
function initDashboard() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.admin-tab-btn');
    const tabContents = document.querySelectorAll('.admin-tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Populate inventory table
    populateInventoryTable();
    
    // Add event listener to inventory search
    const inventorySearch = document.getElementById('inventory-search');
    inventorySearch.addEventListener('input', () => {
        const searchTerm = inventorySearch.value.toLowerCase();
        filterInventoryTable(searchTerm);
    });
    
    // Add event listener to "Add New Product" button
    const addProductBtn = document.getElementById('add-product-btn');
    addProductBtn.addEventListener('click', showAddProductForm);
    
    // Add event listener to save settings button
    const saveSettingsBtn = document.querySelector('.save-settings-btn');
    saveSettingsBtn.addEventListener('click', () => {
        showToast('Settings saved successfully!');
    });
}

// Populate the inventory table with products
function populateInventoryTable() {
    const tableBody = document.getElementById('inventory-table-body');
    tableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', product.id);
        
        // Determine stock status class
        let stockClass = '';
        if (product.stock > 10) {
            stockClass = 'in-stock';
        } else if (product.stock > 0) {
            stockClass = 'low-stock';
        } else {
            stockClass = 'out-of-stock';
        }
        
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" class="inventory-product-img"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹${product.price.toLocaleString()}</td>
            <td class="${stockClass}">${product.stock}</td>
            <td>${product.location}</td>
            <td class="action-buttons">
                <button class="edit-btn"><i class="fas fa-edit"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
        
        // Add event listeners to action buttons
        const editBtn = row.querySelector('.edit-btn');
        const deleteBtn = row.querySelector('.delete-btn');
        
        editBtn.addEventListener('click', () => {
            editProduct(product);
        });
        
        deleteBtn.addEventListener('click', () => {
            deleteProduct(product.id);
        });
    });
}

// Filter the inventory table based on search term
function filterInventoryTable(searchTerm) {
    const rows = document.querySelectorAll('#inventory-table-body tr');
    
    rows.forEach(row => {
        const productName = row.children[2].textContent.toLowerCase();
        const category = row.children[3].textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || category.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Show form to add a new product
function showAddProductForm() {
    // Create form modal
    const formModal = document.createElement('div');
    formModal.classList.add('modal');
    formModal.style.display = 'flex';
    
    // Generate next product ID
    const nextId = Math.max(...products.map(p => p.id)) + 1;
    
    formModal.innerHTML = `
        <div class="modal-content product-form">
            <span class="close-btn">&times;</span>
            <h2>Add New Product</h2>
            <form id="product-form">
                <div class="form-group">
                    <label for="product-id">Product ID</label>
                    <input type="number" id="product-id" value="${nextId}" readonly>
                </div>
                <div class="form-group">
                    <label for="product-name">Product Name</label>
                    <input type="text" id="product-name" required>
                </div>
                <div class="form-group">
                    <label for="product-category">Category</label>
                    <select id="product-category" required>
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="home">Home & Kitchen</option>
                        <option value="fashion">Fashion</option>
                        <option value="beauty">Beauty</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="product-price">Price (₹)</label>
                    <input type="number" id="product-price" min="0" required>
                </div>
                <div class="form-group">
                    <label for="product-stock">Stock</label>
                    <input type="number" id="product-stock" min="0" required>
                </div>
                <div class="form-group">
                    <label for="product-location">Location</label>
                    <input type="text" id="product-location" required>
                </div>
                <div class="form-group">
                    <label for="product-image">Image URL</label>
                    <input type="text" id="product-image" value="images/placeholder.jpg">
                </div>
                <div class="form-group">
                    <label for="product-description">Description</label>
                    <textarea id="product-description" rows="4" required></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-product">Cancel</button>
                    <button type="submit">Add Product</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(formModal);
    
    // Add event listener to close button
    const closeBtn = formModal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(formModal);
    });
    
    // Add event listener to cancel button
    const cancelBtn = formModal.querySelector('#cancel-product');
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(formModal);
    });
    
    // Close when clicking outside
    formModal.addEventListener('click', (e) => {
        if (e.target === formModal) {
            document.body.removeChild(formModal);
        }
    });
    
    // Add event listener to form submission
    const productForm = formModal.querySelector('#product-form');
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newProduct = {
            id: parseInt(document.getElementById('product-id').value),
            name: document.getElementById('product-name').value,
            category: document.getElementById('product-category').value,
            price: parseInt(document.getElementById('product-price').value),
            stock: parseInt(document.getElementById('product-stock').value),
            location: document.getElementById('product-location').value,
            image: document.getElementById('product-image').value,
            description: document.getElementById('product-description').value
        };
        
        // Add the new product to the array
        products.push(newProduct);
        
        // Update the inventory table
        populateInventoryTable();
        
        // Close the form
        document.body.removeChild(formModal);
        
        // Show confirmation
        showToast('Product added successfully!');
    });
}

// Edit an existing product
function editProduct(product) {
    // Create form modal
    const formModal = document.createElement('div');
    formModal.classList.add('modal');
    formModal.style.display = 'flex';
    
    formModal.innerHTML = `
        <div class="modal-content product-form">
            <span class="close-btn">&times;</span>
            <h2>Edit Product</h2>
            <form id="product-form">
                <div class="form-group">
                    <label for="product-id">Product ID</label>
                    <input type="number" id="product-id" value="${product.id}" readonly>
                </div>
                <div class="form-group">
                    <label for="product-name">Product Name</label>
                    <input type="text" id="product-name" value="${product.name}" required>
                </div>
                <div class="form-group">
                    <label for="product-category">Category</label>
                    <select id="product-category" required>
                        <option value="">Select Category</option>
                        <option value="electronics" ${product.category === 'electronics' ? 'selected' : ''}>Electronics</option>
                        <option value="clothing" ${product.category === 'clothing' ? 'selected' : ''}>Clothing</option>
                        <option value="home" ${product.category === 'home' ? 'selected' : ''}>Home & Kitchen</option>
                        <option value="fashion" ${product.category === 'fashion' ? 'selected' : ''}>Fashion</option>
                        <option value="beauty" ${product.category === 'beauty' ? 'selected' : ''}>Beauty</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="product-price">Price (₹)</label>
                    <input type="number" id="product-price" min="0" value="${product.price}" required>
                </div>
                <div class="form-group">
                    <label for="product-stock">Stock</label>
                    <input type="number" id="product-stock" min="0" value="${product.stock}" required>
                </div>
                <div class="form-group">
                    <label for="product-location">Location</label>
                    <input type="text" id="product-location" value="${product.location}" required>
                </div>
                <div class="form-group">
                    <label for="product-image">Image URL</label>
                    <input type="text" id="product-image" value="${product.image}">
                </div>
                <div class="form-group">
                    <label for="product-description">Description</label>
                    <textarea id="product-description" rows="4" required>${product.description}</textarea>
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-product">Cancel</button>
                    <button type="submit">Update Product</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(formModal);
    
    // Add event listener to close button
    const closeBtn = formModal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(formModal);
    });
    
    // Add event listener to cancel button
    const cancelBtn = formModal.querySelector('#cancel-product');
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(formModal);
    });
    
    // Close when clicking outside
    formModal.addEventListener('click', (e) => {
        if (e.target === formModal) {
            document.body.removeChild(formModal);
        }
    });
    
    // Add event listener to form submission
    const productForm = formModal.querySelector('#product-form');
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const oldStock = product.stock;
        
        // Update the product properties
        product.name = document.getElementById('product-name').value;
        product.category = document.getElementById('product-category').value;
        product.price = parseInt(document.getElementById('product-price').value);
        product.stock = parseInt(document.getElementById('product-stock').value);
        product.location = document.getElementById('product-location').value;
        product.image = document.getElementById('product-image').value;
        product.description = document.getElementById('product-description').value;
        
        // Update any visible product displays
        updateProductDisplay(product);
        
        // Update the inventory table
        populateInventoryTable();
        
        // Close the form
        document.body.removeChild(formModal);
        
        // Show confirmation
        showToast('Product updated successfully!');
    });
}

// Delete a product
function deleteProduct(productId) {
    // Ask for confirmation
    if (confirm('Are you sure you want to delete this product?')) {
        // Find the product index
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex !== -1) {
            // Remove from the array
            products.splice(productIndex, 1);
            
            // Update the inventory table
            populateInventoryTable();
            
            // Show confirmation
            showToast('Product deleted successfully!');
        }
    }
}

// Add CSS styles for the admin dashboard
function addAdminStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .admin-dashboard {
            max-width: 1200px;
            width: 95%;
            max-height: 90vh;
        }
        
        .admin-tabs {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .admin-tab-btn {
            padding: 10px 20px;
            background-color: transparent;
            color: var(--light-text);
            border: none;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            font-weight: 500;
            transition: var(--transition);
        }
        
        .admin-tab-btn.active {
            color: var(--primary-color);
            border-bottom-color: var(--primary-color);
        }
        
        .admin-tab-content {
            display: none;
        }
        
        .admin-tab-content.active {
            display: block;
        }
        
        /* Inventory Tab */
        .inventory-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .inventory-actions {
            display: flex;
            gap: 10px;
        }
        
        #inventory-search {
            padding: 8px 12px;
            width: 250px;
        }
        
        #add-product-btn {
            background-color: var(--secondary-color);
            color: white;
            padding: 8px 15px;
            border-radius: 5px;
            font-weight: 500;
        }
        
        #add-product-btn:hover {
            background-color: #0da271;
        }
        
        .inventory-table-container {
            overflow-x: auto;
        }
        
        .inventory-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .inventory-table th,
        .inventory-table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }
        
        .inventory-table thead {
            background-color: var(--light-bg);
        }
        
        .inventory-table th {
            font-weight: 600;
        }
        
        .inventory-product-img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 5px;
        }
        
        .in-stock {
            color: var(--secondary-color);
        }
        
        .low-stock {
            color: var(--accent-color);
        }
        
        .out-of-stock {
            color: #ef4444;
        }
        
        .action-buttons {
            display: flex;
            gap: 10px;
        }
        
        .edit-btn, .delete-btn {
            padding: 6px 10px;
            border-radius: 3px;
            cursor: pointer;
        }
        
        .edit-btn {
            background-color: var(--primary-color);
            color: white;
        }
        
        .delete-btn {
            background-color: #ef4444;
            color: white;
        }
        
        /* Analytics Tab */
        .analytics-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .analytics-card {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: var(--card-shadow);
            border: 1px solid var(--border-color);
        }
        
        .analytics-card h4 {
            margin-bottom: 10px;
            color: var(--light-text);
        }
        
        .analytics-value {
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .analytics-change {
            font-size: 0.9rem;
        }
        
        .positive {
            color: var(--secondary-color);
        }
        
        .negative {
            color: #ef4444;
        }
        
        .neutral {
            color: var(--light-text);
        }
        
        .analytics-charts {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
        }
        
        .chart-container {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: var(--card-shadow);
            border: 1px solid var(--border-color);
        }
        
        .chart-container h4 {
            margin-bottom: 15px;
        }
        
        .placeholder-chart {
            height: 300px;
            background-color: var(--light-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--light-text);
            border-radius: 5px;
        }
        
        /* Settings Tab */
        .settings-form {
            max-width: 600px;
        }
        
        .settings-section {
            margin-bottom: 30px;
        }
        
        .settings-section h4 {
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .form-group.checkbox {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .form-group.checkbox label {
            margin-bottom: 0;
        }
        
        .form-group.checkbox input {
            width: auto;
        }
        
        .save-settings-btn {
            background-color: var(--primary-color);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: 500;
            margin-top: 20px;
        }
        
        .save-settings-btn:hover {
            background-color: var(--primary-dark);
        }
        
        /* Product Form */
        .product-form {
            max-width: 800px;
        }
        
        #product-form .form-group {
            margin-bottom: 15px;
        }
        
        #product-form label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }
        
        #product-form input,
        #product-form select,
        #product-form textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 5px;
        }
        
        #product-form textarea {
            resize: vertical;
        }
        
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 20px;
        }
        
        .form-actions button {
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: 500;
        }
        
        .form-actions button[type="button"] {
            background-color: var(--light-bg);
            color: var(--text-color);
        }
        
        .form-actions button[type="submit"] {
            background-color: var(--primary-color);
            color: white;
        }
        
        .form-actions button[type="submit"]:hover {
            background-color: var(--primary-dark);
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
            .admin-tabs {
                flex-direction: column;
                border-bottom: none;
            }
            
            .admin-tab-btn {
                border: 1px solid var(--border-color);
                border-radius: 5px;
                margin-bottom: 5px;
            }
            
            .admin-tab-btn.active {
                border-color: var(--primary-color);
            }
            
            .inventory-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
            
            .inventory-actions {
                width: 100%;
            }
            
            #inventory-search {
                flex: 1;
            }
            
            .analytics-charts {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Functions for showing modals
function showLoginModal(e) {
    if (e) e.preventDefault();
    const loginModal = document.getElementById('login-modal');
    if (loginModal) {
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function showProfileModal(e) {
    if (e) e.preventDefault();
    const profileModal = document.getElementById('profile-modal');
    if (profileModal) {
        // Get current user data
        const userJson = localStorage.getItem('mallnav_current_user');
        const user = userJson ? JSON.parse(userJson) : null;
        
        if (user) {
            // Fill in profile data
            const usernameField = document.getElementById('profile-username');
            const emailField = document.getElementById('profile-email');
            const memberSinceField = document.getElementById('profile-member-since');
            const avatarLetter = document.getElementById('profile-avatar-letter');
            
            if (usernameField) usernameField.textContent = user.username;
            if (emailField) emailField.textContent = user.email || 'email@example.com';
            if (memberSinceField) {
                const joinDate = user.joinDate ? new Date(user.joinDate) : new Date();
                memberSinceField.textContent = `Member since: ${joinDate.toLocaleDateString()}`;
            }
            if (avatarLetter && user.username) {
                avatarLetter.textContent = user.username.charAt(0).toUpperCase();
            }
            
            // Show profile modal
            profileModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        } else {
            // Fallback to login if no user data
            showLoginModal();
        }
    }
} 