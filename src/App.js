import {BrowserRouter, Route, Routes} from "react-router-dom";
import OTPVerification from "./pages/common/OTPVerification";
import UserLayout from "./layout/UserLayout";
import HomePage from "./pages/user/HomePage";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Product/Products";
import Orders from "./pages/admin/Order/Orders";
import RegisterForm from "./pages/common/RegisterForm";
import LoginForm from "./pages/common/LoginForm";
import UserProfilePage from "./pages/user/UserProfilePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProtectedAdmin from "./utils/ProtectedAdmin";
import ProtectedUser from "./utils/ProtectedUser";
import Category from "./pages/admin/Category";
import {Toaster} from "react-hot-toast";
import BrandPage from "./pages/admin/BrandPage";
import ProductForm from "./components/admin/ProductComponent/ProductForm";
import Customers from "./pages/admin/Customers/Customers";
import ProductDetials from "./pages/user/ProductDetials";
import ShopPage from "./pages/user/ShopPage";
import WishList from "./pages/user/WishList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWishList } from "./redux/wishListSlice";
import CartPage from "./pages/user/CartPage";
import { fetchCartDetails } from "./redux/cartSlice";
import DeliveryDetails from "./pages/user/DeliveryDetails";
import PaymentPage from "./pages/user/PaymentPage";
import EditOrder from "./pages/admin/Order/EditOrder";
import CouponsPage from "./pages/admin/CouponsPage";
import OfferPage from "./pages/admin/OfferPage";
import SalesReportPage from "./pages/admin/SalesReportPage";
import ResetPassword from "./pages/common/ResetPassword";
import ViewOrderDetials from "./pages/user/ViewOrderDetials";
import RetryPayment from "./components/user/RetryPayment";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishList());
    dispatch(fetchCartDetails())
  }, [dispatch]);

  return (
    
    <BrowserRouter> 
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route path="/otp" element={<OTPVerification />} />

        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<ShopPage showFilter={false}/>} />
          <Route path="/menshop" element={<ShopPage gender={"Men"} />} />
          <Route path="/womenshop" element={<ShopPage gender={"Women"} />} />
          <Route path="/kidshop" element={<ShopPage gender={"Kids"} />} />
          <Route path="/productDetials/:id" element={<ProductDetials />} />
        </Route>
        {/* userRoutes */}
        <Route element={<ProtectedUser />}>
          <Route path="/" element={<UserLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="userProfile/*" element={<UserProfilePage />} />
              <Route path="/wishList" element={<WishList/>}/>
              <Route path="/cart" element={<CartPage/>}/>
              <Route path="/address" element={<DeliveryDetails/>} />
              <Route path="/payment" element={<PaymentPage/>}/>
              <Route path="/payment-failed/:orderId" element={<RetryPayment/>}/>
              <Route path="/view-order-detial/:orderId" element={<ViewOrderDetials/>}/>
            </Route>
          </Route>
        </Route>
        {/* adminRoutes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedAdmin />}>
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="addNewProduct" element={<ProductForm />} />
              <Route path="editproduct/:productId" element={<ProductForm />} />
              <Route path="customers" element={<Customers />} />
              <Route path="sales-report" element={<SalesReportPage/>} />
              <Route path="orders" element={<Orders />} />
              <Route path="editOrder/:orderId" element={<EditOrder/>}/>
              <Route path="category" element={<Category />} />
              <Route path="brand" element={<BrandPage />} />
              <Route path="coupons" element={<CouponsPage/>} />
              <Route path="offers" element={<OfferPage/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
