import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/common/Login";
import OTPVerification from "./pages/common/OTPVerification";
import Register from "./pages/common/Register";
import UserLayout from "./layout/UserLayout";
import HomePage from "./pages/user/HomePage";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Product/Products";
import Orders from "./pages/admin/Order/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
