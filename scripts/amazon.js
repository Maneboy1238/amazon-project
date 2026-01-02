/* ============================
   IMPORTS
   ============================ */

// Product data and loader
import { products, loadProducts } from '../data/products.js';

// Utility functions
import { formatCurrency } from './utils/utility.js';

// Cart-related logic
import { cart, addToCart, calcCartQuantity, getCart } from '../data/cart.js';

// Loader class
import { loader } from './loader.js';


/* ============================
   PAGE ENTRY POINT
   ============================ */

// Load products first, then render the page
loadProducts(renderProductsGrid);


/* ============================
   SEARCH URL HELPER
   ============================ */

/*
  This function does NOT filter anything.
  All it does is:
  - Redirect the browser
  - Add ?search=value to the URL
  - Page reloads automatically
*/
export function triggerSearch(page, searchQuery) {
  window.location.href = `${page}.html?search=${searchQuery}`;
}


/* ============================
   MAIN RENDER FUNCTION
   ============================ */

function renderProductsGrid() {

  /* ----------------------------
     CART INITIALIZATION
     ---------------------------- */

  // Sync cart from localStorage
  getCart();


  /* ----------------------------
     PRODUCT STATE
     ---------------------------- */

  /*
    visibleProducts controls what gets rendered.
    - Initially: ALL products
    - After search: FILTERED products
  */
  let visibleProducts = products;


  /* ----------------------------
     LOADER SETUP
     ---------------------------- */

  // Create loader instance once and reuse it
  const loaderInstance = new loader('wrapper');


  /* ----------------------------
     SEARCH ELEMENTS
     ---------------------------- */

  // Header search input and button
  const searchInput = document.querySelector('.js-search-bar');
  const searchButton = document.querySelector('.js-search-button');


  /* ============================
     SEARCH EVENT LISTENERS
     ============================ */

  /*
    Clicking the search button:
    - Creates search URL
    - Reloads the page
  */
 if (searchButton) {
  searchButton.addEventListener('click', () => {
    triggerSearch('amazon', searchInput.value);
  });
}

  /*
    Pressing ENTER in search input:
    - Same behavior as clicking search button
  */
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      triggerSearch('amazon', searchInput.value);
    }
  });


  /* ============================
     SEARCH RENDER LOGIC
     ============================ */

  function renderSearch() {
    loaderInstance.showLoader();

    // Read current URL
    const url = new URL(window.location.href);

    // Get search query from ?search=
    const searchQuery = url.searchParams.get('search');

    /*
      If search exists:
      - Update input value
      - Filter products
      - Re-render products
    */
    if (searchQuery) {
      searchInput.value = searchQuery;

      visibleProducts = products.filter(product =>
        product.name.toUpperCase().includes(searchQuery.toUpperCase())
      );

      renderProducts(visibleProducts);
    }
  }

  // Run search logic ON PAGE LOAD
  renderSearch();


  /* ============================
     PRODUCT RENDER FUNCTION
     ============================ */

  function renderProducts(availableProducts) {

    // Holds generated HTML
    let generateAmazonHtml = '';

    loaderInstance.showLoader();

    setTimeout(() => {

      /* ----------------------------
         EMPTY STATE
         ---------------------------- */

      if (availableProducts.length <= 0) {
        generateAmazonHtml = `
          <div class="icon-container">
            <span>
              <i class="fa-solid fa-box-open"></i>
            </span>
            <p class="no-products-text">No Products Found</p>
            <button class="view-all-products-btn">
              View all Products
            </button>
          </div>
        `;
      }


      /* ----------------------------
         PRODUCT LOOP
         ---------------------------- */

      availableProducts.forEach(product => {

        generateAmazonHtml += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image" src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                   src="${product.getStarUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $ ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-product-num-select-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-add-to-cart-text-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button
              class="add-to-cart-button button-primary js-add-to-cart-btn"
              data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
        `;
      });


      /* ----------------------------
         INSERT INTO DOM
         ---------------------------- */

      const productContainer =
        document.querySelector('.js-all-products-container');
      if (productContainer) {
      productContainer.innerHTML = generateAmazonHtml;
      }
      loaderInstance.hideLoader();


      
    }, 500);

    // Update cart quantity on load
    const cartIcon = document.querySelector('.js-cart-icon-quantity')
      if (cartIcon) {
        cartIcon.innerText = calcCartQuantity();
      }
  }

  // Initial render (no search)
  renderProducts(visibleProducts);
  
}

/* ============================
         EVENT DELEGATION
         ============================ */
      const productContainer = document.querySelector('.js-all-products-container')
      if (productContainer) {
      productContainer.addEventListener('click', (e) => {

        // View all products button
        if (e.target.matches('.view-all-products-btn')) {
          window.location.href = 'amazon.html';
          visibleProducts = products;
          renderProducts(visibleProducts);
        }

        // Add to cart button
        const addToCartBtn = e.target.closest('.js-add-to-cart-btn');
        if (!addToCartBtn) return;

        const productId = addToCartBtn.dataset.productId;

        const select = document.querySelector(
          `.js-product-num-select-${productId}`
        );

        const quantity = Number(select.value);

        getCart();
        addToCart(productId, quantity);

        updateAddToCartText(productId);

        document.querySelector('.js-cart-icon-quantity')
          .innerText = calcCartQuantity();
      });
    }
/* ============================
   ADD-TO-CART FEEDBACK
   ============================ */

function updateAddToCartText(productId) {

  const addToCartText =
    document.querySelectorAll(`.js-add-to-cart-text-${productId}`);

  addToCartText.forEach(text => {
    text.style.opacity = 1;

    let timer;

    if (timer) {
      clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        text.style.opacity = 0;
      }, 1000);
    }
  });
}
