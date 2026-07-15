"use client";

import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "Placeholder Gaming Mouse", price: 59, category: "Gaming Mouse", color: "sky", shape: "mouse" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const queryMatch = `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase());
      return queryMatch;
    });
  }, [query]);

  const addToCart = (id: number) => setCart((items) => [...items, id]);
  const toggleFavorite = (id: number) =>
    setFavorites((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );

  return (
    <main>
      <div className="announcement">
        <span>Free shipping on orders over $75</span>
        <span aria-hidden="true">✦</span>
        <span>Everything here is currently a placeholder</span>
        <span aria-hidden="true">✦</span>
        <span>New weirdness every Friday</span>
      </div>

      <header className="siteHeader">
        <a className="logo" href="#top" aria-label="COOLSTUFF home">COOL<span>STUFF</span></a>
        <nav aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#newsletter">Updates</a>
        </nav>
        <div className="utilities">
          <button className="iconButton" onClick={() => setSearchOpen((open) => !open)} aria-label="Toggle search" aria-expanded={searchOpen}>⌕</button>
          <button className="cartButton" aria-label={`Cart with ${cart.length} items`} onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}>
            Bag <span>{cart.length}</span>
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="searchBar">
          <label htmlFor="product-search">Find a cool thing</label>
          <input id="product-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “Gaming” or “Lamp”" />
          <button onClick={() => { setQuery(""); setSearchOpen(false); }} aria-label="Close search">×</button>
        </div>
      )}

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow"><span>Gaming gear only</span> / Drop 001</p>
          <h1>One seriously<br />cool mouse.</h1>
          <p className="heroText">A single placeholder gaming mouse with speed, style, and absolutely no unnecessary catalog clutter.</p>
          <a className="primaryCta" href="#shop">See the mouse <span aria-hidden="true">↘</span></a>
        </div>
        <div className="heroArt" aria-label="Abstract colorful placeholder object">
          <span className="sticker stickerOne">NO BORING<br />OBJECTS</span>
          <span className="heroShape shapeBack" />
          <span className="heroShape shapeFront" />
          <span className="spark sparkOne">✦</span>
          <span className="spark sparkTwo">✦</span>
          <span className="sticker stickerTwo">100%<br />PLACEHOLDER</span>
        </div>
      </section>

      <section className="shopSection" id="shop">
        <div className="sectionTop">
          <div>
            <p className="eyebrow">Browse the collection</p>
            <h2>Pick your flavor.</h2>
          </div>
        </div>

        <div className="productGrid single">
          {visibleProducts.map((product) => {
            const isFavorite = favorites.includes(product.id);
            return (
              <article className="productCard" key={product.id}>
                <div className={`productVisual ${product.color}`}>
                  <span className="placeholderTag">PLACEHOLDER</span>
                  <span className={`productShape ${product.shape}`} aria-hidden="true" />
                  <button className={`favorite ${isFavorite ? "selected" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label={`${isFavorite ? "Remove" : "Add"} ${product.name} ${isFavorite ? "from" : "to"} favorites`} aria-pressed={isFavorite}>{isFavorite ? "♥" : "♡"}</button>
                </div>
                <div className="productInfo">
                  <div>
                    <p>{product.category}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <strong>${product.price}.00</strong>
                </div>
                <button className="addButton" onClick={() => addToCart(product.id)}>Add to bag <span>＋</span></button>
              </article>
            );
          })}
        </div>
        {visibleProducts.length === 0 && <p className="emptyState">Nothing that cool yet. Try another search.</p>}
      </section>

      <section className="gamingPromo" aria-labelledby="gaming-title">
        <div className="gamingCopy">
          <p className="eyebrow">New side quest unlocked</p>
          <h2 id="gaming-title">Player one<br />entered the shop.</h2>
          <p>One mouse. One mission. A clean gaming setup with no filler and no distractions. Still a placeholder. Already overpowered.</p>
          <button onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}>Shop the mouse <span>→</span></button>
        </div>
        <div className="promoConsole" aria-hidden="true">
          <span className="consoleScreen"><i>COOL<br />MODE</i></span>
          <span className="consoleDpad">＋</span>
          <span className="consoleButtons">● ●</span>
          <b className="promoSticker">READY<br />PLAYER<br />COOL</b>
        </div>
      </section>

      <section className="manifesto" id="about">
        <div className="manifestoBadge">SMALL<br />SHOP<br />BIG<br />ENERGY</div>
        <div>
          <p className="eyebrow">Our extremely serious manifesto</p>
          <h2>Gaming is too fun<br />for boring gear.</h2>
        </div>
        <p>Every setup deserves gear with personality. Once these placeholders become real products, they’ll make desks brighter, sessions smoother, and loadouts unmistakably yours.</p>
      </section>

      <section className="newsletter" id="newsletter">
        <div>
          <p className="eyebrow">Inbox, but make it fun</p>
          <h2>Get the drop.</h2>
          <p>New finds, low-stock alerts, and zero boring emails.</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label className="srOnly" htmlFor="email">Email address</label>
          <input id="email" type="email" placeholder="you@coolmail.com" required />
          <button type="submit">I’m in <span>↗</span></button>
        </form>
      </section>

      <footer>
        <a className="logo footerLogo" href="#top">COOL<span>STUFF</span></a>
        <p>Placeholder products. Very real vibes. © 2026</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
