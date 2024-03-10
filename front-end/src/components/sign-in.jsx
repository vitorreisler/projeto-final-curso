import { useFormik } from "formik";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { validateFormikUsingJoi } from "../utilis/validateFormikUsingJoi";
import Input from "./commons/input";
import { useAuth } from "../context/auth.context";
const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    async onSubmit(values) {
      try {
        await login(values);
        await toast.success("You are on");

        await setTimeout(() => {
          navigate("/about");
        }, 3000);
      } catch (err) {
        toast.error(" Something wrong occurred", { hideProgressBar: true });
        setServerError(err.response?.data);
      }
    },
    validate: validateFormikUsingJoi({
      email: Joi.string().min(6).max(255).required(),
      password: Joi.string().min(8).max(255).regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ).required(),
    }),
  });


  return (
    <>
      <ToastContainer />
      <form
        onSubmit={formik.handleSubmit}
        className="container d-flex flex-column align-items-center justify-content-center form-signIn "
        action=""
      >
        {serverError && (
          <div className="alert alert-danger my-2">{serverError}</div>
        )}
        <Input
          title={"Email: "}
          type={"text"}
          name={"email"}
          required
          error={formik.touched.email && formik.errors.email}
          {...formik.getFieldProps("email")}
        />
        <Input
          title={"Password: "}
          type={"password"}
          name={"password"}
          required
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

export default SignIn;
