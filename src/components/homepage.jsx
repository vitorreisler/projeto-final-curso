import { useEffect, useState } from "react";
import Carousel from "./carousel";
import productService from "../service/productService";
import Product from "./commons/product";

const HomePage = () => {
  const [initialProducts, setInitialProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productService.getAllProducts();

        // Make sure there are at least 3 products in the response
        if (res.length >= 3) {
          const randomIndices = [];

          while (randomIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * res.length);

            // Check if the random index is not already in the array
            if (!randomIndices.includes(randomIndex)) {
              randomIndices.push(randomIndex);
            }
          }

          const randomProducts = randomIndices.map((index) => res[index]);
          setInitialProducts(randomProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="lightSpeedIn text-center py-2">
        <h1 className=" m-0 display-1 text-center">
          Casual
          <i className="bi bi-building" />
          City
        </h1>
        <span className="display-6">
          Cause life is to fast to take care about style
        </span>
      </div>
      <Carousel
        hatMessage={"The best choice to the casual style."}
        sunGlassMessage={"Cause some times it's ok to see a little bit dark"}
        sneakersMessage={"Cause every step is a new journey"}
      />

      <div className="d-flex justify-content-evenly flex-wrap my-3">
        {initialProducts.map((product) => {
          return (
            <div key={product.productId} className={`${product.available !== -1 ? "" :"dontHaveProduct"}`} >
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
              available = {product.available}
            />
          </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
