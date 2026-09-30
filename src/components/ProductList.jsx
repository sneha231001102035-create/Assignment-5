import ProductCard from "./ProductCard";

function ProductList() {

  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 55000,
      image: "💻",
    },
    {
      id: 2,
      name: "Smartphone",
      price: 25000,
      image: "📱",
    },
    {
      id: 3,
      name: "Headphones",
      price: 2500,
      image: "🎧",
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 5000,
      image: "⌚",
    },
    {
      id: 5,
      name: "Keyboard",
      price: 1800,
      image: "⌨️",
    },
    {
      id: 6,
      name: "Mouse",
      price: 1200,
      image: "🖱️",
    },
  ];

  return (
    <section className="products-section">

      <h2>Products</h2>

      <div className="product-grid">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}

export default ProductList;
