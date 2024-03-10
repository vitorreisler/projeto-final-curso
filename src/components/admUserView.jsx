import { useNavigate } from "react-router-dom";
import { useLike } from "../context/like.context";
import userService from "../service/userService";

const AdmUserView = ({userName, userSurname , userId, userImg, isAdmin, userAlt,userEmail}) => {
    const navigate = useNavigate()
    const {userOn} = useLike()
    const handleEdit = async () => {
        await userService.getUserById(userId);
        navigate(`/adm-edit-user/${userId}`);
      };
      const handleDelete = async () => {
        await userService.getUserById(userId);
        navigate(`/adm-delete-user/${userId}`);
      };
  return (
    <div className="card text-center" style={{width: "15rem"}}>
      <img src={userImg} className="card-img-top" alt={userAlt} />
      <div className="card-body">
        <h6 className="card-title">Name: {userName}</h6>
        <h6 className="card-title">Surname: {userSurname}</h6>
        <span>Email: {userEmail}</span>
        <p className="card-text">
          UserId: {userId}
        </p>
        <p className="card-text">
          isAdmin: {isAdmin ? "True" : "False"}
        </p>
        {userOn?.isAdmin ? (
          <div className="d-flex justify-content-center gap-4">
            <button onClick={handleEdit} className="btn btn-warning">
              {" "}
              <i className="bi bi-pen"></i>{" "}
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              {" "}
              <i className="bi bi-trash"></i>{" "}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdmUserView;
