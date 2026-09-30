import { useCart } from "../context/CartContext";

function CartItem({ item }) {

  const { dispatch } = useCart();

  const increaseQuantity = () => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: item.id,
    });
  };

  const decreaseQuantity = () => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: item.id,
    });
  };

  const removeItem = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item.id,
    });
  };

  return (
    <div className="cart-item">

      <div className="cart-product">

        <span className="cart-product-icon">
          {item.image}
        </span>

        <div>
          <h3>{item.name}</h3>

          <p>
            ₹{item.price.toLocaleString("en-IN")}
          </p>
        </div>

      </div>

      <div className="quantity-control">

        <button onClick={decreaseQuantity}>
          −
        </button>

        <span>{item.quantity}</span>

        <button onClick={increaseQuantity}>
          +
        </button>

      </div>

      <div className="item-total">

        ₹
        {(item.price * item.quantity).toLocaleString(
          "en-IN"
        )}

      </div>

      <button
        className="remove-button"
        onClick={removeItem}
      >
        Remove
      </button>

    </div>
  );
}

export default CartItem;
