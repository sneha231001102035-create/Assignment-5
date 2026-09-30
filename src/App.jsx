import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">

      <Header />

      <main className="container">

        <ProductList />

        <Cart />

      </main>

      <Footer />

    </div>
  );
}

export default App;
