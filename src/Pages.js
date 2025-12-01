import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCtx } from './Context'; 

const db = [
  { id: 1, name: "Headphones", price: 1999, stock: 10, img: "🎧" },
  { id: 2, name: "Smart Watch", price: 2999, stock: 5, img: "⌚" },
  { id: 3, name: "Mouse", price: 499, stock: 15, img: "🖱️" },
  { id: 4, name: "Keyboard", price: 1599, stock: 8, img: "⌨️" },
  { id: 5, name: "Laptop", price: 59999, stock: 3, img: "💻" },
  { id: 6, name: "Monitor", price: 12999, stock: 7, img: "🖥️" },
  { id: 7, name: "Tablet", price: 25999, stock: 12, img: "📱" },
  { id: 8, name: "Speaker", price: 1499, stock: 20, img: "🔈" },
  { id: 9, name: "Camera", price: 35000, stock: 4, img: "📷" },
  { id: 10, name: "Controller", price: 2499, stock: 10, img: "🎮" },
  // NEW ITEMS ADDED BELOW
  { id: 11, name: "Hard Drive", price: 4500, stock: 18, img: "💾" },
  { id: 12, name: "Power Bank", price: 999, stock: 25, img: "🔋" },
];

export const Page1 = () => {
  const { add, cart } = useCtx(); 
  const nav = useNavigate();
  const n = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <div className="container">
      <header className="shop-header">
        <h1>My Store</h1>
        <button className="cart-btn" onClick={() => nav('/cart')}>
           🛒 Cart ({n})
        </button>
      </header>
      <div className="product-grid">
        {db.map((p) => (
          <div key={p.id} className="card product-card">
            <div className="icon">{p.img}</div>
            <h3>{p.name}</h3>
            <p style={{color: '#666', fontSize: '0.9rem'}}>Stock: {p.stock}</p>
            <p className="price">₹{p.price.toLocaleString()}</p>
            <button className="add-btn" onClick={() => add(p)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Page2 = () => {
  const { cart, chg, rem, tot } = useCtx(); 
  const nav = useNavigate();

  return (
    <div className="container">
      <header className="cart-header">
        <h1>Your Cart</h1>
        <button className="back-btn" onClick={() => nav('/')}>← Back</button>
      </header>
      
      {cart.length === 0 ? <div className="empty-msg">Empty!</div> : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((x) => (
              <div key={x.id} className="cart-item">
                <div className="item-left">
                  <span className="cart-icon">{x.img}</span>
                  <div>
                    <h3>{x.name}</h3>
                    <small>₹{x.price.toLocaleString()}</small>
                  </div>
                </div>
                <div className="controls">
                  <button onClick={() => chg(x.id, -1)}>-</button>
                  <span>{x.qty}</span>
                  <button onClick={() => chg(x.id, 1)}>+</button>
                </div>
                <div className="item-right">
                  <p className="subtotal">₹{(x.price * x.qty).toLocaleString()}</p>
                  <button className="remove-btn" onClick={() => rem(x.id)}>×</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total: ₹{tot.toLocaleString()}</h2>
            <button className="checkout-btn" onClick={() => alert('Done!')}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};