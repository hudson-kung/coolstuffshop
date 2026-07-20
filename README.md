# COOLSTUFF Hydrogen storefront

A Shopify Hydrogen + Oxygen storefront for one gaming mouse. The storefront uses live Shopify product, price, availability, cart, and checkout data when linked to a store, and Shopify's mock catalog for local development before linking.

## Local development

Requires Node.js 22 or 24.

```bash
npm install
copy .env.example .env
npm run dev
```

## Link to Shopify and Oxygen

```bash
npx shopify hydrogen link
npx shopify hydrogen env pull
npm run build
npx shopify hydrogen deploy
```

Import `shopify-products.csv` in Shopify Admin under **Products → Import** to create the placeholder gaming mouse, then replace its copy, inventory, and price as needed.
