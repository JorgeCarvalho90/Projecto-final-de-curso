import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductsPage from "./pages";
import ProductDetails from "./pages/product";
import Layout from "./components/Layout";

export default function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
