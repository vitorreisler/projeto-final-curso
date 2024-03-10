import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../service/productService";
import Product from "./commons/product";
import userService from "../service/userService";
import AdmUserView from "./admUserView";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Adm = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [hatProducts, setHatProducts] = useState([]);
  const [sneakersProducts, setSneakersProducts] = useState([]);
  const [sunGlassesProducts, setSunGlassesProducts] = useState([]);
  const [openInputProductId, setOpenInputProductId] = useState(false);
  const [id, setId] = useState("");
  const [productById, setProductById] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [openInputUserById, setOpenInputUserById] = useState(false);
  const [userById, setUserById] = useState("");
  const [openInputUserTurnAdm, setOpenInputUserTurnAdm] = useState(false);
  const navigate = useNavigate();

  const handleClickGetAllProducts = async () => {
    try {
      const res = await productService.getAllProducts();
      setAllProducts(res);
      setHatProducts("");
      setSneakersProducts("");
      setSunGlassesProducts("");
      setOpenInputProductId(false);
      setId(null);
      setProductById("");
      toast.success("Bringing the Products");
    } catch (err) {
      toast.error("Something wrong occurred");
    }
  };
  const handleCreate = async () => {
    navigate("/adm-create-product");
  };

  const openInputProduct = () => {
    setOpenInputProductId(!openInputProductId);
    setSunGlassesProducts("");
    setSneakersProducts("");
    setHatProducts("");
    setAllProducts("");
  };

  const handleGetProductById = async () => {
    try {
      const res = await productService.getProductById(id);
      setProductById(res);
      setSunGlassesProducts("");
      setSneakersProducts("");
      setHatProducts("");
      setAllProducts("");
      toast.success("Heeeeeere your product 📦");
    } catch (error) {
      console.log(error);
      toast.error("We dont have any product with this id");
    }
  };

  const handleHatCategory = async () => {
    const res = await productService.getProductByCategory("hat");
    setHatProducts(res);
    setSneakersProducts("");
    setAllProducts("");
    setSunGlassesProducts("");
    setOpenInputProductId(false);
    setId(null);
    setProductById("");
    toast.success("Heeeeeere your products 📦");
  };
  const handleSneakersCategory = async () => {
    const res = await productService.getProductByCategory("sneakers");
    setSneakersProducts(res);
    setHatProducts("");
    setSunGlassesProducts("");
    setAllProducts("");
    setOpenInputProductId(false);
    setId(null);
    setProductById("");
    toast.success("Heeeeeere your products 📦");
  };
  const handleSunGlassesCategory = async () => {
    const res = await productService.getProductByCategory("sunglasses");
    setSunGlassesProducts(res);
    setSneakersProducts("");
    setHatProducts("");
    setAllProducts("");
    setOpenInputProductId(false);
    setId(null);
    setProductById("");
    toast.success("Heeeeeere your products 📦");
  };
  //USERS
  const handleClickGetAllUsers = async () => {
    const { data } = await userService.getAllUsers();
    setAllUsers(data);
    setOpenInputUserById(false);
    toast.success("Here your clients 🤑");
  };
  const openInputUser = () => {
    setOpenInputUserById(!openInputUserById);
  };
  const handleGetUserById = async () => {
    try {
      const { data } = await userService.getUserById(id);
      setUserById(data);
    } catch (error) {
      toast.error("❌ We dont have any user with this ID");
    }
  };

  const openInputTurnAdm = () => {
    setOpenInputUserTurnAdm(!openInputUserTurnAdm);
  };
  return (
    <div className="container d-flex flex-column flex-wrap justify-content-evenly">
      <ToastContainer autoClose={2000} hideProgressBar />
      <h1>Products</h1>
      <div className="d-flex flex-column flex-wrap align-items-start gap-4 mx-3 my-4 border rounded shadow p-3 ">
        <button onClick={handleClickGetAllProducts} className="btn btn-info">
          {" "}
          Get All products{" "}
        </button>{" "}
        {allProducts && (
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {allProducts.map((product) => (
              <div
                key={product.productId}
                className={`${
                  product.available !== -1 ? "" : "dontHaveProduct"
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
        )}
        <button onClick={openInputProduct} className="btn btn-info">
          Get product by ID
        </button>
        {openInputProductId && (
          <>
            {" "}
            <label htmlFor="getById">product ID: </label>
            <input
              onChange={(e) => setId(e.target.value)}
              type="text"
              name=""
              id="getById"
            />{" "}
            <button onClick={handleGetProductById} className="btn btn-success">
              Submit
            </button>{" "}
          </>
        )}
        {productById && (
          <div className={`${productById.available !== -1 ? "" :"dontHaveProduct"}`}>
            <Product
            productName={productById.productName}
            productDescription={productById.productDescription}
            productPrice={productById.productPrice}
            productSize={productById.productSize}
            productImg={productById.productImage.url}
            productAlt={productById.productImage.alt}
            productId={productById.productId}
            category={productById.category}
            available={productById.available}
            />
          </div>
        )}
        <button onClick={handleHatCategory} className="btn btn-info">
          Get product by Hat Category
        </button>{" "}
        {hatProducts && (
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {hatProducts.map((product) => (
              <div
                key={product.productId}
                className={`${
                  product.available !== -1 ? "" : "dontHaveProduct"
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
        )}
        <button onClick={handleSneakersCategory} className="btn btn-info">
          Get product by Sneakers Category
        </button>{" "}
        {sneakersProducts && (
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {sneakersProducts.map((product) => (
              <div
                key={product.productId}
                className={`${
                  product.available !== -1 ? "" : "dontHaveProduct"
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
        )}
        <button onClick={handleSunGlassesCategory} className="btn btn-info">
          Get product by SunGlasses Category
        </button>{" "}
        {sunGlassesProducts && (
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {sunGlassesProducts.map((product) => (
              <div
                key={product.productId}
                className={`${
                  product.available !== -1 ? "" : "dontHaveProduct"
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
        )}
        <button onClick={handleCreate} className="btn btn-success">
          Create a new Product
        </button>{" "}
      </div>

      <div className="d-flex flex-column align-items-start gap-4 mx-3 my-4 border rounded shadow p-3">
        <h1>Users</h1>
        <button onClick={handleClickGetAllUsers} className="btn btn-info">
          {" "}
          Get All Users{" "}
        </button>{" "}
        {allUsers && (
          <div className="d-flex flex-wrap justify-content-center text-center gap-3">
            {allUsers.map((user) => {
              return (
                <AdmUserView
                  key={user._id}
                  userName={user.name?.first}
                  userSurname={user.name?.surname}
                  userImg={user.image?.url}
                  userAlt={user.image?.alt}
                  userId={user._id}
                  isAdmin={user.isAdmin}
                  userEmail = {user.email}
                />
              );
            })}
          </div>
        )}
        <button onClick={openInputUser} className="btn btn-info">
          Get user by ID
        </button>
        {openInputUserById && (
          <>
            {" "}
            <label htmlFor="getById">User ID: </label>
            <input
              onChange={(e) => setId(e.target.value)}
              type="text"
              name=""
              id="getById"
            />{" "}
            <button onClick={handleGetUserById} className="btn btn-success">
              Submit
            </button>{" "}
            {userById && (
              <AdmUserView
                userImg={userById.image?.url}
                userName={userById.name?.first}
                userEmail={userById.email}
                userSurname={userById.name?.surname}
                userId={userById._id}
                isAdmin={userById.isAdmin}
              />
            )}
          </>
        )}
        <button onClick={openInputTurnAdm} className="btn btn-info">
          Turn ON/OFF Admin
        </button>
        {openInputUserTurnAdm && (
          <>
            {" "}
            <label htmlFor="getUserById">User ID: </label>
            <input
              onChange={(e) => setId(e.target.value)}
              type="text"
              name=""
              id="getUserById"
            />{" "}
            <button
              onClick={() => navigate(`/patch-user-adm/${id}`)}
              className="btn btn-success"
            >
              Submit
            </button>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Adm;
