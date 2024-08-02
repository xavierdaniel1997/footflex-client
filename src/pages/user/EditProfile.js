import React, { useState } from 'react';
import { FaUser, FaPhone, FaCamera } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import api from '../../config/axiosConfig';

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [imageError, setImageError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageType = ['image/png', 'image/jpeg']; 
      if (validImageType.includes(file.type)) {
        const reader = new FileReader();
        reader.onload= (e) => {
          setProfileImage(e.target.result); 
          setImageError(""); 
        };
        reader.readAsDataURL(file);
      } else {
        setImageError("Upload a PNG or JPEG file");
      }
    }
  };

  const handleSubmit = async () => {
    try{
        const response = await api.put("users/update-user-detials", {
            firstName,
            lastName,
            phoneNumber: phone,
            dpImage: profileImage
        })
        console.log("this is the response of update user detials", response)
        toast.success(response.data.message)
        setFirstName("")
        setLastName("")
        setPhone("")
        setProfileImage(null)
    }catch(error){
        console.log(error)
        toast.error(error?.response?.data?.message)
    }
  }
  console.log(profileImage)

 
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      
      <div className="mb-6">
        <div className="relative inline-block">
          {profileImage ? (
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-400 text-4xl" />
            </div>
          )}
          <label htmlFor="imageUpload" className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
            <FaCamera className="text-white" />
          </label>
          <input 
            type="file" 
            id="imageUpload" 
            className="hidden" 
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        {imageError && <p className="text-red-500 mt-2">{imageError}</p>} {/* Display error message if any */}
      </div>

      {/* First Name Input */}
      <div className="mb-4 w-96">
        <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaUser className="text-gray-400" />
          </span>
          <input 
            type="text"
            id="firstName"
            className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>

      {/* Last Name Input */}
      <div className="mb-4 w-96">
        <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaUser className="text-gray-400" />
          </span>
          <input 
            type="text"
            id="lastName"
            className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      {/* Phone Input */}
      <div className="mb-6 w-96">
        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaPhone className="text-gray-400" />
          </span>
          <input 
            type="tel"
            id="phone"
            className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button 
        className="bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300 px-10"
        onClick={handleSubmit}
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
