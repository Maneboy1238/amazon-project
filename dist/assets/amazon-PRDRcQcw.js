import{b as g,a as h,p as d}from"./loader-PgPTA5uh.js";import{g as v,a as y,c as f}from"./cart-D2NTMRha.js";g(b);function p(e,o){window.location.href=`${e}.html?search=${o}`}function b(){v();let e=d;const o=new h("wrapper"),t=document.querySelector(".js-search-bar"),n=document.querySelector(".js-search-button");n&&n.addEventListener("click",()=>{p("amazon",t.value)}),t.addEventListener("keydown",c=>{c.key==="Enter"&&p("amazon",t.value)});function s(){o.showLoader();const r=new URL(window.location.href).searchParams.get("search");r&&(t.value=r,e=d.filter(i=>i.name.toUpperCase().includes(r.toUpperCase())),l(e))}s();function l(c){let r="";o.showLoader(),setTimeout(()=>{c.length<=0&&(r=`
          <div class="icon-container">
            <span>
              <i class="fa-solid fa-box-open"></i>
            </span>
            <p class="no-products-text">No Products Found</p>
            <button class="view-all-products-btn">
              View all Products
            </button>
          </div>
        `),c.forEach(a=>{r+=`
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image" src="${a.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${a.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                   src="${a.getStarUrl()}">
              <div class="product-rating-count link-primary">
                ${a.rating.count}
              </div>
            </div>

            <div class="product-price">
              $ ${a.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-product-num-select-${a.id}">
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

            ${a.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-add-to-cart-text-${a.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button
              class="add-to-cart-button button-primary js-add-to-cart-btn"
              data-product-id="${a.id}">
              Add to Cart
            </button>
          </div>
        `});const u=document.querySelector(".js-all-products-container");u&&(u.innerHTML=r),o.hideLoader()},500);const i=document.querySelector(".js-cart-icon-quantity");i&&(i.innerText=f())}l(e)}const m=document.querySelector(".js-all-products-container");m&&m.addEventListener("click",e=>{e.target.matches(".view-all-products-btn")&&(window.location.href="amazon.html",visibleProducts=d,renderProducts(visibleProducts));const o=e.target.closest(".js-add-to-cart-btn");if(!o)return;const t=o.dataset.productId,n=document.querySelector(`.js-product-num-select-${t}`),s=Number(n.value);v(),y(t,s),w(t),document.querySelector(".js-cart-icon-quantity").innerText=f()});function w(e){document.querySelectorAll(`.js-add-to-cart-text-${e}`).forEach(t=>{t.style.opacity=1;let n;n?clearTimeout(n):n=setTimeout(()=>{t.style.opacity=0},1e3)})}export{p as t};
