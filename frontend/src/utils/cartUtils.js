const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

const updateItemQty = (cartItems, updatedItem, shouldOverride) => {
  console.log("overriding?", shouldOverride);
  return cartItems.map((item) =>
    item._id === updatedItem._id
      ? {
          ...item,
          qty: shouldOverride ? updatedItem.qty : item.qty + updatedItem.qty,
        }
      : item
  );
};

function updateCart(state) {
  //  items price calculation
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //  shipping price calculation (free if price over 100)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  //  tax calculation
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  //  total price calculation
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  //  total items qty calculation
  state.itemsQty = state.cartItems.reduce((acc, item) => acc + item.qty, 0);

  //  save to local storage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
}

export { updateCart, updateItemQty };
