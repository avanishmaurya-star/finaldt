// Define global products array
let products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 119900,
        stock: 15,
        category: "electronics",
        location: "Floor 1, Apple Store (A-12)",
        image: "https://assets.hardwarezone.com/img/2023/02/iphone15pro-red.jpg",
        description: "The latest iPhone featuring the A17 Pro chip, advanced camera system, and titanium design."
    },
    {
        id: 2,
        name: "Samsung Galaxy S23 Ultra",
        price: 124999,
        stock: 10,
        category: "electronics",
        location: "Floor 1, Samsung Store (A-14)",
        image: "https://th.bing.com/th/id/R.6f71afa17e714e4607fa30454032c66a?rik=wSjSicB3H3jbPQ&riu=http%3a%2f%2fwww.classic-phones.com%2fcdn%2fshop%2fproducts%2fs23__0000_sm-s918_galaxys23ultra_front_phantomblack_221118.jpg%3fv%3d1675857904&ehk=SXSjdYfP9Airx9JCuQOMIcaQZ6NF1y0LYj16%2b2ibg98%3d&risl=&pid=ImgRaw&r=0",
        description: "Flagship Android smartphone with S Pen, 200MP camera and powerful Snapdragon processor."
    },
    {
        id: 3,
        name: "Sony WH-1000XM5 Headphones",
        price: 34990,
        stock: 20,
        category: "electronics",
        location: "Floor 1, Sony Store (A-18)",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop&q=60",
        description: "Premium noise-cancelling headphones with industry-leading sound quality and comfort."
    },
    {
        id: 4,
        name: "Nike Air Jordan 1",
        price: 14995,
        stock: 8,
        category: "clothing",
        location: "Floor 2, Nike Store (B-05)",
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&auto=format&fit=crop&q=60",
        description: "Iconic basketball shoes that have become a streetwear staple with classic colorways."
    },
    {
        id: 5,
        name: "Levi's 501 Original Fit Jeans",
        price: 5999,
        stock: 25,
        category: "clothing",
        location: "Floor 2, Levi's Store (B-08)",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60",
        description: "The original button fly jeans that started it all. Straight leg styling with signature fit."
    },
    {
        id: 6,
        name: "Dyson V15 Detect Vacuum Cleaner",
        price: 62900,
        stock: 5,
        category: "home",
        location: "Floor 3, Dyson Store (C-22)",
        image: "https://brain-images-ssl.cdn.dixons.com/9/3/10168839/u_10168839.jpg",
        description: "Cordless vacuum with laser detection to reveal microscopic dust and powerful suction."
    },
    {
        id: 7,
        name: "MacBook Pro 16-inch",
        price: 249900,
        stock: 7,
        category: "electronics",
        location: "Floor 1, Apple Store (A-12)",
        image: "https://th.bing.com/th/id/OIP.qEVh2vj_CzpjGhUvr5NlTwHaE-?rs=1&pid=ImgDetMain",
        description: "Powerful laptop with M2 Pro/Max chip, mini-LED display, and all-day battery life."
    },
    {
        id: 8,
        name: "Adidas Ultraboost 23",
        price: 19999,
        stock: 12,
        category: "clothing",
        location: "Floor 2, Adidas Store (B-06)",
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&auto=format&fit=crop&q=60",
        description: "Running shoes with responsive boost cushioning and a supportive, sock-like fit."
    },
    {
        id: 9,
        name: "IKEA BILLY Bookcase",
        price: 7999,
        stock: 30,
        category: "home",
        location: "Floor 3, IKEA Store (C-30)",
        image: "https://www.ikea.com/us/en/images/products/billy-bookcase-birch-veneer__0487681_pe622678_s5.jpg?f=xl",
        description: "Classic bookcase with adjustable shelves that can be arranged according to your needs."
    },
    {
        id: 10,
        name: "Samsung 55\" QLED 4K TV",
        price: 79990,
        stock: 8,
        category: "electronics",
        location: "Floor 1, Samsung Store (A-14)",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&auto=format&fit=crop&q=60",
        description: "Smart TV with Quantum Dot technology, vibrant colors and intelligent upscaling."
    },
    {
        id: 11,
        name: "Zara Oversized Blazer",
        price: 6990,
        stock: 15,
        category: "clothing",
        location: "Floor 2, Zara Store (B-12)",
        image: "https://th.bing.com/th/id/OIP.jbJKV0u40l6s5Go3TUSa-AHaHa?rs=1&pid=ImgDetMain",
        description: "Elegant oversized blazer that can be dressed up or down for various occasions."
    },
    {
        id: 12,
        name: "Instant Pot Duo Plus",
        price: 12999,
        stock: 20,
        category: "home",
        location: "Floor 3, Croma Store (C-18)",
        image: "https://th.bing.com/th/id/OIP.4AnatwtYC-r5IN5FFAgzqgAAAA?rs=1&pid=ImgDetMain",
        description: "9-in-1 electric pressure cooker that speeds up cooking while preserving nutrients."
    },
    {
        id: 13,
        name: "Canon EOS R6 Camera",
        price: 215990,
        stock: 6,
        category: "electronics",
        location: "Floor 1, Canon Store (A-22)",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format&fit=crop&q=60",
        description: "Full-frame mirrorless camera with in-body stabilization and fast hybrid autofocus."
    },
    {
        id: 14,
        name: "H&M Slim Fit Shirt",
        price: 2499,
        stock: 40,
        category: "clothing",
        location: "Floor 2, H&M Store (B-16)",
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60",
        description: "Easy-iron shirt in premium cotton with a button-down collar and slim fit design."
    },
    {
        id: 15,
        name: "Philips Hue Starter Kit",
        price: 10999,
        stock: 15,
        category: "home",
        location: "Floor 3, Croma Store (C-18)",
        image: "https://th.bing.com/th/id/OIP.9mTaeUx3KBWEb8Raizu2awHaHa?rs=1&pid=ImgDetMain",
        description: "Smart lighting system with color-changing bulbs controlled via app or voice assistant."
    },
    {
        id: 16,
        name: "Apple Watch Series 9",
        price: 41900,
        stock: 12,
        category: "electronics",
        location: "Floor 1, Apple Store (A-12)",
        image: "https://images.unsplash.com/photo-1632465763651-299d2ba2ef02?w=500&auto=format&fit=crop&q=60",
        description: "Smartwatch with advanced health features, always-on Retina display and faster chip."
    },
    {
        id: 17,
        name: "Philips Air Fryer XXL",
        price: 16999,
        stock: 10,
        category: "home",
        location: "Floor 3, Croma Store (C-18)",
        image: "https://th.bing.com/th/id/OIP.GGZlWUwiDeYtvXyu0t6sugHaGn?rs=1&pid=ImgDetMain",
        description: "Healthy cooking appliance that fries with up to 90% less fat using minimal oil."
    },
    {
        id: 18,
        name: "Ray-Ban Aviator Sunglasses",
        price: 9990,
        stock: 25,
        category: "clothing",
        location: "Floor 2, Sunglass Hut (B-24)",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60",
        description: "Iconic sunglasses with teardrop-shaped lenses and thin metal frame."
    },
    {
        id: 19,
        name: "Bose QuietComfort Earbuds",
        price: 26900,
        stock: 8,
        category: "electronics",
        location: "Floor 1, Bose Store (A-24)",
        image: "https://images.unsplash.com/photo-1627948016464-9286b15e0482?w=500&auto=format&fit=crop&q=60",
        description: "True wireless earbuds with world-class noise cancellation and high-fidelity audio."
    },
    {
        id: 20,
        name: "The North Face Jacket",
        price: 12999,
        stock: 18,
        category: "clothing",
        location: "Floor 2, The North Face Store (B-28)",
        image: "https://content.backcountry.com/images/items/1200/TNF/TNF03NM/TNFBK.jpg",
        description: "Waterproof breathable jacket designed for outdoor adventures in all weather conditions."
    }
];

// Function to display products
function displayProducts(productList) {
    console.log("Displaying products:", productList.length);
    const productContainer = document.getElementById('product-container');
    
    if (!productContainer) {
        console.error('Product container not found');
        return;
    }
    
    // Clear existing products
    productContainer.innerHTML = '';
    
    // Add each product to the container
    productList.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
    
    // Refresh cart event listeners
    if (typeof refreshCartEventListeners === 'function') {
        refreshCartEventListeners();
    }
}

// Function to create product card
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    
    // Stock status
    let stockStatus = '';
    let stockClass = '';
    
    if (product.stock > 10) {
        stockStatus = 'In Stock';
        stockClass = 'in-stock';
    } else if (product.stock > 0) {
        stockStatus = `Low Stock (${product.stock})`;
        stockClass = 'low-stock';
    } else {
        stockStatus = 'Out of Stock';
        stockClass = 'out-of-stock';
    }
    
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-details">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">₹${product.price.toLocaleString()}</p>
            <p class="product-stock ${stockClass}">
                <i class="fas ${stockClass === 'in-stock' ? 'fa-check-circle' : stockClass === 'low-stock' ? 'fa-exclamation-circle' : 'fa-times-circle'}"></i>
                ${stockStatus}
            </p>
            <p class="product-location">
                <i class="fas fa-map-marker-alt"></i> ${product.location}
            </p>
            <div class="product-actions">
                <button class="add-to-cart" data-id="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i> ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button class="view-details" data-id="${product.id}">
                    <i class="fas fa-eye"></i> Details
                </button>
            </div>
        </div>
    `;
    
    // Add event listener for view details button
    const viewDetailsBtn = productCard.querySelector('.view-details');
    viewDetailsBtn.addEventListener('click', () => {
        showProductDetails(product);
    });
    
    return productCard;
}

// Function to show product details
function showProductDetails(product) {
    // Check if modal already exists
    let productModal = document.getElementById('product-details-modal');
    
    if (!productModal) {
        // Create modal if it doesn't exist
        productModal = document.createElement('div');
        productModal.id = 'product-details-modal';
        productModal.classList.add('modal');
        document.body.appendChild(productModal);
    }
    
    // Stock status
    let stockStatus = '';
    let stockClass = '';
    
    if (product.stock > 10) {
        stockStatus = 'In Stock';
        stockClass = 'in-stock';
    } else if (product.stock > 0) {
        stockStatus = `Low Stock (${product.stock})`;
        stockClass = 'low-stock';
    } else {
        stockStatus = 'Out of Stock';
        stockClass = 'out-of-stock';
    }
    
    // Set modal content
    productModal.innerHTML = `
        <div class="modal-content product-modal-content">
            <span class="close-btn">&times;</span>
            <div class="product-detail-content">
                <div class="product-detail-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-detail-info">
                    <h2>${product.name}</h2>
                    <p class="product-detail-price">₹${product.price.toLocaleString()}</p>
                    <p class="product-detail-stock ${stockClass}">
                        <i class="fas ${stockClass === 'in-stock' ? 'fa-check-circle' : stockClass === 'low-stock' ? 'fa-exclamation-circle' : 'fa-times-circle'}"></i>
                        ${stockStatus}
                    </p>
                    <p class="product-detail-location">
                        <i class="fas fa-map-marker-alt"></i> ${product.location}
                    </p>
                    <p class="product-detail-description">${product.description}</p>
                    <div class="product-detail-actions">
                        <button class="add-to-cart-detail" data-id="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i> ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        <button class="navigate-to-product" data-id="${product.id}" data-location="${product.location}">
                            <i class="fas fa-map-marker-alt"></i> Navigate to Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    productModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    const closeBtn = productModal.querySelector('.close-btn');
    const addToCartBtn = productModal.querySelector('.add-to-cart-detail');
    const navigateBtn = productModal.querySelector('.navigate-to-product');
    
    closeBtn.addEventListener('click', () => {
        productModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    addToCartBtn.addEventListener('click', () => {
        if (typeof addToCart === 'function' && product.stock > 0) {
            addToCart(product);
        }
    });
    
    navigateBtn.addEventListener('click', () => {
        productModal.style.display = 'none';
        document.body.style.overflow = '';
        navigateToProduct(product.location);
    });
    
    // Close modal when clicking outside
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Function to filter products
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;
    
    // Filter by category
    let filteredProducts = products;
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    // Filter by price
    if (priceFilter) {
        const [min, max] = priceFilter.split('-');
        if (min && max) {
            filteredProducts = filteredProducts.filter(product => 
                product.price >= parseInt(min) && product.price <= parseInt(max)
            );
        } else if (min) {
            filteredProducts = filteredProducts.filter(product => 
                product.price >= parseInt(min)
            );
        }
    }
    
    // Sort products
    if (sortFilter) {
        switch (sortFilter) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                // If we had ratings, we would sort by them here
                break;
            default:
                // Default is relevance, no sorting needed
                break;
        }
    }
    
    // Display filtered products
    displayProducts(filteredProducts);
}

// Function to search products
function searchProducts(query) {
    if (!query) {
        return displayProducts(products);
    }
    
    query = query.toLowerCase();
    
    const searchResults = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.location.toLowerCase().includes(query)
    );
    
    displayProducts(searchResults);
}

// Function to navigate to product location
function navigateToProduct(location) {
    const mapView = document.getElementById('map-view');
    
    if (mapView) {
        // Scroll to map section
        const mallMapSection = document.querySelector('.mall-map');
        if (mallMapSection) {
            mallMapSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Show navigation path
        if (typeof showNavigationPath === 'function') {
            showNavigationPath(location);
        } else {
            console.log("Navigation to: " + location);
        }
    }
}

// Load products from localStorage if available
document.addEventListener('DOMContentLoaded', () => {
    // Check if products exist in localStorage
    const savedProducts = localStorage.getItem('mallnav_products');
    
    if (savedProducts) {
        // Use saved products with updated stock
        products = JSON.parse(savedProducts);
        console.log('Loaded products from localStorage with updated stock levels');
    } else {
        // First time loading the site, save default products to localStorage
        localStorage.setItem('mallnav_products', JSON.stringify(products));
        console.log('Saved default products to localStorage');
    }
    
    // Initialize product display
    if (typeof displayProducts === 'function') {
        displayProducts(products);
    }
    
    // Add event listener for stock updates
    window.addEventListener('stockUpdated', function() {
        // Reload products from localStorage
        const updatedProducts = localStorage.getItem('mallnav_products');
        if (updatedProducts) {
            products = JSON.parse(updatedProducts);
            
            // Refresh the display
            if (typeof displayProducts === 'function') {
                displayProducts(products);
            }
        }
    });
    
    // Initialize filter event listeners
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterProducts);
    }
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchProducts(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts(searchInput.value);
            }
        });
    }
}); 