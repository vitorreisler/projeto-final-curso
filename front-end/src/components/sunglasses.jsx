import { useEffect, useState } from "react";

import productService from "../service/productService";
import Product from "./commons/product";

const SunGlasses = () => {
  const [sunglasses, setSunglasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSunglasses = await productService.getProductByCategory(
          "sunglasses"
        );
        setSunglasses(responseSunglasses);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="container">
      <h1 className="my-3">Casual City SunGlasses</h1>
      <div className="sunglasses-collection d-flex flex-column align-items-evenly justify-content-evenly flex-wrap my-3">
        {sunglasses && (
          <div className="d-flex  flex-wrap gap-2 justify-content-evenly">
            {sunglasses.map((product) => (
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

export default SunGlasses;
