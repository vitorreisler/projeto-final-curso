import { useEffect, useState } from "react";

import productService from "../service/productService";
import Product from "./commons/product";

const Sneakers = () => {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSneakers = await productService.getProductByCategory(
          "sneakers"
        );
        setSneakers(responseSneakers);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="container">
      <h1 className="my-3">Casual City Sneakers</h1>
      <div className="sneakers-collection d-flex flex-column align-items-evenly flex-wrap my-3">
        {sneakers && (
          <div className="d-flex flex-wrap gap-2 justify-content-evenly">
            {sneakers.map((product) => (
              <div
                key={product.productId}
                className={`${
                  product.available !== -1 ? "" : "dontHaveProduct"
                }`}
              >
                <Product
                  key={product.productId}
                  productName={product.productName}
                  productDescription={product.productDescription}
                  productPrice={product.productPrice}
                  productSize={product.productSize}
                  productImg={product.productImage.url}
                  productAlt={product.productImage.alt}
                  productId={product.productId}
                  category={product.category}
                  available={product.available}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Sneakers;
