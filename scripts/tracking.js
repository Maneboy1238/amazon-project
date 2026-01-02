/* ============================
   IMPORTS
   ============================ */

// Day.js for date calculations and formatting
import dayjs, { Dayjs } from "dayjs";

// Orders data
import { orders } from "../data/order";

// Product data and helpers
import { products, getProduct, loadProductsFetch } from "../data/products";

// Loader class for showing loading state
import { loader } from "./loader";


/* ============================
   PAGE ENTRY POINT
   ============================ */

/*
  Loads all products first,
  then renders the tracking page.
*/
async function loadPage() {
  await loadProductsFetch();
  renderTrackingPage();
}

// Run page load
loadPage();


/* ============================
   TRACKING PAGE RENDER LOGIC
   ============================ */

function renderTrackingPage() {

  /* ----------------------------
     READ URL PARAMETERS
     ---------------------------- */

  /*
    The tracking page depends on URL params:
    - productId → identifies which product is being tracked
    - orderId   → identifies which order it belongs to
  */
  const url = new URL(window.location.href);

  const productId = url.searchParams.get('productId');
  const orderId = url.searchParams.get('orderId');


  /* ----------------------------
     FIND MATCHING DATA
     ---------------------------- */

  // Get full product details
  const matchingProduct = getProduct(productId);

  // Find the order that matches the orderId
  const matchingOrder = orders.find(order => order.id === orderId);

  /*
    From the order’s products array,
    find the specific product being tracked
  */
  const matchingOrderProduct =
    matchingOrder.products.find(
      orderProducts => orderProducts.productId === productId
    );


  /* ----------------------------
     DATE CALCULATIONS
     ---------------------------- */

  // Format estimated delivery date (human readable)
  const productArrivalDate =
    dayjs(matchingOrderProduct.estimatedDeliveryTime)
      .format('dddd, MMMM D');

  // Current time
  const currentTime = dayjs();

  // Order placed time
  const orderTime = dayjs(matchingOrder.orderTime);

  // Estimated delivery time
  const deliveryTime =
    dayjs(matchingOrderProduct.estimatedDeliveryTime);


  /* ----------------------------
     DELIVERY PROGRESS LOGIC
     ---------------------------- */

  /*
    Calculate delivery progress as a percentage:
    - How far current time is between order time and delivery time
  */
  let progress = Math.round(
    ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100
  );

  /*
    Determine delivery status based on progress:
    < 50%   → preparing
    < 99%   → shipped
    >= 99%  → delivered
  */
  let status = '';

  if (progress < 50) {
    status = 'preparing';
  } else if (progress < 99) {
    status = 'shipped';
  } else {
    status = 'delivered';
  }


  /* ----------------------------
     LOADER SETUP
     ---------------------------- */

  const loaderInstance = new loader('wrapper');
  loaderInstance.showLoader();


  /* ----------------------------
     RENDER TRACKING UI
     ---------------------------- */

  setTimeout(() => {

    /*
      Tracking page HTML.
      Displays:
      - delivery date
      - product info
      - quantity
      - product image
      - progress bar + labels
    */
    const trackingPageHTML = `
      <div class="order-tracking">

        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${productArrivalDate}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingOrderProduct.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label-preparing">
            Preparing
          </div>
          <div class="progress-label-shipped">
            Shipped
          </div>
          <div class="progress-label-delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>

      </div>
    `;

    // Inject HTML into the page
    document.querySelector('.main').innerHTML = trackingPageHTML;

    // Hide loader once UI is ready
    loaderInstance.hideLoader();


    /* ----------------------------
       PROGRESS BAR UPDATE
       ---------------------------- */

    // Set progress bar width
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${progress}%`;

    // Highlight the current delivery status
    document
      .querySelector(`.progress-label-${status}`)
      .classList.toggle('current-status');

  }, 500);
}
