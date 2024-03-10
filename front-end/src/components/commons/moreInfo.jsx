import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../../service/productService";
import { useLike } from "../../context/like.context";
import { useAuth } from "../../context/auth.context";
import { useCart } from "../../context/cart.context";

const MoreInfo = () => {
  const {user} = useAuth()
  const {addFavorite, removeFavorite,likedProducts} = useLike()
  const [product, setProduct] = useState({});
  const [counter, setCounter] = useState(0)
  const { id } = useParams();
  const {productWithPrice, setProductWithPrice, setParcial} = useCart()

  useEffect(() => {
    const fetchData = async () => {
      const res = await productService.getProductById(id);
      setProduct(res);
    };
    fetchData();
  }, [id]);

  const increment = () => setCounter((counter) => counter + 1);
  const decrement = () => setCounter((counter) => counter - 1);

  const handleCart = () => {
    const existingProductIndex = productWithPrice.findIndex(
      (prod) => prod.productName === product.productName
    );

    if (existingProductIndex !== -1) {
      // Product is already in the cart, update the quantity
      setProductWithPrice((prevProduct) => {
        const updatedProducts = [...prevProduct];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          counter: updatedProducts[existingProductIndex].counter + counter,
          totalPrice:
            (updatedProducts[existingProductIndex].counter + counter) *
            product.productPrice,
        };
        return updatedProducts;
      });
    } else {
      // Product is not in the cart, add it as a new item
      setProductWithPrice((prevProduct) => [
        ...prevProduct,
        {
          productId: product.productId,
          productImg: product.productImage?.url,
          counter: counter,
          productName: product.productName,
          productSize: product.productSize,
          productPrice: product.productPrice,
          totalPrice: product.productPrice * counter,
          category: product.category,
        },
      ]);
    }

    // Add the total price to the partial total
    setParcial((prevParcial) => [...prevParcial, product.productPrice * counter]);

    // Reset the counter to 0
    setCounter(0);
  };

  
  const liked = likedProducts.some(
    (likedProduct) => likedProduct.productId === id
  );

  return (
    <section className={"container"}>
      <div className="row my-5">
        <div className="col">
          <img
            className="product-image-specific"
            src={product.productImage?.url}
            alt={product.productImage?.alt}
          />
        </div>
        <div className="col d-flex flex-column justify-content-start">
          <p>
            <strong>Product Name:</strong> {product.productName}{" "}
          </p>
          <p>
            <strong>Product Description:</strong> {product.productDescription}{" "}
          </p>
          <p>
            <strong>Product Size:</strong> {product.productSize}{" "}
          </p>
          <p>
            <strong>ProductPrice:</strong> {product.productPrice}${" "}
          </p>
          <p>
            <strong>Likes:</strong> {product.likes?.length}{" "}
          </p>
          <div className="d-flex justify-content-start align-items-center pt-3 mb-0">
          {user && (
            <div className="d-flex align-items-center">
              <span
                className="mx-3"
                onClick={() => {
                  if (liked) {
                    removeFavorite(id);
                  } else {
                    addFavorite(id);
                  }
                }}
              >
                {liked ? (
                  <i className="bi bi-heart-fill text-danger"></i>
                ) : (
                  <i className="bi bi-heart"></i>
                )}
              </span>

              {product.available !== -1 ? (
                <>
                  <button
                    disabled={counter === 0 ? true : false}
                    onClick={decrement}
                    className="btn btn-sm buttons-product "
                  >
                    -
                  </button>
                  <span> {counter} </span>
                  <button
                    onClick={increment}
                    className="btn btn-sm buttons-product "
                  >
                    +
                  </button>
                  <button
                    disabled={counter === 0 ? true : false}
                    className="btn btn-sm buttons-product"
                  >
                    <i
                      onClick={handleCart}
                      className="btn  btn-s mx-auto bi bi-cart"
                    />
                  </button>{" "}
                </>
              ) : (
                <strong>Product End</strong>
              )}
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
};

export default MoreInfo;
