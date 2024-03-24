import { Fragment, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useLike } from "../context/like.context";
import { useCart } from "../context/cart.context";
import SearchBar from "./commons/searchBar";
import userService from "../service/userService";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { userOn } = useLike();
  const { total, productWithPrice } = useCart();
  const navigate = useNavigate();

  const handleUser = async () => {
    await userService.getUserById(userOn._id);
    await navigate(`/user-profile/${userOn._id}`);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      aria-label="Third navbar example"
    >
      <div className="container-fluid">
        <NavLink to={"/"} className="navbar-brand">
          <span>
            Casual <i className="bi bi-building-fill"></i> City
          </span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link" aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/about"} className="nav-link" aria-current="page">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/collections"} className="nav-link">
                Our Collections
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/contactus"} className="nav-link">
                Contact Us
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <Link to={"/category/hats"} className="dropdown-item">
                    Hats
                  </Link>
                </li>
                <li>
                  <Link to={"/category/sneakers"} className="dropdown-item">
                    Sneakers
                  </Link>
                </li>

                <li>
                  <Link to={"/category/sunglasses"} className="dropdown-item">
                    Glasses
                  </Link>
                </li>
              </ul>
            </li>
            {userOn && (
              <>
                <li className="text-light">
                  {" "}
                  <NavLink to={"/my-favorites"} className={"nav-link"}>
                    {" "}
                    My Favs
                  </NavLink>
                </li>
                <li className="text-light ">
                  <NavLink
                    to={`/user-profile/${userOn._id}`}
                    onClick={handleUser}
                    /*onClick={handleUserEdit} to={"/user-edit/:id"} */ className={
                      "nav-link"
                    }
                  >
                    <i className="bi bi-person-circle" />
                  </NavLink>
                </li>
              </>
            )}
            <SearchBar />
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <li className="nav-item">
                <NavLink onClick={logout} className="nav-link">
                  Sign-Out
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to={"/sign-up"} className="nav-link">
                    Sign-Up
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to={"/sign-in"} className="nav-link">
                    Sign-In
                  </NavLink>
                </li>
              </>
            )}
            {userOn ? (
              <ul className="d-flex mb-0 list-unstyled ">
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i role="button" className="bi bi-cart-fill  p-3 rounded" />
                  </NavLink>
                  <ul className="dropdown-menu dropdown-menu-car text-center  ">
                    {productWithPrice.map((item) => (
                      <Fragment key={item.productId}>
                        <div className="d-flex checkout-cart-menu">
                          <img
                            className="cart-img my-2 "
                            src={item.productImg}
                            alt=""
                          />
                          <div className=" flex-column">
                            <li>Item: {item.productName} </li>
                            <li>Qtty: {item.counter}</li>
                            <li>Price: ${item.productPrice}</li>
                            <hr />
                          </div>
                        </div>
                      </Fragment>
                    ))}
                    <span> Total: ${total} </span>
                    {total ? (
                      <button
                        onClick={() => navigate("/check-out")}
                        className="btn btn-success my-1"
                      >
                        CheckOut
                      </button>
                    ) : (
                      ""
                    )}
                  </ul>
                </li>
                {<li className="ms-5 my-auto text-light"> Total: ${total} </li>}
              </ul>
            ) : (
              ""
            )}

            {userOn?.isAdmin ? (
              <li className="nav-item adm">
                <NavLink to={"/adm"} className="nav-link" aria-current="page">
                  ADM
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
