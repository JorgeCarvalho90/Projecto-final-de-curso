import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductsPage from "./pages";

export default function app(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  )
}