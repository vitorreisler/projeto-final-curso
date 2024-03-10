import { createContext, useContext,useEffect,useState } from "react";

const cartContext = createContext()

export function CartProvider({children}){
    const [parcial, setParcial] = useState([])
    const [productWithPrice, setProductWithPrice,] = useState([])
    const [total, setTotal] = useState([]);

    useEffect(() => {
        function totalize() {
          setTotal(parcial.reduce((total, amount) => total + amount, 0));
        }
        totalize();
      }, [parcial, setTotal]);

    return (
        <cartContext.Provider value={{
            setParcial,
            setProductWithPrice,
            setTotal,
            total,
            parcial,
            productWithPrice,
        }}>
            {children}
        </cartContext.Provider>
    )

}

export const useCart = ()=> useContext(cartContext)