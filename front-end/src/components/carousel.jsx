import { Link } from "react-router-dom";

const Carousel = ({ hatMessage, sunGlassMessage, sneakersMessage }) => {
  return (
    <div
      id="carouselExampleControlsNoTouching"
      className="carousel slide shadow"
      data-bs-ride="carousel"
      data-bs-touch="true"
    >
      <div className="carousel-inner shadow">
        <div className="carousel-item active">
          <div className="img-carousel1">
            <div className="carousel-caption">
              <h1>Casual City Hats</h1>
              <p>{hatMessage}</p>
              <button className="btn btn-light">
                <Link to={"/category/hats"}   style={{ textDecoration: "none", color: "black" }}>
                  To the category
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="img-carousel2">
            <div className="carousel-caption">
              <h1>Casual City SunGlasses</h1>
              <p>{sunGlassMessage}</p>
              <button className="btn btn-light">
                {" "}
                <Link to={"/category/sunglasses"}  style={{ textDecoration: "none", color: "black" }}>
                  To the category
                </Link>{" "}
              </button>
            </div>
          </div>{" "}
        </div>
        <div className="carousel-item">
          <div className="img-carousel3">
            <div className="carousel-caption">
              <h1>Casual City Sneakers</h1>
              <p>{sneakersMessage}</p>
              <button className="btn btn-light">
                {" "}
                <Link to={"/category/sneakers"}  style={{ textDecoration: "none", color: "black" }}>
                  To the category
                </Link>{" "}
              </button>
            </div>
          </div>{" "}
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
