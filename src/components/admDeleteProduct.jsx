import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../service/productService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDeleteProduct = () => {
  const [productToDelete, setProductToDelete] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDelete = async () => {
    await productService.deleteProduct(id);
    toast("Deleting Product");
    setTimeout(() => {
      navigate("/adm");
    }, 4000);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await productService.getProductById(id);
      setProductToDelete(res);
    };
    fetchData();
  }, []);
  return (
    <div className="d-flex justify-content-center my-5">
      <ToastContainer />
      {productToDelete && (
        <div className="card text-center" style={{ width: "16rem" }}>
          <img
            className="card-img-top"
            src={productToDelete.productImage?.url}
            alt={productToDelete.productImage?.alt}
          />
          <div className="card-body">
            <h5 className="card-title">{productToDelete.productName}</h5>
            <p className="card-text">{productToDelete.productDescription}</p>
            <p className="card-text">Price: {productToDelete.productPrice}</p>
            <p className="card-text">Size: {productToDelete.productSize}</p>
            <button onClick={handleDelete} className="btn btn-outline-danger">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDeleteProduct;
