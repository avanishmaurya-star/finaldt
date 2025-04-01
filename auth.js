// User Authentication System
document.addEventListener('DOMContentLoaded', () => {
    // Initialize auth system
    initAuth();
    
    // Initialize profile and orders modals
    initProfileModal();
    initOrdersModal();
});

// Initialize authentication functions
function initAuth() {
    // Setup event listeners for login and register forms
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const adminForm = document.getElementById('admin-form');
    
    // Switch between login and register tabs
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchToTab('register');
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchToTab('login');
        });
    }
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            
            loginUser(email, password);
        });
    }
    
    // Handle register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('register-username').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm').value;
            
            registerUser(username, email, password, confirmPassword);
        });
    }
    
    // Handle admin form submission
    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('admin-username').value.trim();
            const password = document.getElementById('admin-password').value;
            
            loginAdmin(username, password);
        });
    }
    
    // Check if user is already logged in
    checkLoginStatus();
}

// Initialize profile modal
function initProfileModal() {
    // Get profile modal elements
    const profileModal = document.getElementById('profile-modal');
    const closeBtn = profileModal.querySelector('.close-btn');
    const logoutBtn = document.getElementById('logout-profile-btn');
    const profileForm = document.getElementById('profile-form');
    
    // Close button functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            profileModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // Logout button functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logoutUser();
            profileModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // Profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('profile-fullname').value.trim();
            const phone = document.getElementById('profile-phone').value.trim();
            const address = document.getElementById('profile-address').value.trim();
            
            // Get current user
            const currentUser = getCurrentUser();
            
            if (currentUser) {
                // Update profile data
                const users = getUsers();
                const userIndex = users.findIndex(user => user.email === currentUser.email);
                
                if (userIndex !== -1) {
                    // Update user data
                    users[userIndex].fullName = fullName;
                    users[userIndex].phone = phone;
                    users[userIndex].address = address;
                    
                    // Save updated users
                    localStorage.setItem('mallnav_users', JSON.stringify(users));
                    
                    // Update session
                    currentUser.fullName = fullName;
                    localStorage.setItem('mallnav_current_user', JSON.stringify(currentUser));
                    
                    // Show success message using toast
                    if (typeof showToast === 'function') {
                        showToast('Profile updated successfully');
                    }
                }
            }
        });
    }
    
    // Change password button functionality
    const changePasswordBtn = document.getElementById('change-password-btn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            alert('This feature is not implemented yet');
        });
    }
}

// Initialize orders modal
function initOrdersModal() {
    // Get orders modal elements
    const ordersModal = document.getElementById('orders-modal');
    const closeBtn = ordersModal.querySelector('.close-btn');
    const orderTabs = ordersModal.querySelectorAll('.order-tab');
    
    // Close button functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            ordersModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // Order tabs functionality
    if (orderTabs.length > 0) {
        orderTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                orderTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Filter orders by status
                const status = tab.getAttribute('data-status');
                filterOrders(status);
            });
        });
    }
    
    // Generate sample orders if none exist
    generateSampleOrders();
}

// Filter orders by status
function filterOrders(status) {
    const ordersList = document.getElementById('orders-list');
    const orders = getSampleOrders();
    
    // Clear current orders
    ordersList.innerHTML = '';
    
    // Filter orders by status
    let filteredOrders = orders;
    if (status !== 'all') {
        filteredOrders = orders.filter(order => order.status === status);
    }
    
    // Check if there are any orders
    if (filteredOrders.length === 0) {
        ordersList.innerHTML = '<div class="no-orders">No orders found</div>';
        return;
    }
    
    // Add each order to the list
    filteredOrders.forEach(order => {
        const orderElement = createOrderElement(order);
        ordersList.appendChild(orderElement);
    });
}

// Create order element
function createOrderElement(order) {
    const orderElement = document.createElement('div');
    orderElement.classList.add('order-item');
    orderElement.setAttribute('data-order-id', order.id);
    
    // Create order header
    const orderHeader = document.createElement('div');
    orderHeader.classList.add('order-header');
    
    // Format date
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    // Set order header content
    orderHeader.innerHTML = `
        <div>
            <div class="order-id">Order #${order.id}</div>
            <div class="order-date">${formattedDate}</div>
        </div>
        <div>
            <span class="order-status status-${order.status}">${order.status}</span>
        </div>
    `;
    
    // Create order products
    const orderProducts = document.createElement('div');
    orderProducts.classList.add('order-products');
    
    // Add products to order
    order.products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('order-product');
        
        productElement.innerHTML = `
            <div class="order-product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="order-product-details">
                <div class="order-product-name">${product.name}</div>
                <div class="order-product-price">₹${product.price.toLocaleString()}</div>
                <div class="order-product-quantity">Quantity: ${product.quantity}</div>
            </div>
        `;
        
        orderProducts.appendChild(productElement);
    });
    
    // Create order footer
    const orderFooter = document.createElement('div');
    orderFooter.classList.add('order-footer');
    
    // Set order footer content
    orderFooter.innerHTML = `
        <div class="order-total">Total: ₹${order.total.toLocaleString()}</div>
        <div class="order-actions">
            ${order.status === 'pending' ? '<button class="order-action-btn secondary-btn track-order-btn">Track Order</button>' : ''}
            ${order.status === 'pending' ? '<button class="order-action-btn danger-btn cancel-order-btn">Cancel Order</button>' : ''}
            <button class="order-action-btn primary-btn view-details-btn">View Details</button>
        </div>
    `;
    
    // Add elements to order
    orderElement.appendChild(orderHeader);
    orderElement.appendChild(orderProducts);
    orderElement.appendChild(orderFooter);
    
    // Add event listeners to buttons
    setTimeout(() => {
        // Track Order button
        const trackBtn = orderElement.querySelector('.track-order-btn');
        if (trackBtn) {
            trackBtn.addEventListener('click', () => {
                alert('Tracking information will be available soon.');
            });
        }
        
        // Cancel Order button
        const cancelBtn = orderElement.querySelector('.cancel-order-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to cancel this order?')) {
                    // Get order ID
                    const orderId = orderElement.getAttribute('data-order-id');
                    
                    // Get current user
                    const currentUser = getCurrentUser();
                    if (!currentUser) return;
                    
                    // Get user-specific orders key
                    const userEmail = currentUser.email;
                    const ordersKey = `mallnav_orders_${userEmail}`;
                    
                    // Update order status in localStorage
                    const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
                    let cancelledOrder;
                    
                    const updatedOrders = orders.map(o => {
                        if (o.id === orderId) {
                            cancelledOrder = o;
                            return { ...o, status: 'cancelled' };
                        }
                        return o;
                    });
                    
                    // Save updated orders
                    localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));
                    
                    // Restore product stock
                    if (cancelledOrder && cancelledOrder.products) {
                        // Load current products
                        const savedProducts = localStorage.getItem('mallnav_products');
                        if (savedProducts) {
                            const products = JSON.parse(savedProducts);
                            
                            // Increase stock for each product in the cancelled order
                            cancelledOrder.products.forEach(orderProduct => {
                                const product = products.find(p => p.id === orderProduct.id);
                                if (product) {
                                    product.stock += orderProduct.quantity;
                                    console.log(`Restored ${orderProduct.quantity} units to stock for ${product.name}. New stock: ${product.stock}`);
                                }
                            });
                            
                            // Save updated products
                            localStorage.setItem('mallnav_products', JSON.stringify(products));
                            
                            // Notify about stock update
                            window.dispatchEvent(new CustomEvent('stockUpdated'));
                        }
                    }
                    
                    // Update UI
                    const statusElement = orderElement.querySelector('.order-status');
                    statusElement.className = 'order-status status-cancelled';
                    statusElement.textContent = 'cancelled';
                    
                    // Remove action buttons
                    orderElement.querySelectorAll('.order-action-btn').forEach(btn => {
                        if (!btn.classList.contains('view-details-btn')) {
                            btn.remove();
                        }
                    });
                    
                    // Show toast message if function exists
                    if (typeof showToast === 'function') {
                        showToast('Order cancelled successfully');
                    }
                }
            });
        }
        
        // View Details button
        const viewBtn = orderElement.querySelector('.view-details-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', () => {
                alert('Order details view is currently under development.');
            });
        }
    }, 0);
    
    return orderElement;
}

// Generate sample orders
function generateSampleOrders() {
    // This function is no longer needed as we're using user-specific orders
    // We'll keep it empty for backward compatibility
}

// Get orders for the current user
function getSampleOrders() {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    // Get user-specific orders using email as key
    const userEmail = currentUser.email;
    const ordersKey = `mallnav_orders_${userEmail}`;
    const ordersJson = localStorage.getItem(ordersKey);
    return ordersJson ? JSON.parse(ordersJson) : [];
}

// Switch between tabs in login modal
function switchToTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to the selected tab button and content
    const selectedButton = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    const selectedContent = document.getElementById(`${tabName}-tab`);
    
    if (selectedButton && selectedContent) {
        selectedButton.classList.add('active');
        selectedContent.classList.add('active');
    }
}

// Register a new user
function registerUser(username, email, password, confirmPassword) {
    const messageElement = document.getElementById('register-message');
    
    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
        showMessage(messageElement, 'All fields are required', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage(messageElement, 'Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage(messageElement, 'Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage(messageElement, 'Please enter a valid email address', 'error');
        return;
    }
    
    // Check if user already exists
    const users = getUsers();
    if (users.some(user => user.email === email)) {
        showMessage(messageElement, 'Email is already registered', 'error');
        return;
    }
    
    // Create new user object
    const newUser = {
        username,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    
    // Add user to storage
    users.push(newUser);
    localStorage.setItem('mallnav_users', JSON.stringify(users));
    
    // Show success message
    showMessage(messageElement, 'Registration successful! You can now log in.', 'success');
    
    // Reset form
    document.getElementById('register-form').reset();
    
    // Switch to login tab after short delay
    setTimeout(() => {
        switchToTab('login');
    }, 2000);
}

// Log in a user
function loginUser(email, password) {
    const messageElement = document.getElementById('login-message');
    
    // Basic validation
    if (!email || !password) {
        showMessage(messageElement, 'Email and password are required', 'error');
        return;
    }
    
    // Get users from storage
    const users = getUsers();
    const user = users.find(user => user.email === email);
    
    // Check if user exists and password matches
    if (!user || user.password !== password) {
        showMessage(messageElement, 'Invalid email or password', 'error');
        return;
    }
    
    // Create user session
    const userSession = {
        username: user.username,
        email: user.email,
        fullName: user.fullName || '',
        phone: user.phone || '',
        address: user.address || '',
        createdAt: user.createdAt,
        loggedInAt: new Date().toISOString()
    };
    
    // Store session
    localStorage.setItem('mallnav_current_user', JSON.stringify(userSession));
    
    // Show success message
    showMessage(messageElement, 'Login successful! Redirecting...', 'success');
    
    // Close modal and update UI
    setTimeout(() => {
        document.getElementById('login-modal').style.display = 'none';
        document.body.style.overflow = '';
        updateUIForLoggedInUser(userSession);
    }, 1000);
}

// Log in an admin user
function loginAdmin(username, password) {
    const messageElement = document.getElementById('admin-message');
    
    // For demo purposes, hardcoded admin credentials
    const adminUsername = 'Harsh Singh';
    const adminPassword = 'harshsingh0774tto';
    
    if (username === adminUsername && password === adminPassword) {
        // Create admin session
        const adminSession = {
            username: adminUsername,
            isAdmin: true,
            loggedInAt: new Date().toISOString()
        };
        
        // Store session
        localStorage.setItem('mallnav_current_user', JSON.stringify(adminSession));
        
        // Show success message
        showMessage(messageElement, 'Admin login successful! Redirecting...', 'success');
        
        // Close modal and update UI
        setTimeout(() => {
            document.getElementById('login-modal').style.display = 'none';
            document.body.style.overflow = '';
            updateUIForLoggedInUser(adminSession);
        }, 1000);
    } else {
        showMessage(messageElement, 'Invalid admin credentials', 'error');
    }
}

// Load user profile data
function loadUserProfile() {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        // Update profile fields
        const profileAvatar = document.getElementById('profile-avatar-letter');
        const profileUsername = document.getElementById('profile-username');
        const profileEmail = document.getElementById('profile-email');
        const profileMemberSince = document.getElementById('profile-member-since');
        
        // Profile form fields
        const profileFullname = document.getElementById('profile-fullname');
        const profilePhone = document.getElementById('profile-phone');
        const profileAddress = document.getElementById('profile-address');
        
        // Set avatar letter
        if (profileAvatar) {
            profileAvatar.textContent = currentUser.username.charAt(0).toUpperCase();
        }
        
        // Set username and email
        if (profileUsername) {
            profileUsername.textContent = currentUser.username;
        }
        
        if (profileEmail) {
            profileEmail.textContent = currentUser.email;
        }
        
        // Set member since date
        if (profileMemberSince) {
            const createdDate = new Date(currentUser.createdAt);
            const formattedDate = createdDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            profileMemberSince.textContent = `Member since: ${formattedDate}`;
        }
        
        // Set form fields
        if (profileFullname) {
            profileFullname.value = currentUser.fullName || '';
        }
        
        if (profilePhone) {
            profilePhone.value = currentUser.phone || '';
        }
        
        if (profileAddress) {
            profileAddress.value = currentUser.address || '';
        }
    }
}

// Log out the current user
function logoutUser() {
    // Remove user session from storage
    localStorage.removeItem('mallnav_current_user');
    
    // Update UI
    updateUIForLoggedOutUser();
    
    // Show toast notification
    if (typeof showToast === 'function') {
        showToast('You have been logged out');
    }
}

// Check if a user is currently logged in
function checkLoginStatus() {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        updateUIForLoggedInUser(currentUser);
    } else {
        updateUIForLoggedOutUser();
    }
}

// Get the current logged-in user
function getCurrentUser() {
    const userJson = localStorage.getItem('mallnav_current_user');
    return userJson ? JSON.parse(userJson) : null;
}

// Get all registered users
function getUsers() {
    const usersJson = localStorage.getItem('mallnav_users');
    return usersJson ? JSON.parse(usersJson) : [];
}

// Update UI for logged-in user
function updateUIForLoggedInUser(user) {
    const loginBtn = document.getElementById('login-btn');
    const navLinks = document.querySelector('.user-actions');
    
    if (loginBtn && navLinks) {
        // Remove login button
        loginBtn.remove();
        
        // Create user avatar/profile element
        const userMenu = document.createElement('div');
        userMenu.classList.add('user-menu');
        
        // Get first letter of username for avatar
        const firstLetter = user.username.charAt(0).toUpperCase();
        
        userMenu.innerHTML = `
            <div class="user-avatar" id="user-avatar">${firstLetter}</div>
            <div class="user-menu-content" id="user-menu-content">
                <a href="#" id="profile-link"><i class="fas fa-user"></i> My Profile</a>
                <a href="#" id="orders-link"><i class="fas fa-list"></i> My Orders</a>
                <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        `;
        
        // Add user menu to navigation
        navLinks.appendChild(userMenu);
        
        // Add event listener for user avatar click
        const userAvatar = document.getElementById('user-avatar');
        const userMenuContent = document.getElementById('user-menu-content');
        
        if (userAvatar && userMenuContent) {
            userAvatar.addEventListener('click', () => {
                userMenuContent.classList.toggle('show-menu');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!userAvatar.contains(e.target) && !userMenuContent.contains(e.target)) {
                    userMenuContent.classList.remove('show-menu');
                }
            });
        }
        
        // Add event listeners for menu items
        const profileLink = document.getElementById('profile-link');
        const ordersLink = document.getElementById('orders-link');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (profileLink) {
            profileLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Load user profile data
                loadUserProfile();
                
                // Show profile modal
                const profileModal = document.getElementById('profile-modal');
                profileModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Hide menu
                userMenuContent.classList.remove('show-menu');
            });
        }
        
        if (ordersLink) {
            ordersLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Show orders modal
                const ordersModal = document.getElementById('orders-modal');
                ordersModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Filter orders (default: all)
                filterOrders('all');
                
                // Hide menu
                userMenuContent.classList.remove('show-menu');
            });
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                logoutUser();
            });
        }
        
        // Add welcome toast if showToast function exists
        if (typeof showToast === 'function') {
            showToast(`Welcome back, ${user.username}!`);
        }
    }
}

// Update UI for logged-out user
function updateUIForLoggedOutUser() {
    const userMenu = document.querySelector('.user-menu');
    const userActions = document.querySelector('.user-actions');
    
    // If user menu exists, remove it
    if (userMenu) {
        userMenu.remove();
    }
    
    // Check if login button already exists
    if (userActions && !document.getElementById('login-btn')) {
        // Create login button
        const loginBtn = document.createElement('a');
        loginBtn.id = 'login-btn';
        loginBtn.href = '#';
        loginBtn.textContent = 'Login';
        
        // Add event listener to login button
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('login-modal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        // Add login button to user actions
        userActions.appendChild(loginBtn);
    }
}

// Show message in form
function showMessage(element, message, type) {
    if (element) {
        element.textContent = message;
        element.className = 'form-message';
        
        if (type === 'error') {
            element.classList.add('error-message');
        } else if (type === 'success') {
            element.classList.add('success-message');
        }
    }
} 