import React from 'react';

const Cart = ({ cart, changeQuantity, changeDiscount }) => {
  console.log("cart ", cart);
  return (
    <div>
      Cart
      <button onClick={() => changeDiscount(30, cart[0].product.id)} >Discount</button>
      <button onClick={() => changeQuantity(2, cart[0].product.id)} >Quantity</button>
    </div>
  );
};

export default Cart;
