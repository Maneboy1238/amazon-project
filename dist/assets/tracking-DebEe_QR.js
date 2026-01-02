import{l as h,g as f,a as y}from"./loader-PgPTA5uh.js";/* empty css                      */import{o as P,d as s}from"./dayjs.min-KagsM5mB.js";async function T(){await h(),b()}T();function b(){const a=new URL(window.location.href),o=a.searchParams.get("productId"),p=a.searchParams.get("orderId"),t=f(o),c=P.find(r=>r.id===p),d=c.products.find(r=>r.productId===o),g=s(d.estimatedDeliveryTime).format("dddd, MMMM D"),m=s(),n=s(c.orderTime),u=s(d.estimatedDeliveryTime);let i=Math.round((m-n)/(u-n)*100),e="";i<50?e="preparing":i<99?e="shipped":e="delivered";const l=new y("wrapper");l.showLoader(),setTimeout(()=>{const r=`
      <div class="order-tracking">

        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${g}
        </div>

        <div class="product-info">
          ${t.name}
        </div>

        <div class="product-info">
          Quantity: ${d.quantity}
        </div>

        <img class="product-image" src="${t.image}">

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
    `;document.querySelector(".main").innerHTML=r,l.hideLoader();const v=document.querySelector(".progress-bar");v.style.width=`${i}%`,document.querySelector(`.progress-label-${e}`).classList.toggle("current-status")},500)}
