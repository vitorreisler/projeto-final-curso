import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useForm } from "@formspree/react";
import Joi from "joi";
import { validateFormikUsingJoi } from "../utilis/validateFormikUsingJoi";
import { useCart } from "../context/cart.context";
import Product from "./commons/product";

const Payments = () => {
  const { productWithPrice } = useCart();
  const [state, handleSubmit] = useForm("xjvqqzbq");
  const [serverError, setServerError] = useState("");

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      cardNum: "",
      expDate: "",
      cvv: "",
    },
    onSubmit(values) {
      handleSubmit(values);
    },
    validate: validateFormikUsingJoi({
      email: Joi.string()
        .min(3)
        .max(256)
        .email({ tlds: { allow: false } })
        .required(),
      cardNum: Joi.string().min(13).max(16).required(),
      expDate: Joi.string().min(4).max(5).required(),
      cvv: Joi.string().min(3).max(3).required(),
    }),
  });

  useEffect(() => {
    setServerError(formik.errors);
  }, [serverError, formik.errors]);

  if (state.succeeded) {
    return (
      <p className="text-center py-5">
        {" "}
        Thank you, when the payment will be approved you will receive an
        confirmation email.
      </p>
    );
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="container col-md-8 my-4 d-flex flex-column"
    >
      <div className="d-flex justify-content-center gap-3">
        {productWithPrice.map((product) => {
          return (
            <Product
              key={product.productId}
              productImg={product.productImg}
              productName={product.productName}
              productPrice={product.productPrice}
              productSize={product.productSize}
              category={product.category}
              productId={product.productId}
            />
          );
        })}
      </div>
      <h2 className="my-2">Payment</h2>
      <label htmlFor="email">Email:</label>
      <input
        {...formik.getFieldProps("email")}
        className="form-control"
        id="email"
        type="email"
        required
      />
      {serverError && (
        <div className="text-danger text-center">
          {" "}
          {formik.touched.email && formik.errors.email}
        </div>
      )}
      <div className="d-flex flex-wrap justify-content-center mt-3 gap-2">
        <div className="col-md-4 ">
          <label htmlFor="card-num">Card Number:</label>
          <input
            {...formik.getFieldProps("cardNum")}
            className="form-control"
            id="card-num"
            type="text"
            required
          />
          {serverError && (
            <div className="text-danger text-center">
              {" "}
              {formik.touched.cardNum && formik.errors.cardNum}
            </div>
          )}
        </div>
        <div className="col-md-4">
          <label htmlFor="exp-date">Exp.Date:</label>
          <input
            {...formik.getFieldProps("expDate")}
            className="form-control"
            id="exp-date"
            type="text"
            placeholder="MM/YY"
            required
          />
          {serverError && (
            <div className="text-danger text-center">
              {" "}
              {formik.touched.expDate && formik.errors.expDate}
            </div>
          )}
        </div>
        <div className="col-md-3">
          <label htmlFor="cvv">cvv:</label>
          <input
            {...formik.getFieldProps("cvv")}
            className="form-control"
            id="cvv"
            type="text"
            required
          />
          {serverError && (
            <div className="text-danger text-center">
              {" "}
              {formik.touched.cvv && formik.errors.cvv}
            </div>
          )}
        </div>
      </div>
      <button className="btn btn-outline-success my-3" type="submit">
        Pay
      </button>
      <p className="display-3 text-danger">
        {" "}
        PLEASE DO NOT INSERT YOUR REAL CARD NUMBER !
      </p>
    </form>
  );
};

export default Payments;
