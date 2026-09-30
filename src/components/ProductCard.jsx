import { useCart } from "../context/CartContext";

function ProductCard({ product }) {

  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  return (
    <div className="product-card">

      <div className="product-image">
        {product.image}
      </div>

      <h3>{product.name}</h3>

      <p className="price">
        ₹{product.price.toLocaleString("en-IN")}
      </p>

      <button onClick={addToCart}>
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;
