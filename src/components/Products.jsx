import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";  // Import your ProductCard
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;  // to avoid setting state on unmounted component
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="container my-3 py-3 text-center">
        <Skeleton height={40} width={200} />
        <div className="row mt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="col-md-4 col-sm-6 mb-4">
              <Skeleton height={350} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-3 py-3">
      <h2 className="display-5 text-center mb-4">Latest Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
