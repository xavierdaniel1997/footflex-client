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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/otp" element={<OTPVerification />} />
        {/* userRoutes */}
        <Route element={<ProtectedUser />}>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="userProfile/*" element={<UserProfilePage />} />
            </Route>
          </Route>
        </Route>
        {/* adminRoutes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedAdmin />}>
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
