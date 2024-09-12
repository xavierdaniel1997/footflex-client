import React, {useState} from "react";
import {FcGoogle} from "react-icons/fc";
import LoginRegisterLeftImg from "../../components/common/LoginRegisterLeftImg";
import SignInWithGoogle from "../../components/common/SignInWithGoogle";
import {Link, useNavigate} from "react-router-dom";
import {validateLoginForm} from "../../utils/validateForms";
import {toast, Toaster} from "react-hot-toast";
import api from "../../config/axiosConfig";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [resetEmail, SetResetEmail] = useState("");
  const [forgotPsw, setForgotPsw] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateForm = validateLoginForm(formData);
    setErrors(validateForm);
    if (Object.keys(validateForm).length === 0) {
      try {
        const response = await api.post("users/login", formData);
        dispatch(setUser(response.data.userData));
        console.log("from the login page", response);
        toast.success(response.data.message);
        // navigate("/")
        response.data.userData.role === true
          ? navigate("/dashboard")
          : navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  const handleSumbitEmail = async () => {
    try{
      const response = await api.post("users/forgot-password", {email: resetEmail})
      toast.success(response?.data?.message)
      SetResetEmail("")
    }catch(error){
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <LoginRegisterLeftImg />
      
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        {!forgotPsw ? (
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              LOG-IN TO GET START
            </h2>

           
              <form onSubmit={handleSubmit}>
              <div className="mb-4">
                {errors.email && (
                  <p className="text-red-500 text-sm px-2">{errors.email}</p>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnchange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                {errors.password && (
                  <p className="text-red-500 text-sm px-2">{errors.password}</p>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleOnchange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                LOGIN
              </button>
              <SignInWithGoogle />
            </form>
            <div className="flex justify-between items-center mt-2">
              <p className="cursor-pointer" onClick={() => setForgotPsw(true)}>
                Forgot Password
              </p>
              <p className=" text-sm text-gray-600">
                Dont have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>)
          : (
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              RESET PASSWORD
            </h2>
            <div>
            <input
            type="email"
            placeholder="Email"
            name="email"
            value={resetEmail}
            onChange={(e) => SetResetEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
                type="submit"
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                onClick={handleSumbitEmail}
              >
                SUBMIT
              </button>
          </div>
          </div>
          )}
        </div>
  
    </div>
  );
};

export default LoginForm;
