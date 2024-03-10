import { Fragment, useEffect } from "react";
import { useCart } from "../context/cart.context";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const {
    total,
    parcial,
    productWithPrice,
    setProductWithPrice,
    setParcial,
    setTotal,
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setParcial(productWithPrice.map((item) => item.totalPrice));
  }, [productWithPrice, setParcial]);

  useEffect(() => {
    setTotal(parcial.reduce((total, amount) => total + amount, 0));
  }, [parcial, setTotal]);

  const handleDelete = (productId) => {
    setProductWithPrice(
      productWithPrice.filter((item) => item.productId !== productId)
    );
  };

  if (productWithPrice.length === 0) {
    return (
      <span
        style={{ height: "89vh" }}
        className="d-flex justify-content-center align-items-center "
      >
        I'm sorry but your cart is empty
      </span>
    );
  }
  return (
    <div className="d-flex flex-column align-items-center">
      <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-4 my-2">
        {productWithPrice.map((item) => (
          <Fragment key={item.productId}>
            <div className="d-flex align-items-center justify-content-center border rounded">
              <img className="checkout-img m-2" src={item.productImg} alt="" />
              <div className=" flex-column mx-4 ">
                <li>Item: {item.productName} </li>
                <li>Qtty: {item.counter}</li>
                <li>Price: ${item.productPrice}</li>
                {
                  <button
                    onClick={() => handleDelete(item.productId)}
                    className="btn btn-danger"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                }

                <hr />
              </div>
            </div>
          </Fragment>
        ))}
      </ul>
      <span className="px-5 my-1"> Total: ${total} </span>
      <button
        onClick={() => navigate("/payments")}
        className="btn btn-outline-success mb-2"
      >
        Pay
      </button>
    </div>
  );
};

export default CheckOut;
