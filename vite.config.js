import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'amazon.html',
        orders: 'orders.html',
        tracking: 'tracking.html',
        checkout: 'checkout.html'
      }
    }
  }
});
