import { useFormik } from "formik";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import productService from "../service/productService";
import Input from "./commons/input";
import { validateFormikUsingJoi } from "../utilis/validateFormikUsingJoi";


const AdminCreateProduct = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    validateOnMount:true,
    initialValues: {
      productName: "",
      productDescription: "",
      productPrice: "",
      url: "",
      alt: "",
      category: "",
      productSize: "",
      available: "",
    },
    async onSubmit(values) {
      console.log(values);
      await productService.createProduct(values)
      toast("Creating Product")
      setTimeout(() => {
          navigate('/adm')
      }, 4000);

    },
    validate: validateFormikUsingJoi({
      productName: Joi.string().min(2).max(255).required(),
      productDescription: Joi.string().min(2).max(1024).required(),
      productPrice: Joi.number().required(),
      available: Joi.number().valid(-1,0).required(),
      url: Joi.string().min(11).max(1024).required(),
      alt: Joi.string().min(2).max(255).required(),
      category: Joi.string().valid("hat", "sneakers", "sunglasses").required(),
      productSize: Joi.string().valid("P", "M", "G", "XL").required(),
    }),
  });
  return (
    <>
    <ToastContainer/>
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex flex-column align-items-center"
      action="POST"
    >
      <Input
        type={"text"}
        title={"Product Name: "}
        name={"productName"}
        required
        error={formik.touched.productName && formik.errors.productName}
        {...formik.getFieldProps("productName")}
      />
      <Input
        type={"text"}
        title={"Product Description: "}
        name={"productDescription"}
        required
        error={
          formik.touched.productDescription && formik.errors.productDescription
        }
        {...formik.getFieldProps("productDescription")}
      />
      <Input
        type={"text"}
        title={"Product Price: "}
        name={"productPrice"}
        required
        error={formik.touched.productPrice && formik.errors.productPrice}
        {...formik.getFieldProps("productPrice")}
      />
      <Input
        type={"text"}
        title={"URL: "}
        name={"url"}
        required
        error={formik.touched.url && formik.errors.url}
        {...formik.getFieldProps("url")}
      />
      <Input
        type={"text"}
        title={"Alt: "}
        name={"alt"}
        required
        error={formik.touched.alt && formik.errors.alt}
        {...formik.getFieldProps("alt")}
      />
      <Input
        type={"text"}
        title={"Category: "}
        name={"category"}
        required
        error={formik.touched.category && formik.errors.category}
        {...formik.getFieldProps("category")}
      />
      <Input
        type={"text"}
        title={"Product Size: "}
        name={"productSize"}
        required
        error={formik.touched.productSize && formik.errors.productSize}
        {...formik.getFieldProps("productSize")}
      />
      <Input
        type={"text"}
        title={"Available: "}
        name={"available"}
        required
        error={formik.touched.available && formik.errors.available}
        {...formik.getFieldProps("available")}
      />
      <button disabled={!formik.isValid} type="submit" className="btn btn-info my-3">
        Submit
      </button>
    </form>
    </>
  );
};

export default AdminCreateProduct;
