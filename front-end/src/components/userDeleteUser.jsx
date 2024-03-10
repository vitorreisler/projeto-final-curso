import { useEffect, useState } from "react";
import userService from "../service/userService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth.context";

const UserDeleteUser = () => {
  const { id } = useParams();
  const {logout} = useAuth()
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    async function fetchData() {
      const resposta = await userService.getUserById(id);
      setUserProfile(resposta?.data);
    }
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try{
    await userService.deleteUser(id);
    logout()
    toast("Deleting User");
    setTimeout(() => {
      navigate("/");
    }, 2000);
} catch(err){
    console.log(err);
   toast.error(err.response?.data)
}
  };

  return (
    <section className="d-flex justify-content-center my-2 ">
        <ToastContainer/>
      <div className="card" style={{ width: "15rem" }}>
        <img
          className="card-img-top"
          src={userProfile.image?.url}
          alt={userProfile.image?.alt}
        />
        <div className="card-body">
          <h5 className="card-title">{userProfile.name?.first}</h5>
          <h6 className="card-title">{userProfile.name?.surname}</h6>
          <div className="card-text py-2 ">
            <p className="m-0">Email: {userProfile?.email}</p>
            <p className="m-0">Phone: {userProfile?.phone}</p>
            <p className="m-0">Id: {userProfile?._id}</p>
          </div>
          <div className="d-flex justify-content-center gap-4">
            <button onClick={handleDelete} className="btn btn-outline-danger">Delete</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDeleteUser;
