import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import api from '../../config/axiosConfig';
import LoginRegisterLeftImg from '../../components/common/LoginRegisterLeftImg';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== cPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await api.post(`/users/reset-password/${token}`, {
        password,
        cPassword
      });
      toast.success(response.data.message);
      setPassword("")
      setCPassword("")
      navigate('/login');
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <LoginRegisterLeftImg />
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">RESET PASSWORD</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                name="cpassword"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              RESET
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
