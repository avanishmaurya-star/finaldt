document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initLocationSearch();
});

// Initialize the map functionality
function initMap() {
    // In a real application, this would integrate with a mapping API
    console.log('Map initialized');
    
    // Add event listener to map image for simulating clicks on the map
    const mapImg = document.getElementById('mall-map-img');
    if (mapImg) {
        mapImg.addEventListener('click', (e) => {
            // Get click coordinates relative to the image
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Convert to percentage
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            // Place a marker at the clicked position
            placeMarker(xPercent, yPercent);
            
            // Generate a simulated location name
            const locationName = getRandomLocation();
            
            // Update directions for the clicked location
            updateDirectionsByLocation(locationName);
        });
    }
}

// Initialize the location search functionality
function initLocationSearch() {
    const searchInput = document.getElementById('location-search');
    const searchBtn = document.getElementById('location-search-btn');
    
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchLocation(query);
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchLocation(query);
            }
        }
    });
}

// Search for a location
function searchLocation(query) {
    // Show loading state
    const directionsSteps = document.getElementById('directions-steps');
    directionsSteps.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Searching location...</div>';
    
    // Simulate API call with setTimeout (would be replaced with actual API call)
    setTimeout(() => {
        // Check if the query matches a product name or location
        const matchedProduct = findProductByQuery(query);
        
        if (matchedProduct) {
            // Navigate to the product
            navigateToProduct(matchedProduct);
        } else {
            // Check if query matches a store or area
            const matchedLocation = findLocationByQuery(query);
            
            if (matchedLocation) {
                // Navigate to the location
                placeRandomMarker();
                updateDirectionsByLocation(matchedLocation);
            } else {
                // No match found
                directionsSteps.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-map-marker-alt"></i>
                        <h3>No location found for "${query}"</h3>
                        <p>Try searching for a store name, product, or area</p>
                    </div>
                `;
            }
        }
    }, 500);
}

// Find a product by query
function findProductByQuery(query) {
    // Convert query to lowercase for case-insensitive comparison
    const lowerQuery = query.toLowerCase();
    
    // First try exact matches on product name
    let matchedProduct = products.find(product => 
        product.name.toLowerCase() === lowerQuery
    );
    
    // If no exact match, try partial matches
    if (!matchedProduct) {
        matchedProduct = products.find(product => 
            product.name.toLowerCase().includes(lowerQuery)
        );
    }
    
    // If still no match, try matching by category
    if (!matchedProduct) {
        const categoryProducts = products.filter(product => 
            product.category.toLowerCase().includes(lowerQuery)
        );
        
        if (categoryProducts.length > 0) {
            // Return the first product in the matched category
            matchedProduct = categoryProducts[0];
        }
    }
    
    return matchedProduct;
}

// Find a location by query
function findLocationByQuery(query) {
    // List of mall locations
    const locations = [
        "Main Entrance", "Food Court", "Electronics Zone", 
        "Fashion District", "Toys Section", "Home Appliances",
        "Sports Section", "Jewelry Corner", "Bookstore",
        "Beauty & Cosmetics", "Footwear Zone", "Customer Service",
        "Restrooms", "Elevator 1", "Elevator 2",
        "Escalator A", "Escalator B", "ATM Zone",
        "Parking Entrance", "Cinema"
    ];
    
    // Convert query to lowercase for case-insensitive comparison
    const lowerQuery = query.toLowerCase();
    
    // First try exact matches
    let matchedLocation = locations.find(location => 
        location.toLowerCase() === lowerQuery
    );
    
    // If no exact match, try partial matches
    if (!matchedLocation) {
        matchedLocation = locations.find(location => 
            location.toLowerCase().includes(lowerQuery)
        );
    }
    
    return matchedLocation;
}

// Update directions by location name
function updateDirectionsByLocation(locationName) {
    const directionsSteps = document.getElementById('directions-steps');
    
    // Generate directions based on the location
    const steps = generateDirections(locationName);
    
    let stepsHTML = '';
    steps.forEach((step, index) => {
        stepsHTML += `
            <div class="direction-step">
                <div class="step-number">${index + 1}</div>
                <div class="step-text">${step}</div>
            </div>
        `;
    });
    
    directionsSteps.innerHTML = stepsHTML;
}

// Generate directions for a given destination
function generateDirections(destination) {
    // Common first steps
    const commonSteps = [
        'Start from the main entrance',
        'Go straight ahead for 50 meters'
    ];
    
    // Destination-specific steps
    let specificSteps = [];
    
    // Generate different paths based on the destination
    if (destination.includes('Electronics') || destination.includes('TV') || destination.includes('Gaming')) {
        specificSteps = [
            'Take the escalator to the 2nd floor',
            'Turn right after the escalator',
            `Continue straight until you reach the ${destination}`
        ];
    } else if (destination.includes('Food') || destination.includes('Restaurant')) {
        specificSteps = [
            'Turn left at the central plaza',
            `Follow the signs to the ${destination}`
        ];
    } else if (destination.includes('Fashion') || destination.includes('Clothing') || destination.includes('Footwear')) {
        specificSteps = [
            'Continue past the central fountain',
            'Turn right at the information desk',
            `The ${destination} is on your left`
        ];
    } else if (destination.includes('Home') || destination.includes('Furniture')) {
        specificSteps = [
            'Take the escalator to the 3rd floor',
            `The ${destination} is straight ahead`
        ];
    } else {
        // Generic directions for other destinations
        specificSteps = [
            'Turn right at the central plaza',
            `Follow the signs to ${destination}`
        ];
    }
    
    // Add the final step
    specificSteps.push(`You have arrived at ${destination}`);
    
    // Combine common and specific steps
    return [...commonSteps, ...specificSteps];
}

// Place a marker on the map at specified coordinates
function placeMarker(xPercent, yPercent) {
    const mapView = document.getElementById('map-view');
    
    // Remove existing markers
    const existingMarkers = mapView.querySelectorAll('.map-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Create a new marker
    const marker = document.createElement('div');
    marker.classList.add('map-marker');
    marker.innerHTML = '<i class="fas fa-map-pin"></i>';
    marker.style.position = 'absolute';
    marker.style.top = `${yPercent}%`;
    marker.style.left = `${xPercent}%`;
    marker.style.color = 'var(--primary-color)';
    marker.style.fontSize = '2rem';
    marker.style.animation = 'bounce 1s infinite';
    marker.style.zIndex = '10';
    marker.style.transform = 'translate(-50%, -100%)';
    
    // Add the marker to the map
    mapView.appendChild(marker);
    
    // Ensure we have the animation style
    ensureAnimationStyle();
}

// Place a marker at a random position on the map
function placeRandomMarker() {
    // Random position between 15% and 85% of the map dimensions
    const x = Math.floor(Math.random() * 70) + 15;
    const y = Math.floor(Math.random() * 70) + 15;
    
    placeMarker(x, y);
}

// Get a random location name
function getRandomLocation() {
    const locations = [
        "Electronics Zone", "Fashion District", "Food Court", 
        "Home Appliances", "Sports Section", "Jewelry Corner", 
        "Beauty & Cosmetics", "Footwear Zone", "Toys Section"
    ];
    
    const randomIndex = Math.floor(Math.random() * locations.length);
    return locations[randomIndex];
}

// Ensure the bounce animation style exists
function ensureAnimationStyle() {
    // Check if the style already exists
    if (!document.getElementById('map-marker-animation')) {
        const style = document.createElement('style');
        style.id = 'map-marker-animation';
        style.textContent = `
            @keyframes bounce {
                0%, 100% { transform: translate(-50%, -100%); }
                50% { transform: translate(-50%, -120%); }
            }
            .map-marker {
                cursor: pointer;
                animation: bounce 1s infinite;
            }
        `;
        document.head.appendChild(style);
    }
}

// Draw a path between two points on the map
function drawPath(startX, startY, endX, endY) {
    // In a real application, this would draw an actual path on the map
    // For our demo, we'll just log the coordinates
    console.log(`Drawing path from (${startX}, ${startY}) to (${endX}, ${endY})`);
}

// Show the floor selector UI
function showFloorSelector() {
    const mapView = document.getElementById('map-view');
    
    // Check if the floor selector already exists
    if (document.querySelector('.floor-selector')) {
        return;
    }
    
    // Create the floor selector
    const floorSelector = document.createElement('div');
    floorSelector.classList.add('floor-selector');
    
    floorSelector.innerHTML = `
        <button class="floor-btn" data-floor="1">F1</button>
        <button class="floor-btn active" data-floor="2">F2</button>
        <button class="floor-btn" data-floor="3">F3</button>
    `;
    
    // Position the floor selector
    floorSelector.style.position = 'absolute';
    floorSelector.style.top = '20px';
    floorSelector.style.right = '20px';
    floorSelector.style.zIndex = '10';
    floorSelector.style.background = 'white';
    floorSelector.style.borderRadius = '5px';
    floorSelector.style.padding = '5px';
    floorSelector.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    // Add the floor selector to the map
    mapView.appendChild(floorSelector);
    
    // Add event listeners to floor buttons
    const floorBtns = floorSelector.querySelectorAll('.floor-btn');
    floorBtns.forEach(btn => {
        btn.style.border = 'none';
        btn.style.background = 'none';
        btn.style.padding = '8px 12px';
        btn.style.borderRadius = '3px';
        btn.style.cursor = 'pointer';
        btn.style.margin = '0 2px';
        
        // Style the active button
        if (btn.classList.contains('active')) {
            btn.style.background = 'var(--primary-color)';
            btn.style.color = 'white';
        }
        
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            floorBtns.forEach(b => {
                b.classList.remove('active');
                b.style.background = 'none';
                b.style.color = 'inherit';
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            btn.style.background = 'var(--primary-color)';
            btn.style.color = 'white';
            
            // Change floor (in a real app, this would load a different map)
            changeFloor(btn.getAttribute('data-floor'));
        });
    });
}

// Change the displayed floor
function changeFloor(floorNumber) {
    // This is a placeholder for the actual implementation
    // In a real application, this would load a different map image
    console.log(`Changing to floor ${floorNumber}`);
    
    // For the demo, we'll just show a message
    showToast(`Switched to Floor ${floorNumber}`);
    
    // Clear any existing markers
    const mapView = document.getElementById('map-view');
    const existingMarkers = mapView.querySelectorAll('.map-marker');
    existingMarkers.forEach(marker => marker.remove());
}

// New functions for Android app integration

// Launch the Android navigation app with deep linking
function launchAndroidApp(location) {
    // Create deep link URI with location parameters
    // Replace "com.example.navapp" with your actual package name
    const uri = `intent://navigate?location=${encodeURIComponent(location)}&x=${Math.random()*100}&y=${Math.random()*100}#Intent;scheme=mallnav;package=com.example.navapp;end`;
    
    // Create an anchor and simulate click
    const link = document.createElement('a');
    link.href = uri;
    link.click();
    
    // Show fallback message for users without the app
    setTimeout(() => {
        showInstallAppPrompt();
    }, 2000);
}

// Generate QR code for current location (simplified version)
function generateLocationQR(location, x, y) {
    // Add QR code to the map view
    const mapView = document.getElementById('map-view');
    
    // Create QR code container
    const qrContainer = document.createElement('div');
    qrContainer.classList.add('qr-container');
    qrContainer.innerHTML = `
        <div class="qr-code">
            <div class="qr-placeholder">QR Code</div>
        </div>
        <div class="qr-info">
            <p>Scan to navigate to this location</p>
            <button class="launch-app-btn">Open in App</button>
        </div>
    `;
    
    // Style the QR code container
    qrContainer.style.position = 'absolute';
    qrContainer.style.top = '20px';
    qrContainer.style.left = '20px';
    qrContainer.style.backgroundColor = 'white';
    qrContainer.style.padding = '15px';
    qrContainer.style.borderRadius = '10px';
    qrContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    qrContainer.style.zIndex = '50';
    qrContainer.style.maxWidth = '180px';
    qrContainer.style.textAlign = 'center';
    
    // Style the QR placeholder
    const qrPlaceholder = qrContainer.querySelector('.qr-placeholder');
    qrPlaceholder.style.width = '150px';
    qrPlaceholder.style.height = '150px';
    qrPlaceholder.style.backgroundColor = '#f3f4f6';
    qrPlaceholder.style.display = 'flex';
    qrPlaceholder.style.alignItems = 'center';
    qrPlaceholder.style.justifyContent = 'center';
    qrPlaceholder.style.marginBottom = '10px';
    qrPlaceholder.style.fontWeight = 'bold';
    qrPlaceholder.style.color = '#6b7280';
    
    // Style the launch button
    const launchBtn = qrContainer.querySelector('.launch-app-btn');
    launchBtn.style.backgroundColor = 'var(--primary-color)';
    launchBtn.style.color = 'white';
    launchBtn.style.border = 'none';
    launchBtn.style.padding = '8px 15px';
    launchBtn.style.borderRadius = '5px';
    launchBtn.style.cursor = 'pointer';
    launchBtn.style.marginTop = '10px';
    launchBtn.style.width = '100%';
    
    // Add event listener to launch button
    launchBtn.addEventListener('click', () => {
        launchAndroidApp(location);
    });
    
    // Add the QR container to the map
    mapView.appendChild(qrContainer);
    
    // In a real implementation, you would generate an actual QR code
    // using a library like qrcode.js
}

// Show prompt to install the app
function showInstallAppPrompt() {
    // Create modal for app install prompt
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content app-install">
            <span class="close-btn">&times;</span>
            <div class="app-info">
                <div class="app-icon">
                    <i class="fas fa-map-marked-alt"></i>
                </div>
                <h2>Navigation App Required</h2>
                <p>For the best indoor navigation experience, please install our companion app.</p>
                <div class="app-buttons">
                    <button class="install-app-btn">
                        <i class="fab fa-google-play"></i> Download from Play Store
                    </button>
                    <button class="continue-web-btn">
                        Continue with Web Version
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for the app install prompt
    const style = document.createElement('style');
    style.textContent = `
        .app-install {
            max-width: 450px;
            text-align: center;
        }
        
        .app-icon {
            font-size: 4rem;
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        
        .app-info h2 {
            margin-bottom: 15px;
        }
        
        .app-info p {
            margin-bottom: 25px;
            color: var(--light-text);
        }
        
        .app-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .install-app-btn {
            background-color: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .continue-web-btn {
            background-color: var(--light-bg);
            color: var(--text-color);
            padding: 12px 20px;
            border-radius: 5px;
            font-weight: 500;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    const installBtn = modal.querySelector('.install-app-btn');
    installBtn.addEventListener('click', () => {
        // Open Play Store link - replace with your actual app link
        window.open('https://play.google.com/store/apps/details?id=com.example.navapp', '_blank');
        document.body.removeChild(modal);
    });
    
    const continueBtn = modal.querySelector('.continue-web-btn');
    continueBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Modify existing showNavigationPath function to add app integration
function showNavigationPath(location) {
    // Keep existing code for web version
    // This is a placeholder for the actual implementation
    // In a real application, this would interact with the indoor navigation system
    console.log(`Showing navigation path to: ${location}`);
    
    // Highlight the destination on the map
    // This is just a visual simulation
    const mapView = document.getElementById('map-view');
    
    // Remove existing markers
    const existingMarkers = mapView.querySelectorAll('.map-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Remove existing QR containers
    const existingQR = mapView.querySelectorAll('.qr-container');
    existingQR.forEach(qr => qr.remove());
    
    // Add a new marker
    const marker = document.createElement('div');
    marker.classList.add('map-marker');
    marker.innerHTML = '<i class="fas fa-map-pin"></i>';
    marker.style.position = 'absolute';
    
    // Position randomly for demo purposes
    // In a real app, this would be based on actual coordinates
    const x = Math.floor(Math.random() * 70) + 15; // 15-85%
    const y = Math.floor(Math.random() * 70) + 15; // 15-85%
    
    marker.style.top = `${y}%`;
    marker.style.left = `${x}%`;
    marker.style.color = 'var(--primary-color)';
    marker.style.fontSize = '2rem';
    marker.style.animation = 'bounce 1s infinite';
    marker.style.zIndex = '10';
    marker.style.transform = 'translate(-50%, -100%)';
    
    mapView.appendChild(marker);
    
    // Ensure we have the animation style
    ensureAnimationStyle();
    
    // Add a "Open in App" button
    const appButton = document.createElement('button');
    appButton.classList.add('open-in-app-btn');
    appButton.innerHTML = '<i class="fas fa-mobile-alt"></i> Open in App';
    appButton.style.position = 'absolute';
    appButton.style.bottom = '20px';
    appButton.style.right = '20px';
    appButton.style.backgroundColor = 'var(--primary-color)';
    appButton.style.color = 'white';
    appButton.style.padding = '10px 15px';
    appButton.style.borderRadius = '5px';
    appButton.style.border = 'none';
    appButton.style.cursor = 'pointer';
    appButton.style.zIndex = '50';
    appButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    appButton.addEventListener('click', () => {
        launchAndroidApp(location);
    });
    
    mapView.appendChild(appButton);
    
    // Generate QR code for this location
    generateLocationQR(location, x, y);
}

// Modify the navigateToProduct function to add app integration options
function navigateToProduct(product) {
    // Scroll to map section
    document.querySelector('.mall-map').scrollIntoView({ behavior: 'smooth' });
    
    // Show navigation path on the map
    showNavigationPath(product.location);
    
    // Update directions panel
    updateDirections(product);
    
    // Add App/Web toggle
    addNavigationToggle(product);
}

// Add a toggle for switching between web and app navigation
function addNavigationToggle(product) {
    const directionsPanel = document.querySelector('.directions-panel');
    
    // Remove existing toggle if any
    const existingToggle = directionsPanel.querySelector('.nav-toggle');
    if (existingToggle) {
        existingToggle.remove();
    }
    
    // Create toggle
    const toggle = document.createElement('div');
    toggle.classList.add('nav-toggle');
    toggle.innerHTML = `
        <p>Navigation Method:</p>
        <div class="toggle-buttons">
            <button class="toggle-btn active" data-mode="web">Web</button>
            <button class="toggle-btn" data-mode="app">Mobile App</button>
        </div>
    `;
    
    // Style the toggle
    toggle.style.marginTop = '20px';
    toggle.style.padding = '15px';
    toggle.style.backgroundColor = 'white';
    toggle.style.borderRadius = '5px';
    toggle.style.border = '1px solid var(--border-color)';
    
    const toggleButtons = toggle.querySelector('.toggle-buttons');
    toggleButtons.style.display = 'flex';
    toggleButtons.style.marginTop = '10px';
    
    const buttons = toggle.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => {
        btn.style.flex = '1';
        btn.style.padding = '8px';
        btn.style.border = 'none';
        btn.style.cursor = 'pointer';
        
        if (btn.classList.contains('active')) {
            btn.style.backgroundColor = 'var(--primary-color)';
            btn.style.color = 'white';
        } else {
            btn.style.backgroundColor = 'var(--light-bg)';
        }
    });
    
    // Add event listeners
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(b => {
                b.classList.remove('active');
                b.style.backgroundColor = 'var(--light-bg)';
                b.style.color = 'initial';
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            btn.style.backgroundColor = 'var(--primary-color)';
            btn.style.color = 'white';
            
            // Handle mode change
            const mode = btn.getAttribute('data-mode');
            if (mode === 'app') {
                launchAndroidApp(product.location);
            }
        });
    });
    
    // Add the toggle to the directions panel
    directionsPanel.appendChild(toggle);
}

// Generate QR code for app download
function generateAppDownloadQR() {
    // Instead of generating a QR code, we'll directly redirect to the app download
    window.location.href = 'http://shreyaslohiafr.github.io/dt-app1/Indoor%202.0.apk';
}

// Add initialization function to show the app download QR code when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Existing initialization code
    initMap();
    initLocationSearch();
    
    // Add download app button to the map section
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        const downloadButton = document.createElement('button');
        downloadButton.classList.add('app-download-btn');
        downloadButton.innerHTML = '<i class="fas fa-download"></i> Download App';
        
        // Style the button
        downloadButton.style.position = 'absolute';
        downloadButton.style.bottom = '20px';
        downloadButton.style.left = '20px';
        downloadButton.style.backgroundColor = 'var(--secondary-color)';
        downloadButton.style.color = 'white';
        downloadButton.style.padding = '10px 15px';
        downloadButton.style.borderRadius = '5px';
        downloadButton.style.border = 'none';
        downloadButton.style.cursor = 'pointer';
        downloadButton.style.zIndex = '50';
        downloadButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        downloadButton.style.display = 'flex';
        downloadButton.style.alignItems = 'center';
        downloadButton.style.gap = '8px';
        
        downloadButton.addEventListener('click', generateAppDownloadQR);
        
        const mapView = document.getElementById('map-view');
        mapView.style.position = 'relative';
        mapView.appendChild(downloadButton);
    }
    
    // Also add a download app button in the map sidebar
    addAppDownloadOption();
});

// Add download app option to the map sidebar
function addAppDownloadOption() {
    const mapSidebar = document.querySelector('.map-sidebar');
    
    if (!mapSidebar) return;
    
    // Create download app banner
    const downloadBanner = document.createElement('div');
    downloadBanner.classList.add('app-download-banner');
    downloadBanner.innerHTML = `
        <div class="app-icon">
            <i class="fas fa-map-marked-alt"></i>
        </div>
        <div class="app-info">
            <h4>Enhanced Navigation</h4>
            <p>Download our mobile app for a better experience</p>
        </div>
        <a href="http://shreyaslohiafr.github.io/dt-app1/Indoor%202.0.apk" class="download-app-btn">Download App</a>
    `;
    
    // Style the banner
    downloadBanner.style.display = 'flex';
    downloadBanner.style.alignItems = 'center';
    downloadBanner.style.padding = '15px';
    downloadBanner.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
    downloadBanner.style.borderRadius = '10px';
    downloadBanner.style.marginTop = '20px';
    downloadBanner.style.border = '1px dashed var(--primary-color)';
    
    // Style the app icon
    const appIcon = downloadBanner.querySelector('.app-icon');
    appIcon.style.fontSize = '2rem';
    appIcon.style.color = 'var(--primary-color)';
    appIcon.style.marginRight = '15px';
    
    // Style the app info
    const appInfo = downloadBanner.querySelector('.app-info');
    appInfo.style.flex = '1';
    
    const appTitle = downloadBanner.querySelector('h4');
    appTitle.style.margin = '0 0 5px 0';
    appTitle.style.fontSize = '1rem';
    
    const appDesc = downloadBanner.querySelector('p');
    appDesc.style.margin = '0';
    appDesc.style.fontSize = '0.85rem';
    appDesc.style.color = 'var(--light-text)';
    
    // Style the download button
    const downloadBtn = downloadBanner.querySelector('.download-app-btn');
    downloadBtn.style.backgroundColor = 'var(--secondary-color)';
    downloadBtn.style.color = 'white';
    downloadBtn.style.border = 'none';
    downloadBtn.style.padding = '8px 12px';
    downloadBtn.style.borderRadius = '5px';
    downloadBtn.style.cursor = 'pointer';
    downloadBtn.style.fontWeight = '500';
    downloadBtn.style.textDecoration = 'none';
    downloadBtn.style.display = 'inline-block';
    
    // Add to the map sidebar
    mapSidebar.appendChild(downloadBanner);
} 