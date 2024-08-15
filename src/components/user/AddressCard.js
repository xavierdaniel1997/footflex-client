import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {MdModeEditOutline, MdDeleteForever} from "react-icons/md";
import api from "../../config/axiosConfig";
import DefaultAddressModal from "./DefaultAddressModal";

const AddressCard = ({addressData, onAddressDelete, onAddressUpdate, toggleEditModal}) => {
  const [open, setOpen] = useState(false);
  const [openDefault, setOpenDefault] = useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDefault = () => {
    if (!addressData?.isDefaultAddress) {
      setOpenDefault(true);
    }
  };
  const handleCloseDefault = () => {
    setOpenDefault(false);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`users/remove-address/${addressData?._id}`);
      onAddressDelete(addressData?._id);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmDefault = async () => {
    console.log("hutennkdint", addressData?._id)
    try{
      await api.put(`/users/select-default-address/${addressData?._id}`)
      onAddressUpdate()
    }catch(error){
      console.log(error)
    }
  }

  // console.log("this is frm the address card", addressData);
  return (
    <div className="bg-white p-4 rounded-sm shadow-sm border mb-4">
      <div className="flex justify-between">
        <div className="flex items-center mb-2 gap-2">
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={addressData?.isDefaultAddress || false}
            onClick={handleClickOpenDefault}
          />
          <span className="font-semibold">{addressData?.customerName}</span>
          <span
            className={`text-xs font-semibold rounded ${
              addressData?.typeofPlace === "work"
                ? "text-red-600"
                : "text-teal-800"
            }`}
          >
            {addressData?.typeofPlace}
          </span>
        </div>
        <div className="flex gap-2">
          <button>
            <MdModeEditOutline size={22} className="text-gray-600" onClick={() => toggleEditModal(addressData?._id)}/>
          </button>
          <button>
            <MdDeleteForever
              size={22}
              className="text-gray-600"
              onClick={handleClickOpen}
            />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        {addressData?.address} <br /> {addressData?.locality}{" "}
        {addressData?.city} {addressData?.state} {addressData?.pinCode}
      </p>
      <p className="text-sm text-gray-600 mb-2">Mobile: {addressData?.phone}</p>
      <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">• Cash on Delivery available</p>
      {addressData?.isDefaultAddress && <p className="text-sm font-semibold text-green-600">Default Address</p>}
      </div>
     
      <DefaultAddressModal
        open={openDefault}
        onClose={handleCloseDefault}
        address={addressData}
        onConfirm={handleConfirmDefault}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this address?
          </DialogContentText>

          <DialogActions sx={{mt: 2}}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressCard;
