import React, { useEffect, useState } from "react";
import productService from "../service/productService";
import Product from "./commons/product";

const OurCollections = () => {
  const [sneakers, setSneakers] = useState([]);
  const [hat, setHat] = useState([]);
  const [sunglasses, setSunglasses] = useState([]);
  const [visibleItemsSneakers, setVisibleItemsSneakers] = useState(3);
  const [visibleItemsHat, setVisibleItemsHat] = useState(3);
  const [visibleItemsSunglasses, setVisibleItemsSunglasses] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseHat = await productService.getProductByCategory("hat");
        setHat(responseHat);
        const responseSneakers = await productService.getProductByCategory(
          "sneakers"
        );
        setSneakers(responseSneakers);
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

  const loadMore = (category) => {
    switch (category) {
      case "hat":
        setVisibleItemsHat((prevVisibleItems) => prevVisibleItems + 3);
        break;
      case "sneakers":
        setVisibleItemsSneakers((prevVisibleItems) => prevVisibleItems + 3);
        break;
      case "sunglasses":
        setVisibleItemsSunglasses((prevVisibleItems) => prevVisibleItems + 3);
        break;
      default:
        break;
    }
  };

  return (
    <section className="container">
      <div className="categories">
        <h1 className="mt-3">Casual City Hats</h1>
        <div className="d-flex flex-column align-items-center">
          <div className="hat-collection container text-center d-flex flex-wrap gap-2 justify-content-center ">
            {hat.slice(0, visibleItemsHat).map((product) => (
              <div
              key={product.productId}
                className={`${
                  product.available === 0 ? "" : "dontHaveProduct"
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
          {visibleItemsHat < hat.length && (
            <button className="btn btn-success" onClick={() => loadMore("hat")}>
              Load More
            </button>
          )}
        </div>

        <h1 className="my-3">Casual City Sneakers</h1>
        <div className="d-flex flex-column align-items-center">
          <div className="sneakers-collection container text-center d-flex flex-wrap gap-2 justify-content-center ">
            {sneakers.slice(0, visibleItemsSneakers).map((product) => (
              <div
              key={product.productId}
                className={`${
                  product.available === 0 ? "" : "dontHaveProduct"
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
          {visibleItemsSneakers < sneakers.length && (
            <button className="btn btn-success" onClick={() => loadMore("sneakers")}>
              Load More
            </button>
          )}
        </div>

        <h1 className="my-3">Casual City SunGlasses</h1>
        <div className="d-flex flex-column align-items-center">
          <div className="sunGlasses-collection container text-center d-flex flex-wrap gap-2 justify-content-center ">
            {sunglasses.slice(0, visibleItemsSunglasses).map((product) => (
              <div
              key={product.productId}
                className={`${
                  product.available === 0 ? "" : "dontHaveProduct"
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
          {visibleItemsSunglasses < sunglasses.length && (
            <button className="btn btn-success" onClick={() => loadMore("sunglasses")}>
              Load More
            </button>
          )}
        </div>


      </div>
    </section>
  );
};

export default OurCollections;
