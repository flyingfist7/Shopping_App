import React, { createContext, useState, useContext, useEffect } from 'react';

const Ctx = createContext();

export const useCtx = () => useContext(Ctx);

export const Store = ({ children }) => {
  // Init state
  const [cart, setCart] = useState(() => {
    const s = localStorage.getItem('shop-data');
    return s ? JSON.parse(s) : [];
  });


  useEffect(() => {
    localStorage.setItem('shop-data', JSON.stringify(cart));
  }, [cart]);

  const add = (p) => {
    const old = cart.find(x => x.id === p.id);
    if (old) {
      if (old.qty < p.stock) {
        setCart(cart.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      } else {
        alert(`Stock limit: ${p.stock}`);
      }
    } else {
      if (p.stock > 0) {
        setCart([...cart, { ...p, qty: 1 }]);
      } else {
        alert("No stock!");
      }
    }
  };

  const chg = (id, n) => {
    setCart(cart.map(x => {
      if (x.id === id) {
        if (n > 0 && x.qty >= x.stock) {
           alert('Max reached!');
           return x; 
        }
        return { ...x, qty: Math.max(1, x.qty + n) };
      }
      return x;
    }));
  };

  const rem = (id) => {
    setCart(cart.filter(x => x.id !== id));
  };

  const tot = cart.reduce((a, b) => a + (b.price * b.qty), 0);

  return (
    <Ctx.Provider value={{ cart, add, chg, rem, tot }}>
      {children}
    </Ctx.Provider>
  );
};
