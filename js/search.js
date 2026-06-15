/* ============================================
   SEARCH PAGE FUNCTIONALITY
   ============================================ */

class SearchPage {
    constructor() {
        this.form = document.getElementById('searchForm');
        this.resultsContainer = document.getElementById('searchResults');
        this.mapSection = document.getElementById('mapSection');
        this.currentView = 'grid';
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSearch(e));
        
        // View toggle buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeView(e.target.dataset.view));
        });
    }

    handleSearch(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const params = Object.fromEntries(formData);
        
        console.log('Searching with params:', params);
        
        // Call IDX framework to fetch listings
        if (window.idxFramework) {
            this.displayResults(window.idxFramework.getMockListings(12));
        }
    }

    displayResults(listings) {
        if (!listings || listings.length === 0) {
            this.resultsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No homes found matching your criteria</p>';
            return;
        }

        this.resultsContainer.innerHTML = '';

        listings.forEach(listing => {
            const card = document.createElement('div');
            card.className = 'listing-card';
            card.innerHTML = `
                <div class="listing-image">
                    <img src="${listing.image}" alt="${listing.address}" loading="lazy">
                </div>
                <div class="listing-info">
                    <h3>${listing.address}</h3>
                    <p class="listing-price">$${this.formatPrice(listing.price)}</p>
                    <div class="listing-details">
                        <span>${listing.beds} Beds</span>
                        <span>${listing.baths} Baths</span>
                        <span>${this.formatSqft(listing.sqft)} Sq.Ft.</span>
                    </div>
                    <button class="btn btn-outline" style="margin-top: 1rem; width: 100%;">View Details</button>
                </div>
            `;
            this.resultsContainer.appendChild(card);
        });
    }

    changeView(view) {
        this.currentView = view;
        
        // Update button states
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Show/hide sections
        if (view === 'map') {
            this.resultsContainer.style.display = 'none';
            this.mapSection.style.display = 'block';
        } else {
            this.resultsContainer.style.display = 'grid';
            this.mapSection.style.display = 'none';
        }
    }

    formatPrice(price) {
        return new Intl.NumberFormat('en-US').format(price);
    }

    formatSqft(sqft) {
        return new Intl.NumberFormat('en-US').format(sqft);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new SearchPage();
});
