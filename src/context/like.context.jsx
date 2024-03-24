import { createContext, useContext, useState, useEffect } from "react";
import productService from "../service/productService";
import { useAuth } from "./auth.context";

const likeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);
  const { getUser } = useAuth();
  const [userOn, setUserOn] = useState("");

  useEffect(() => {
    const userOnline = getUser();
    setUserOn(userOnline);

    const fetchData = async () => {
      if (!userOnline) {
        console.log("User not online");
        return null;
      }
      try {
        const products = await productService.getAllProducts();
        const userLikedProducts = products.filter((product) =>
          product.likes.includes(userOnline._id)
        );
        setLikedProducts(userLikedProducts);
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };

    fetchData();
  }, [getUser]);

  const addFavorite = async (id) => {
    try {
      // API REQUEST FOR LIKE
      await productService.likeProduct(id);

      // Fetch the updated product after liking
      const updatedProduct = await productService.getProductById(id);

      // Update the state with the latest liked products
      setLikedProducts((prevLikedProducts) => [
        ...prevLikedProducts,
        updatedProduct,
      ]);
    } catch (error) {
      console.error("Error liking product:", error);
    }
  };

  const removeFavorite = async (productId) => {
    try {
      // API REQUEST FOR UNLIKE
      await productService.likeProduct(productId);
      // REMOVE THE LIKE FROM THE STATE
      setLikedProducts(
        (prevLikedProducts) =>
          prevLikedProducts.filter((product) => product.productId !== productId)
        //console.log(prevLikedProducts)
      );
    } catch (error) {
      console.error("Error unliking product:", error);
    }
  };

  const contextValue = {
    likedProducts,
    addFavorite,
    removeFavorite,
    userOn,
  };

  return (
    <likeContext.Provider value={contextValue}>{children}</likeContext.Provider>
  );
};

export const useLike = () => {
  const context = useContext(likeContext);
  if (!context) {
    throw new Error("useLike must be used within a LikeProvider");
  }
  return context;
};
