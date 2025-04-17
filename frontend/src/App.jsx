import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductsPage from "./pages";
import ProductDetails from "./pages/product";
import Layout from "./components/Layout";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import AuthContextProvider from "./context/auth";

export default function app() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
