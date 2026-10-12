import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import { reducer, startState } from "./reducer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";

export default function App() {
  const [state, dispatch] = useReducer(reducer, startState);

  return (
    <>
      <Header dispatch={dispatch} cartCount={state.cart.length} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route
          path="/product/:slug"
          element={<ProductPage dispatch={dispatch} />}
        />
        <Route
          path="/checkout"
          element={<Checkout state={state} dispatch={dispatch} />}
        />
        <Route path="*" element={<p style={{ padding: 80 }}></p>} />
      </Routes>

      {state.cartOpen && <CartModal cart={state.cart} dispatch={dispatch} />}
      <Footer />
    </>
  );
}
