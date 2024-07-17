import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/common/Login";
import OTPVerification from "./pages/common/OTPVerification";
import Register from "./pages/common/Register";

 

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/otp" element={<OTPVerification/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;   
