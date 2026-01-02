/* ============================
   IMPORTS
   ============================ */

// Orders data
import { orders } from '../data/order.js';

// Products and product helpers
import { getProduct, products, loadProductsFetch } from '../data/products.js';

// Cart-related logic
import {
  getCart,
  cart,
  getMatchingCartItemsWithOrder,
  addToCart,
  calcCartQuantity
} from '../data/cart.js';

// Delivery options (used elsewhere in project)
import { getDeliveryOption } from '../data/deliveryoptions.js';

// Utility for formatting money
import formatCurrency from './utils/utility.js';

// Loader class
import { loader } from './loader.js';

// Search helper (creates URL search params)
import { triggerSearch } from './amazon.js';

// Date formatting library
import dayjs from 'dayjs';


/* ============================
   PAGE ENTRY POINT
   ============================ */

/*
  Loads products first (async),
  then renders the order summary page.
*/
async function loadPage() {
  await loadProductsFetch();
  renderOrderSummary();
}

loadPage();


/* ============================
   MAIN ORDER RENDER FUNCTION
   ============================ */

function renderOrderSummary() {

  /* ----------------------------
     CART INITIALIZATION
     ---------------------------- */

  // Sync cart from localStorage
  getCart();

  /*
    availableOrder represents what will be displayed:
    - Initially: all orders
    - After search: filtered orders with matching products only
  */
  let availableOrder = orders;


  /* ----------------------------
     CART ICON UPDATE
     ---------------------------- */

  const carrtIcon = document.querySelector('.js-cart-quantity');
  carrtIcon.innerHTML = calcCartQuantity();


  /* ----------------------------
     LOADER SETUP
     ---------------------------- */

  const loaderInstance = new loader('wrapper');
  loaderInstance.showLoader();


  /* ----------------------------
     SEARCH ELEMENTS
     ---------------------------- */

  const searchInput = document.querySelector('.js-search-bar');
  const searchBtn = document.querySelector('.js-search-btn');


  /* ============================
     SEARCH EVENT LISTENERS
     ============================ */

  /*
    Clicking the search button:
    - Updates URL with ?search=value
    - Page reloads automatically
  */
  searchBtn.addEventListener('click', () => {
    triggerSearch('orders', searchInput.value);
  });

  /*
    Pressing ENTER inside the search input
    triggers the same search behavior
  */
  /*if (searchInput) {
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'enter') {
      triggerSearch('orders', searchInput.value);
    }
  });

  }
  */
  /* ============================
     SEARCH FILTER LOGIC
     ============================ */

  function renderSearch() {

    // Read the current URL
    const url = new URL(window.location.href);

    // Get ?search value from URL
    const searchQuery = url.searchParams.get('search');

    /*
      If there is NO search query:
      - Do nothing
      - availableOrder remains as ALL orders
    */
    if (!searchQuery) return orders;

    const lowerSearch = searchQuery.toLowerCase();

    /*
      We loop through all orders and:
      - Keep ONLY products that match the search
      - Drop orders with zero matching products
    */
    availableOrder = orders
      .map(order => {

        // Filter products inside each order
        const matchingProducts = order.products.filter(orderProduct => {
          const product = getProduct(orderProduct.productId);
          return product.name.toLowerCase().includes(lowerSearch);
        });

        // If this order has no matching products, discard it
        if (matchingProducts.length === 0) return null;

        // Return a NEW order object with filtered products
        return {
          ...order,
          products: matchingProducts
        };
      })
      .filter(Boolean); // removes null orders

    // Keep search input in sync with URL
    searchInput.value = searchQuery;
  }

  // Run search logic on page load
  renderSearch();


  /* ============================
     ORDER DISPLAY LOGIC
     ============================ */

  function displayAvailableOrder(orders) {

    setTimeout(() => {

      let orderSummary = '';

      /* ----------------------------
         EMPTY STATE
         ---------------------------- */

      if (orders.length <= 0) {
        orderSummary = `
          <div class="empty-orders-container">
            <i class="fas fa-clipboard-list empty-orders-icon"></i>
            <p class="empty-orders-text">No Order Found</p>
          </div>
        `;
      }


      /* ----------------------------
         ORDERS LOOP
         ---------------------------- */

      orders.forEach(order => {

        let productsHtml = '';
        let orderId = order.id;

        const orderTime = dayjs(order.orderTime)
          .format('MMMM D');

        const totalDeliveryAmount =
          formatCurrency(order.totalCostCents);


        /* ----------------------------
           PRODUCTS INSIDE EACH ORDER
           ---------------------------- */

        order.products.forEach(orderProducts => {

          const productId = orderProducts.productId;
          const matchingProduct = getProduct(productId);
          const productQuantity = orderProducts.quantity;

          const productArrivalDate =
            dayjs(orderProducts.estimatedDeliveryTime)
              .format('MMMM D');

          productsHtml += `
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>

              <div class="product-delivery-date">
                Arriving on: ${productArrivalDate}
              </div>

              <div class="product-quantity">
                Quantity: ${productQuantity}
              </div>

              <button
                class="buy-again-button button-primary js-buy-again-btn"
                data-product-id="${productId}">
                <img class="buy-again-icon"
                     src="images/icons/buy-again.png">
                <span class="buy-again-message">
                  Buy it again
                </span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?productId=${productId}&orderId=${orderId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          `;
        });


        /* ----------------------------
           ORDER CONTAINER
           ---------------------------- */

        orderSummary += `
          <div class="order-container">

            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">
                    Order Placed:
                  </div>
                  <div>${orderTime}</div>
                </div>

                <div class="order-total">
                  <div class="order-header-label">
                    Total:
                  </div>
                  <div>$${totalDeliveryAmount}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">
                  Order ID:
                </div>
                <div>${orderId}</div>
              </div>
            </div>

            <div class="order-details-grid">
              ${productsHtml}
            </div>
          </div>
        `;
      });

      // Inject HTML into the page
      document.querySelector('.orders-grid').innerHTML = orderSummary;

      // Hide loader after rendering
      loaderInstance.hideLoader();

    }, 500);
  }

  // Initial display
  displayAvailableOrder(availableOrder);


  /* ============================
     BUY-AGAIN EVENT DELEGATION
     ============================ */

  const orderContainer = document.querySelector('.orders-grid');

  orderContainer.addEventListener('click', (e) => {

    const buyAgainBtn = e.target.closest('.js-buy-again-btn');
    if (!buyAgainBtn) return;

    const { productId } = buyAgainBtn.dataset;

    addToCart(productId, 1);

    // Redirect user to checkout
    window.location.href = 'checkout.html';
  });
}
