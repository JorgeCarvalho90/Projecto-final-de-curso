import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { getProductsBySlug } from "../../services/products";
import { CartContext } from "../../context/cart";

export default function ProductDetails() {
  const { slug } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const handleBuy = () => {
    addToCart(product);
    navigate("/cart");
  };

  useEffect(() => {
    getProductsBySlug(slug).then((res) => {
      setProduct(res);
    });
  }, [slug]);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        {product ? (
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={product.name}
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.images[0]}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category.name}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>

              <p className="leading-relaxed">{product.description}</p>
              <div className="flex mt-6">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {product.price}€
                </span>
                <button
                  onClick={handleBuy}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              role="status"
              className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
            >
              <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div className="w-full">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
