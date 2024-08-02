import React, {useEffect, useState} from "react";
import BreadCrumbWithButton from "../../../components/admin/BreadCrumbWithButton";
import {useLocation} from "react-router-dom";
import ReusableTable from "../../../components/admin/ReusableTable";
import {BsThreeDotsVertical} from "react-icons/bs";
import api from "../../../config/axiosConfig";
import {MdBlock} from "react-icons/md";
import {CgUnblock} from "react-icons/cg";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";
import BlockModal from "../../../components/admin/BlockModal";

const Customers = () => {
  const location = useLocation();
  const [userDetials, setUserDetials] = useState([]);
  const [confirmBlock, setConfirmBlock] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [blockButtonName, setBlockButtonName] = useState("");

  const columns = [
    {
      label: (
        <div>
          <BsThreeDotsVertical size={20} />
        </div>
      ),
      field: "clickbox",
    },
    {label: "Customer Name", field: "customerName"},
    {label: "Email", field: "email"},
    {label: "Phone Number", field: "phoneNumber"},
    {label: "Status", field: "status"},
    {label: "Action", field: "action"},
  ];

  const fetchUserDetials = async () => {
    try {
      const response = await api.get("users/customers");
      setUserDetials(response?.data?.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlockUser = (userId) => {
    const customer = userDetials.find(user => user._id === userId)
    console.log("this is from the customere page check customer", customer)
    setUserToDelete(userId)
    setConfirmBlock(true)
    setBlockButtonName(customer?.isVerified ? "Block" : "Unblock");
  }

  const confirmDeletion = async () => {
    try { 
      await api.put(`users/product-status/${userToDelete}`);
      setConfirmBlock(false)
      fetchUserDetials();
    } catch (error) {
      console.log(error);
    }
  };

//   const handleToggleStatus = async (id) => {
//     try { 
//       await api.put(`users/product-status/${id}`);
//       fetchUserDetials();
//     } catch (error) {
//       console.log(error);
//     }
//   };

  useEffect(() => {
    fetchUserDetials();
  }, []);

  console.log("this is frm the customer page userDetials", userDetials)
  const usersData = userDetials?.map((userData) => ({
    clickbox: (
      <div>
        <input
          type="checkbox"
          checked={userData?.isVerified}
        //   onChange={() => handleToggleStatus(userData?._id)}
          className="form-checkbox h-4 w-4 text-blue-600"
        />  
      </div>
    ),
    customerName: (
      <div className="flex items-center gap-2">
        {userData.image && (
          <img
            src={userData?.image}
            alt={userData.image}
            className="h-12 w-12 object-contain"
          />
        )}
        <div>
          {userData?.firstName} {userData?.lastName}
        </div>
      </div>
    ),
    email: userData?.email,
    phoneNumber: userData?.phoneNumber,
    status: (
      <div
        className={`text-center rounded-md py-1 font-semibold ${
          userData.isVerified
            ? "bg-green-100 text-green-500"
            : "bg-red-100 text-red-600"
        }`}
      >
        {userData.isVerified ? "Active" : "Inactive"}
      </div>
    ),
    action: (
      <div className="flex space-x-2 ml-3" onClick={() => handleBlockUser(userData?._id)}>
        {userData.isVerified ? (
          <MdBlock className="text-red-500 cursor-pointer text-xl text-center " />
        ) : (
          <CgUnblock className="text-green-500 cursor-pointer text-xl text-center " />
        )}
      </div>
    ),
  }));

  console.log("this is from the customers pg", userDetials);
  return (
    <div className="flex flex-col">
      <BreadCrumbWithButton
        componentLocation={"Customers"}
        location={location.pathname}
        noButton={false}
      />
      <div className="px-10">
        <ReusableTable columns={columns} data={usersData} />
      </div>

      <BlockModal open={confirmBlock} onClose={() => setConfirmBlock(false)} message={"Are you sure you want to modify this user?"}
        onConfirm={confirmDeletion}
        buttonName={blockButtonName}/>
    </div>
  );
};

export default Customers;
