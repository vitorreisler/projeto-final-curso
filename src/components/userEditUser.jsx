import Joi from "joi";
import { useFormik } from "formik";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { validateFormikUsingJoi } from "../utilis/validateFormikUsingJoi";

import Input from "./commons/input";
import userService from "../service/userService";
import { useAuth } from "../context/auth.context";

const UserEditUser = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const {user} = useAuth()
  
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
          navigate("/");
        }, 2000);
      } catch (err) {
        setServerError(err.response?.data);
        toast.error(err.response?.data);
      }
    },
    validate: validateFormikUsingJoi({
      first: Joi.string().min(2).max(255).required(),
      surname: Joi.string().min(2).max(255).required(),
      phone: Joi.number().required(),
      url: Joi.string().min(11).max(1024).required(),
      alt: Joi.string().min(2).max(255).required(),
      email: Joi.string().min(6).max(255).required(),
      password: Joi.string()
        .min(8)
        .max(255)
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required(),
      state: Joi.string().min(2).max(255).required(),
      city: Joi.string().min(2).max(255).required(),
      street: Joi.string().min(2).max(255).required(),
      houseNumber: Joi.number().min(2).required(),
    }),
  });
  if(!user){
    return navigate("/")
  }
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
            required
          />
          <Input
            title={"Surname: "}
            type={"text"}
            name={"surname"}
            error={formik.touched.surname && formik.errors.surname}
            {...formik.getFieldProps("surname")}
            required
          />
          <Input
            title={"Email: "}
            type={"text"}
            name={"email"}
            error={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps("email")}
            required
          />
          <Input
            title={"phone : "}
            type={"text"}
            name={"phone"}
            error={formik.touched.phone && formik.errors.phone}
            {...formik.getFieldProps("phone")}
            required
          />
          <Input
            title={"url : "}
            type={"text"}
            name={"url"}
            error={formik.touched.url && formik.errors.url}
            {...formik.getFieldProps("url")}
            required
          />
          <Input
            title={"alt : "}
            type={"text"}
            name={"alt"}
            error={formik.touched.alt && formik.errors.alt}
            {...formik.getFieldProps("alt")}
            required
          />
          <Input
            title={"state : "}
            type={"text"}
            name={"state"}
            error={formik.touched.state && formik.errors.state}
            {...formik.getFieldProps("state")}
            required
          />
          <Input
            title={"city : "}
            type={"text"}
            name={"city"}
            error={formik.touched.city && formik.errors.city}
            {...formik.getFieldProps("city")}
            required
          />
          <Input
            title={"street : "}
            type={"text"}
            name={"street"}
            error={formik.touched.street && formik.errors.street}
            {...formik.getFieldProps("street")}
            required
          />
          <Input
            title={"houseNumber : "}
            type={"text"}
            name={"houseNumber"}
            error={formik.touched.houseNumber && formik.errors.houseNumber}
            {...formik.getFieldProps("houseNumber")}
            required
          />
          <Input
            title={"Password: "}
            type={"password"}
            name={"password"}
            error={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps("password")}
            required
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
}
 
export default UserEditUser;