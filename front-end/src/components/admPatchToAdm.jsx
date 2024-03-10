import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "../service/userService";

const AdminPatchUser = () => {
  const [userToAdm, setUserToAdm] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const handlePatch = async () => {
    await userService.patchUserAdminStatus(id);
    if(userToAdm.isAdmin){
    toast("Turning ADM to Regular User");
    setTimeout(() => {
      navigate("/adm");
    }, 4000);
    return
    }
    toast("Turning Regular User to ADM");
    setTimeout(() => {
      navigate("/adm");
    }, 4000);
  };
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await userService.getUserById(id);
      setUserToAdm(data);
    };
    fetchData();
  }, [id]);
  return (
    <div className="d-flex justify-content-center my-5">
      <ToastContainer />
      {userToAdm && (
        <div className="card text-center" style={{ width: "16rem" }}>
          <img
            className="card-img-top"
            src={userToAdm.image?.url}
            alt={userToAdm.userImage?.alt}
          />
          <div className="card-body">
            <h5 className="card-title">Name: {userToAdm.name?.first}</h5>
            <p className="card-text"> Surname: {userToAdm.name?.surname}</p>
            <p className="card-text">Id: {userToAdm._id}</p>
            <p className="card-text">Email: {userToAdm.email}</p>
            <p className="card-text">Is Admin: {userToAdm.isAdmin ? "True" : "False"}</p>
            <button onClick={handlePatch} className="btn btn-outline-success">
              TURN ON/OFF ADM
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPatchUser;
