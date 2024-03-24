import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import HomePage from "./components/homepage";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import Contactus from "./components/contactus";
import About from "./components/about";
import OurCollections from "./components/ourCollections";
import Sneakers from "./components/sneakers";
import Hats from "./components/hat";
import SunGlasses from "./components/sunglasses";
import ProtectedRoute from "./components/protectedRoute";
import Adm from "./components/adm";
import AdminEditProduct from "./components/admEditProduct";
import AdminCreateProduct from "./components/admCreateProduct";
import AdminDeleteProduct from "./components/admDeleteProduct";
import Footer from "./components/commons/footer";
import Categories from "./components/categories";
import CheckOut from "./components/checkOut";
import Payments from "./components/payments";
import MyFavs from "./components/myFavorites";
import SearchResult from "./components/searchResult";
import AdminDeleteUser from "./components/admDeleteUser";
import AdminPatchUser from "./components/admPatchToAdm";
import MoreInfo from "./components/commons/moreInfo";
import AdminEditUser from "./components/admEditUser";
import UserEditUser from "./components/userEditUser";
import UserProfile from "./components/userProfile";
import UserDeleteUser from "./components/userDeleteUser";

function App() {
  
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projeto-final-curso" element={<HomePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/my-favorites" element={<MyFavs />} />
          <Route path="/collections" element={<OurCollections />} />
          <Route path="/more-info/:id" element={<MoreInfo />} />
          <Route path="/category/sneakers" element={<Sneakers />} />
          <Route path="/category/hats" element={<Hats />} />
          <Route path="/category/sunglasses" element={<SunGlasses />} />
          <Route path="/search-results" element={<SearchResult />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/check-out" element={<CheckOut />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/user-edit/:id" element={<UserEditUser />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route path="/user-delete/:id" element={<UserDeleteUser />} />
          <Route
            path="/adm"
            element={
              <ProtectedRoute onlyAdmin>
                <Adm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adm-edit-product/:id"
            element={
              <ProtectedRoute onlyAdmin>
                <AdminEditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adm-create-product"
            element={
              <ProtectedRoute onlyAdmin>
                <AdminCreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adm-delete-product/:id"
            element={
              <ProtectedRoute onlyAdmin>
                <AdminDeleteProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adm-delete-user/:id"
            element={
              <ProtectedRoute onlyAdmin>
                <AdminDeleteUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adm-edit-user/:id"
            element={
              <ProtectedRoute onlyAdmin>
                <AdminEditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patch-user-adm/:id"
            element={
              <ProtectedRoute onlyAdmin>
                <AdminPatchUser />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
