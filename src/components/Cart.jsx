import { useState } from "react";

import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

function Cart() {

  const { state, dispatch } = useCart();

  const [couponInput, setCouponInput] = useState("");

  const [couponMessage, setCouponMessage] =
    useState("");

  // Calculate subtotal
  const subtotal = state.cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Calculate discount
  const discount = state.coupon
    ? (subtotal * state.coupon.discount) / 100
    : 0;

  // Amount after coupon
  const amountAfterDiscount =
    subtotal - discount;

  // GST 18%
  const gst = (amountAfterDiscount * 18) / 100;

  // Final amount
  const grandTotal =
    amountAfterDiscount + gst;

  // Apply Coupon
  const applyCoupon = () => {

    const code = couponInput
      .trim()
      .toUpperCase();

    if (code === "SAVE10") {

      dispatch({
        type: "APPLY_COUPON",
        payload: {
          code: "SAVE10",
          discount: 10,
        },
      });

      setCouponMessage(
        "10% discount applied!"
      );

    } else if (code === "SAVE20") {

      dispatch({
        type: "APPLY_COUPON",
        payload: {
          code: "SAVE20",
          discount: 20,
        },
      });

      setCouponMessage(
        "20% discount applied!"
      );

    } else {

      setCouponMessage(
        "Invalid coupon code."
      );

    }
  };

  const removeCoupon = () => {

    dispatch({
      type: "REMOVE_COUPON",
    });

    setCouponInput("");

    setCouponMessage("");
  };

  return (
    <section className="cart-section">

      <h2>Shopping Cart</h2>

      {state.cart.length === 0 ? (

        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <p>Add some products to continue.</p>
        </div>

      ) : (

        <>

          <div className="cart-items">

            {state.cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
              />
            ))}

          </div>

          {/* Coupon */}

          <div className="coupon-section">

            <h3>Coupon Code</h3>

            <div className="coupon-form">

              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponInput}
                onChange={(e) =>
                  setCouponInput(e.target.value)
                }
              />

              <button onClick={applyCoupon}>
                Apply
              </button>

            </div>

            <p className="coupon-hint">
              Try: SAVE10 or SAVE20
            </p>

            {couponMessage && (
              <p className="coupon-message">
                {couponMessage}
              </p>
            )}

            {state.coupon && (
              <button
                className="remove-coupon"
                onClick={removeCoupon}
              >
                Remove Coupon
              </button>
            )}

          </div>

          {/* Bill */}

          <div className="bill">

            <div className="bill-row">
              <span>Subtotal</span>

              <span>
                ₹{subtotal.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="bill-row discount">
              <span>
                Discount
                {state.coupon &&
                  ` (${state.coupon.discount}%)`}
              </span>

              <span>
                - ₹
                {discount.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="bill-row">
              <span>Amount After Discount</span>

              <span>
                ₹
                {amountAfterDiscount.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 2,
                  }
                )}
              </span>
            </div>

            <div className="bill-row">
              <span>GST (18%)</span>

              <span>
                ₹
                {gst.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <hr />

            <div className="grand-total">

              <span>Grand Total</span>

              <span>
                ₹
                {grandTotal.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </span>

            </div>

          </div>

        </>
      )}

    </section>
  );
}

export default Cart;
