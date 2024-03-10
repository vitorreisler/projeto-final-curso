import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div className="container">
  <footer className="py-3 my-4">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><NavLink to={"/"} className="nav-link px-2 text-body-secondary">Home</NavLink></li>
      <li className="nav-item"><NavLink to={"/about"} className="nav-link px-2 text-body-secondary">About Us</NavLink></li>
      <li className="nav-item"><NavLink to={"/collections"} className="nav-link px-2 text-body-secondary">Our Collections</NavLink></li>
      <li className="nav-item"><NavLink to={"/contactus"} className="nav-link px-2 text-body-secondary">Contact Us</NavLink></li>
      <li className="nav-item"><NavLink to={"/categories"} className="nav-link px-2 text-body-secondary">Categories</NavLink></li>
    </ul>
    <p className="text-center text-body-secondary">© 2024 Casual<i className="bi bi-building"></i>City </p>
  </footer>
</div>
      );
}
 
export default Footer;