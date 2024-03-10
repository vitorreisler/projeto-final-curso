import { useLike } from "../context/like.context";
import Product from "./commons/product";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";


const MyFavs = () => {
  const { likedProducts } = useLike();
  const navigate = useNavigate()
  const {user} = useAuth()
  if(!user){
    navigate("/")
  }

  return (
    <section className="container">
      <h1 className="my-3 display-3">My Favs</h1>
      <div className="d-flex justify-content-evenly flex-wrap gap-2 my-3">
        {likedProducts.map((product) => 
         (<div
          key={product.productId}
          className={`${
            product.available !== -1 ? "" : "dontHaveProduct"
          }`}
        >
           <Product
            key={product.productId}
            productName={product.productName}
            productImg={product.productImage?.url}
            productDescription={product.productDescription}
            productPrice={product.productPrice}
            productSize={product.productSize}
            category={product.category}
            productId={product.productId}
            available={product.available}
          />
          </div>)
        )}
      </div>
    </section>
  );
};

export default MyFavs;
