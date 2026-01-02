import{l as $,a as I,g as p,f as C}from"./loader-PgPTA5uh.js";/* empty css                      */import{o as i,d as g}from"./dayjs.min-KagsM5mB.js";import{g as M,c as S,a as L}from"./cart-D2NTMRha.js";import{t as T}from"./amazon-PRDRcQcw.js";async function k(){await $(),q()}k();function q(){M();let n=i;const y=document.querySelector(".js-cart-quantity");y.innerHTML=S();const l=new I("wrapper");l.showLoader();const u=document.querySelector(".js-search-bar");document.querySelector(".js-search-btn").addEventListener("click",()=>{T("orders",u.value)});function h(){const r=new URL(window.location.href).searchParams.get("search");if(!r)return i;const t=r.toLowerCase();n=i.map(a=>{const d=a.products.filter(o=>p(o.productId).name.toLowerCase().includes(t));return d.length===0?null:{...a,products:d}}).filter(Boolean),u.value=r}h();function f(e){setTimeout(()=>{let r="";e.length<=0&&(r=`
          <div class="empty-orders-container">
            <i class="fas fa-clipboard-list empty-orders-icon"></i>
            <p class="empty-orders-text">No Order Found</p>
          </div>
        `),e.forEach(t=>{let a="",d=t.id;const o=g(t.orderTime).format("MMMM D"),v=C(t.totalCostCents);t.products.forEach(c=>{const s=c.productId,m=p(s),b=c.quantity,w=g(c.estimatedDeliveryTime).format("MMMM D");a+=`
            <div class="product-image-container">
              <img src="${m.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${m.name}
              </div>

              <div class="product-delivery-date">
                Arriving on: ${w}
              </div>

              <div class="product-quantity">
                Quantity: ${b}
              </div>

              <button
                class="buy-again-button button-primary js-buy-again-btn"
                data-product-id="${s}">
                <img class="buy-again-icon"
                     src="images/icons/buy-again.png">
                <span class="buy-again-message">
                  Buy it again
                </span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?productId=${s}&orderId=${d}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          `}),r+=`
          <div class="order-container">

            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">
                    Order Placed:
                  </div>
                  <div>${o}</div>
                </div>

                <div class="order-total">
                  <div class="order-header-label">
                    Total:
                  </div>
                  <div>$${v}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">
                  Order ID:
                </div>
                <div>${d}</div>
              </div>
            </div>

            <div class="order-details-grid">
              ${a}
            </div>
          </div>
        `}),document.querySelector(".orders-grid").innerHTML=r,l.hideLoader()},500)}f(n),document.querySelector(".orders-grid").addEventListener("click",e=>{const r=e.target.closest(".js-buy-again-btn");if(!r)return;const{productId:t}=r.dataset;L(t,1),window.location.href="checkout.html"})}
