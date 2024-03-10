import Joi from "joi";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "./commons/input";
import { validateFormikUsingJoi } from "../utilis/validateFormikUsingJoi";
import productService from "../service/productService";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productPrice: "",
      productSize: "",
      url: "",
      alt: "",
      category: "",
      available: ""
    },
    async onSubmit(values) {
      await productService.editProduct(id, values).catch((err) => toast.error(err));
      toast("Editing the product");
      setTimeout(() => {
        navigate("/adm");
      }, 4000);
    },
    validate: validateFormikUsingJoi({
      productName: Joi.string().min(2).max(255).allow(""),
      productDescription: Joi.string().min(2).max(1024).allow(""),
      productPrice: Joi.number().allow(""),
      available: Joi.number().allow(""),
      url: Joi.string().min(11).max(1024).allow(""),
      alt: Joi.string().min(2).max(255).allow(""),
      category: Joi.string().valid("hat", "sneakers", "sunglasses").allow(""),
      productSize: Joi.string().valid("P", "M", "G", "XL").allow(""),
    }),
  });
  return (
    <>
      <ToastContainer />
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={formik.handleSubmit}
      >
        <Input
          type={"text"}
          title={"Product Name:"}
          name={"productName"}
          error={formik.touched.productName && formik.errors.productName}
          {...formik.getFieldProps("productName")}
        />
        <Input
          type={"text"}
          title={"Product Description:"}
          name={"productDescription"}
          {...formik.getFieldProps("productDescription")}
        />
        <Input
          type={"text"}
          title={"Product Price:"}
          name={"productPrice"}
          {...formik.getFieldProps("productPrice")}
        />
        <Input
          type={"text"}
          title={"Product Size:"}
          name={"productSize"}
          {...formik.getFieldProps("productSize")}
        />
        <Input
          type={"text"}
          title={"Url:"}
          name={"url"}
          {...formik.getFieldProps("url")}
        />
        <Input
          type={"text"}
          title={"Alt:"}
          name={"alt"}
          {...formik.getFieldProps("alt")}
        />
        <Input
          type={"text"}
          title={"Category:"}
          name={"category"}
          {...formik.getFieldProps("category")}
        />
        <Input
          type={"text"}
          title={"Available:"}
          name={"available"}
          {...formik.getFieldProps("available")}
        />
        <button type="submit" className="btn btn-warning my-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default AdminEditProduct;
