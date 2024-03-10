import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "../service/userService";

const AdminDeleteUser = () => {
  const [userToDelete, setUserToDelete] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDelete = async () => {
    await userService.deleteUser(id);
    toast("Deleting User");
    setTimeout(() => {
      navigate("/adm");
    }, 4000);
  };
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await userService.getUserById(id);
      setUserToDelete(data);
    };
    fetchData();
  }, [id]);
  return (
    <div className="d-flex justify-content-center my-5">
        {console.log(userToDelete)}
      <ToastContainer />
      {userToDelete && (
        <div className="card text-center" style={{ width: "16rem" }}>
          <img
            className="card-img-top"
            src={userToDelete.image?.url}
            alt={userToDelete.userImage?.alt}
          />
          <div className="card-body">
            <h5 className="card-title">Name: {userToDelete.name?.first}</h5>
            <p className="card-text"> Surname: {userToDelete.name?.surname}</p>
            <p className="card-text">Id: {userToDelete._id}</p>
            <p className="card-text">Is Admin: {userToDelete.isAdmin ? "True" : "False"}</p>
            <button onClick={handleDelete} className="btn btn-outline-danger">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDeleteUser;
