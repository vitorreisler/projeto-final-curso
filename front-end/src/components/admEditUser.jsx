import Joi from "joi";
import { useFormik } from "formik";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { validateFormikUsingJoi } from "../utilis/validateFormikUsingJoi";

import Input from "./commons/input";
import userService from "../service/userService";
const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      first: "",
      surname: "",
      email: "",
      phone: "",
      url: "",
      alt: "",
      password: "",
      state: "",
      city: "",
      street: "",
      houseNumber: "",
    },
    async onSubmit(values) {
      try {
        await userService.editUser(id, values);
        toast("Editing the user");
        setTimeout(() => {
          navigate("/adm");
        }, 2000);
      } catch (err) {
        setServerError(err.response?.data);
        toast.error(err.response?.data);
      }
    },
    validate: validateFormikUsingJoi({
      first: Joi.string().min(2).max(255).allow(""),
      surname: Joi.string().min(2).max(255).allow(""),
      phone: Joi.number().allow(""),
      url: Joi.string().min(11).max(1024).allow(""),
      alt: Joi.string().min(2).max(255).allow(""),
      email: Joi.string().min(6).max(255).allow(""),
      password: Joi.string()
        .min(8)
        .max(255)
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .allow(""),
      state: Joi.string().min(2).max(255).allow(""),
      city: Joi.string().min(2).max(255).allow(""),
      street: Joi.string().min(2).max(255).allow(""),
      houseNumber: Joi.number().min(2).allow(""),
    }),
  });
  return (
    <>
      <ToastContainer />
      <form
        onSubmit={formik.handleSubmit}
        className="container d-flex flex-column align-items-center justify-content-center "
        action=""
      >
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <Input
          title={"First Name: "}
          type={"text"}
          name={"first"}
          error={formik.touched.first && formik.errors.first}
          {...formik.getFieldProps("first")}
        />
        <Input
          title={"Surname: "}
          type={"text"}
          name={"surname"}
          error={formik.touched.surname && formik.errors.surname}
          {...formik.getFieldProps("surname")}
        />
        <Input
          title={"Email: "}
          type={"text"}
          name={"email"}
          error={formik.touched.email && formik.errors.email}
          {...formik.getFieldProps("email")}
        />
        <Input
          title={"phone : "}
          type={"text"}
          name={"phone"}
          error={formik.touched.phone && formik.errors.phone}
          {...formik.getFieldProps("phone")}
        />
        <Input
          title={"url : "}
          type={"text"}
          name={"url"}
          error={formik.touched.url && formik.errors.url}
          {...formik.getFieldProps("url")}
        />
        <Input
          title={"alt : "}
          type={"text"}
          name={"alt"}
          error={formik.touched.alt && formik.errors.alt}
          {...formik.getFieldProps("alt")}
        />
        <Input
          title={"state : "}
          type={"text"}
          name={"state"}
          error={formik.touched.state && formik.errors.state}
          {...formik.getFieldProps("state")}
        />
        <Input
          title={"city : "}
          type={"text"}
          name={"city"}
          error={formik.touched.city && formik.errors.city}
          {...formik.getFieldProps("city")}
        />
        <Input
          title={"street : "}
          type={"text"}
          name={"street"}
          error={formik.touched.street && formik.errors.street}
          {...formik.getFieldProps("street")}
        />
        <Input
          title={"houseNumber : "}
          type={"text"}
          name={"houseNumber"}
          error={formik.touched.houseNumber && formik.errors.houseNumber}
          {...formik.getFieldProps("houseNumber")}
        />
        <Input
          title={"Password: "}
          type={"password"}
          name={"password"}
          error={formik.touched.password && formik.errors.password}
          {...formik.getFieldProps("password")}
        />
        <button
          disabled={!formik.isValid}
          type="submit"
          className="btn btn-success my-3"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AdminEditUser;
