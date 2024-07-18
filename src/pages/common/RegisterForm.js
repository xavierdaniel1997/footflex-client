import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import LoginRegisterLeftImg from "../../components/common/LoginRegisterLeftImg";
import SignInWithGoogle from "../../components/common/SignInWithGoogle";
import {validateRegisterForm} from "../../utils/validateForms";
import api from "../../config/axiosConfig";
import { toast, Toaster } from 'react-hot-toast';

const RegisterForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    cPassword: "",
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateForm = validateRegisterForm(formData);
    setErrors(validateForm);
    console.log("registeForm ", formData);
    if (Object.keys(validateForm).length === 0) {
      try {
        const response = await api.post("/users/register", formData);
        console.log(response?.data?.message)
        if(response.status === 200){
          sessionStorage.setItem("userEmail", formData.email)
          navigate("/otp")
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <LoginRegisterLeftImg />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between">
              <div className="mb-4">
                {errors.firstName && (
                  <p className="text-red-500 text-sm px-2">
                    {errors.firstName}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                {errors.lastName && (
                  <p className="text-red-500 text-sm px-2">{errors.lastName}</p>
                )}
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              {errors.email && (
                <p className="text-red-500 text-sm px-2">{errors.email}</p>
              )}
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm px-2">
                  {errors.phoneNumber}
                </p>
              )}
              <input
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
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
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
            P@ssw0rd!{errors.cPassword && (
                <p className="text-red-500 text-sm px-2">{errors.cPassword}</p>
              )}
              <input
                type="password"
                placeholder="Confirm Password"
                name="cPassword"
                value={formData.cPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              REGISTER
            </button>

            <SignInWithGoogle />
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login
            </Link>
       
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
