import {Link, useLoaderData} from 'react-router';
import {Money} from '@shopify/hydrogen';
import type {Route} from './+types/_index';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';

export const meta: Route.MetaFunction = () => [
  {title: 'COOLSTUFF | Gaming Mouse'},
  {
    name: 'description',
    content: 'One seriously cool gaming mouse. Built for quick clicks and clean setups.',
  },
];

export async function loader({context}: Route.LoaderArgs) {
  const {products} = await context.storefront.query(GAMING_MOUSE_QUERY, {
    cache: context.storefront.CacheShort(),
  });

  return {
    product: products.nodes[0] ?? null,
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
  };
}

export default function Homepage() {
  const {product, isShopLinked} = useLoaderData<typeof loader>();
  const variant = product?.selectedOrFirstAvailableVariant;

  return (
    <div className="coolstuff-home">
      {!isShopLinked && (
        <div className="store-status" role="status">
          Demo mode — link your Shopify store to sell your own gaming mouse.
        </div>
      )}

      <section className="hero" id="shop">
        <div className="hero-copy">
          <p className="eyebrow">ONE PRODUCT. ZERO DISTRACTIONS.</p>
          <h1>One seriously<br /><span>cool mouse.</span></h1>
          <p className="hero-intro">
            Quick clicks, clean lines, and the exact amount of RGB your desk deserves.
          </p>
          <div className="hero-actions">
            <a className="chunky-button coral" href="#product">Meet the mouse ↓</a>
            <span className="mini-note">No mystery boxes. Promise.</span>
          </div>
        </div>
        <MouseArt />
      </section>

      <section className="ticker" aria-label="Product highlights">
        <span>PIXEL-PERFECT AIM</span><b>✦</b><span>LIGHTWEIGHT SHELL</span><b>✦</b><span>VERY CLICKY</span>
      </section>

      <section className="product-section" id="product">
        <div className="product-art-card"><MouseArt compact /></div>
        <div className="product-copy">
          <p className="eyebrow">THE WHOLE SHOP</p>
          <h2>{product?.title ?? 'Placeholder Gaming Mouse'}</h2>
          <p className="product-description">
            {product?.description || 'A fast, lightweight gaming mouse placeholder with six buttons, a precise sensor, and a soft glow underneath.'}
          </p>
          <ul className="spec-list">
            <li><b>01</b><span>Feather-light body</span></li>
            <li><b>02</b><span>Adjustable DPI</span></li>
            <li><b>03</b><span>Six programmable buttons</span></li>
          </ul>
          <div className="buy-row">
            <strong className="price">
              {variant?.price ? <Money data={variant.price} /> : '$59.00'}
            </strong>
            {variant ? (
              <BuyButton
                merchandiseId={variant.id}
                available={variant.availableForSale}
                productTitle={product?.title ?? 'Gaming Mouse'}
                variantTitle={variant.title}
              />
            ) : (
              <button className="chunky-button violet" disabled>Link store to buy</button>
            )}
          </div>
          {product?.handle && <Link className="text-link" to={`/products/${product.handle}`}>Full product details →</Link>}
        </div>
      </section>

      <section className="why-section" id="about">
        <p className="eyebrow">WHY COOLSTUFF?</p>
        <h2>Because your desk should be fun.</h2>
        <div className="reason-grid">
          <article><span>⚡</span><h3>FAST</h3><p>Built to keep up when the match gets loud.</p></article>
          <article><span>✺</span><h3>CLEAN</h3><p>No photos, no clutter, just one good mouse.</p></article>
          <article><span>♥</span><h3>COOL</h3><p>Looks equally good in-game and off-camera.</p></article>
        </div>
      </section>
    </div>
  );
}

function BuyButton({merchandiseId, available, productTitle, variantTitle}: {
  merchandiseId: string;
  available: boolean;
  productTitle: string;
  variantTitle: string;
}) {
  const {open} = useAside();
  return (
    <AddToCartButton
      disabled={!available}
      lines={[{merchandiseId, quantity: 1}]}
      onClick={() => open('cart')}
      analytics={{products: [{productGid: merchandiseId, name: productTitle, variantName: variantTitle}]}}
    >
      <span className="chunky-button violet">{available ? 'Add to cart →' : 'Sold out'}</span>
    </AddToCartButton>
  );
}

function MouseArt({compact = false}: {compact?: boolean}) {
  return (
    <div className={`mouse-stage${compact ? ' compact' : ''}`} aria-label="Stylized gaming mouse illustration" role="img">
      <span className="spark spark-one">✦</span><span className="spark spark-two">✦</span>
      <div className="mouse-cord" />
      <div className="mouse-body">
        <div className="mouse-split" /><div className="mouse-wheel" />
        <div className="mouse-logo">CS</div><div className="mouse-glow" />
      </div>
      {!compact && <span className="art-label">100% PLACEHOLDER<br />100% GAME READY</span>}
    </div>
  );
}

const GAMING_MOUSE_QUERY = `#graphql
  query GamingMouse($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        description
        selectedOrFirstAvailableVariant {
          id
          title
          availableForSale
          price { amount currencyCode }
        }
      }
    }
  }
` as const;
