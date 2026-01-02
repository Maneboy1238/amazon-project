import{g as k,f as p,a as w,l as b}from"./loader-PgPTA5uh.js";import{b as v,c as q,g as I,r as D,u as L,d as P,l as Q}from"./cart-D2NTMRha.js";import{d as T,a as A}from"./dayjs.min-KagsM5mB.js";const f=[{id:"1",deliveryDays:7,priceCents:0},{id:"2",deliveryDays:3,priceCents:499},{id:"3",deliveryDays:1,priceCents:999}];function C(d){return f.find(s=>s.id===d)||f[0]}function j(d){let r=T(),s="",y=d.deliveryDays;for(;y>0;){r=r.add(1,"days");const m=r.day();m!==0&&m!==6&&y--,s=r.format("dddd MMMM, D")}return s}function $(){let d="",r=0,s=0,y,m;v.forEach(a=>{const o=[],c=[],E=k(a.productId);r+=E.priceCents*a.quantity;const O=C(a.deliveryOptionId);s+=O.priceCents,o.push(a.productId),c.push(a.deliveryOptionId);for(let u=0;u<o;u++)y=o[u];for(let u=0;u<c;u++)m=c[u]});const t=r+s,i=t*.1,e=t+i,n=q();d+=`
              <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${n}):</div>
            <div class="payment-summary-money">$${p(r)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-product-shipping-${y}-${m}">$${p(s)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${p(t)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${p(i)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${p(e)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `,document.querySelector(".payment-summary").innerHTML=d,document.querySelector(".js-place-order").addEventListener("click",async()=>{if(!v||v.length<=0){alert("Make sure you have items in your cart before placing an order");return}const o=await(await fetch("https://supersimplebackend.dev/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cart:v})})).json();A(o),localStorage.setItem("cart",JSON.stringify([])),window.location.href="orders.html"})}function g(){I();let r=`
    <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-checkout-items-quantity"
            href="amazon.html">${q()} items</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
`;document.querySelector(".js-checkout-header").innerHTML=r}const S=new w("wrapper");S.showLoader();setTimeout(()=>{h()},500);function h(){let d="";v.length<=0&&(d=`
     <div class="no-cartItem-found-container">
        <span><i class="fa-solid fa-cart-shopping"></i>
        </span>
        <p class="no-item-found-text">No item found in Cart</p>
    </div>
  `),v.forEach(t=>{let i=t.productId,e=k(i);const n=C(t.deliveryOptionId),l=j(n);d+=`
        <div class="cart-item-container js-cart-item-container js-product-container-${e.id}">
            <div class="delivery-date">
              Delivery date: ${l}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${e.image}">

              <div class="cart-item-details">
                <div class="product-name js-product-name-${e.id}">
                  ${e.name}
                </div>
                <div class="product-price js-product-price-${e.id}">
                  $${p(e.priceCents)}
                </div>
                <div class="product-quantity js-iproduct-quantity-${e.id}">
                  <span>
                    Quantity: <span class="quantity-label js-product-quantity-${e.id}">${t.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-product-update-btn" data-product-id="${e.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${e.id}">
                  <span class="save-quantity-link link-primary js-save-product-quantity-${e.id}">
                  save 
                  </span>
                  <span class="delete-quantity-link link-primary js-product-delete-btn js-delete-link-${e.id}"
                  data-product-id="${t.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
              ${r(e,t)}
              </div>
            </div>
          </div>
        `}),document.querySelector(".js-checkout-product-container").innerHTML=d,S.hideLoader();function r(t,i){let e="";return f.forEach(n=>{const l=j(n),a=n.priceCents===0?"FREE":`$${p(n.priceCents)} -`,o=n.id===i.deliveryOptionId;e+=`
      <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input js-input-delivery-option js-input-delivery-option-${t.id}-${n.id}"
                    name="delivery-option-${t.id}" 
                    data-product-id="${t.id}" data-delivery-option-id="${n.id}" ${o?"checked":""}>
                  <div>
                    <div class="delivery-option-date">
                      ${l}
                    </div>
                    <div class="delivery-option-price">
                      ${a} Shipping
                    </div>
                  </div>
                </div>
      `}),e}document.querySelectorAll(".js-product-delete-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.productId;D(i),document.querySelectorAll(`.js-product-container-${i}`),h(),$(),g()})}),document.querySelectorAll(".js-product-update-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.productId;document.querySelectorAll(`js-product-container-${i}`);const e=document.querySelectorAll(`.js-save-product-quantity-${i}`),n=document.querySelectorAll(`.js-product-quantity-${i}`),l=document.querySelectorAll(`.js-quantity-input-${i}`);t.style.display="none",n.forEach(a=>a.style.display="none"),l.forEach(a=>a.style.display="initial"),e.forEach(a=>{a.style.display="initial",a.addEventListener("click",()=>{let o=0;l.forEach(c=>{o=Number(c.value),c.style.display="none"}),L(i,o),n.forEach(c=>c.style.display="initial"),h(),$(),g()})})})}),document.querySelectorAll(".delivery-option-input").forEach(t=>{t.addEventListener("click",()=>{const{productId:i,deliveryOptionId:e}=t.dataset;P(e,i),h(),$()})})}async function M(){try{await Promise.all([b(),Q()])}catch(d){console.log(d),console.log("unexpected error")}g(),h(),$()}M();
