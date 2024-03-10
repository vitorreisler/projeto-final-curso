import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/auth.context";

import userService from "../service/userService";

const UserProfile = () => {
  const {id} = useParams()
  const {user} = useAuth()
  const navigate = useNavigate()
  const [userProfile, setUserProfile] = useState({})
  useEffect(() => {
    async function fetchData(){
        const resposta = await userService.getUserById(id)
        setUserProfile(resposta?.data)
    }
    fetchData()
  },[id])

  if(!user){
    navigate("/")
  }

  const handleEdit = async () => {
    await userService.getUserById(id);
    navigate(`/user-edit/${id}`);
  };

  const handleDelete = async () => {
    await userService.getUserById(id);
    navigate(`/user-delete/${id}`);
  };

  return (
    <section className="d-flex justify-content-center my-2 ">
        <div className="card" style={{width: "15rem"}}>
          <img className="card-img-top" src={userProfile.image?.url} alt={userProfile.image?.alt} />
          <div className="card-body">
            <h5 className="card-title">{userProfile.name?.first}</h5>
            <h6 className="card-title">{userProfile.name?.surname}</h6>
            <div className="card-text py-2 ">
              <p className="m-0">Email: {userProfile?.email}</p>
              <p className="m-0">Phone: {userProfile?.phone}</p>
              <p className="m-0">Id: {userProfile?._id}</p>
            </div>
            <div className="d-flex justify-content-center gap-4">
            <button onClick={handleEdit}  className="btn btn-warning">
              {" "}
              <i className="bi bi-pen"></i>{" "}
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              {" "}
              <i className="bi bi-trash"></i>{" "}
            </button>
          </div>
          </div>
        </div>
    </section>
  );
};

export default UserProfile;
