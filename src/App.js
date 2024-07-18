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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/otp" element={<OTPVerification />} />

        {/* user routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* admin routes */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products/>}/>
          <Route path="orders" element={<Orders/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
