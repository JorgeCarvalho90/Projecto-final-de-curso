import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductsPage from "./pages";
import ProductDetails from "./pages/product";
import Layout from "./components/Layout";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import AccountPage from "./pages/account";
import CartPage from "./pages/cart";
import AuthContextProvider from "./context/auth";
import CartContextProvider from "./context/cart";
import CartProvider from "./context/cart";

export default function app() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetails />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </AuthContextProvider>
  );
}
