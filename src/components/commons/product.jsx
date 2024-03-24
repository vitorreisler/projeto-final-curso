import { useState } from "react";
import { useAuth } from "../../context/auth.context";
import { useLike } from "../../context/like.context";
import productService from "../../service/productService";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart.context";

const Product = ({
  productName,
  productDescription,
  productPrice,
  productSize,
  productImg,
  productAlt,
  productId,
  category,
  available,
}) => {
  const [counter, setCounter] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { likedProducts, addFavorite, removeFavorite, userOn } = useLike();
  const { setParcial, setProductWithPrice, productWithPrice } = useCart();

  const handleCart = () => {
    const existingProductIndex = productWithPrice.findIndex(
      (prod) => prod.productName === productName
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
            productPrice,
        };
        return updatedProducts;
      });
    } else {
      // Product is not in the cart, add it as a new item
      setProductWithPrice((prevProduct) => [
        ...prevProduct,
        {
          productId: productId,
          productImg: productImg,
          counter: counter,
          productName: productName,
          productSize: productSize,
          productPrice: productPrice,
          totalPrice: productPrice * counter,
          category: category,
        },
      ]);
    }

    // Add the total price to the partial total
    setParcial((prevParcial) => [...prevParcial, productPrice * counter]);

    // Reset the counter to 0
    setCounter(0);
  };

  const liked = likedProducts.some(
    (likedProduct) => likedProduct.productId === productId
  );

  const increment = () => setCounter((counter) => counter + 1);
  const decrement = () => setCounter((counter) => counter - 1);

  const handleEdit = async () => {
    await productService.getProductById(productId);
    navigate(`/adm-edit-product/${productId}`);
  };
  const handleDelete = async () => {
    await productService.getProductById(productId);
    navigate(`/adm-delete-product/${productId}`);
  };
  return (
    <div className="card shadow product-card" style={{ width: "14rem" }}>
      <Link to={`/more-info/${productId}`}>
        {" "}
        <img src={productImg} className="card-img-top" alt={productAlt} />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text m-0">{productDescription}</p>
        <p className="card-text m-0">Price: ${productPrice}</p>
        <p className="card-text m-0">Size: {productSize}</p>
        <p className="card-text m-0">Category: {category}</p>
        <div className="d-flex justify-content-center align-items-center pt-3 mb-0">
          {userOn && (
            <div className="d-flex align-items-center">
              <span
                className="mx-3"
                onClick={() => {
                  if (liked) {
                    removeFavorite(productId);
                  } else {
                    addFavorite(productId);
                  }
                }}
              >
                {liked ? (
                  <i className="bi bi-heart-fill text-danger"></i>
                ) : (
                  <i className="bi bi-heart"></i>
                )}
              </span>

              {available !== -1 ? (
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
        {userOn?.isAdmin ? (
          <div className="d-flex justify-content-center gap-4">
            <button onClick={handleEdit} className="btn btn-warning">
              {" "}
              <i className="bi bi-pen"></i>{" "}
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              {" "}
              <i className="bi bi-trash"></i>{" "}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Product;
