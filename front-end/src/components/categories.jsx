import hatCategory from "../images/hatCategories.jpg";
import sunGlassCategory from "../images/sunGlassCategories.jpg";
import sneakersCategory from "../images/sneakersCategories.jpg";
import { Link } from "react-router-dom";
const Categories = () => {
  const imgCategory = [
    {
      img: hatCategory,
      categoryName: "Hats",
      alt: "Hat Category",
      to: "/category/hats",
    },
    {
      img: sunGlassCategory,
      categoryName: "SunGlasses",
      alt: "SunGlass Category",
      to: "/category/sunglasses",
    },
    {
      img: sneakersCategory,
      categoryName: "Sneakers",
      alt: "Sneakers Category",
      to: "/category/sneakers",
    },
  ];
  return (
    <div className="container d-flex justify-content-evenly flex-wrap border p-5 my-5">
      {imgCategory.map((item) => {
        return (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={item.to}
            key={item.categoryName}
          >
            <h3>{item.categoryName}</h3>
            <img
              className="categoriesImg rounded my-2"
              src={item.img}
              alt={item.alt}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
