import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  IconButton,
} from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { FaImage } from 'react-icons/fa';  
import { toast, Toaster } from 'react-hot-toast';
import api from "../../../config/axiosConfig"
import { useSelector } from 'react-redux';

const BrandForm = ({ open, handleClose }) => {
  const [brandName, setBrandName] = useState('');
  const [brandTitle, setBrandTitle] = useState('');
  const [brandLogo, setBrandLogo] = useState(null);
  
  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBrandLogo(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveBrand = async () => {
    console.log("this is from the brandform brandLOgo", brandLogo)
    try{
      const response = await api.post("/brand/addNewBrand", {
        brandName,
        brandTitle,
        logo: brandLogo
      })
      console.log("this is the resposne of addbrand", response)
      if(response.status===200){
        toast.success(response.data.message)
        setBrandLogo(null)
        setBrandName("")
        setBrandTitle("")
        handleClose()
      }
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle className="flex justify-between items-center pb-2">
        Add New Brand
        <IconButton onClick={handleClose} className="text-gray-500">
          <AiOutlineClose />
        </IconButton>
      </DialogTitle>
      <DialogContent className="pt-2">
        <Grid container spacing={2}>
          <Grid item xs={12} className="flex justify-center mb-4">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                {brandLogo ? (
                  <img src={brandLogo} alt="Brand Logo" className="object-contain" />
                ) : (
                  <FaImage className="text-gray-400 text-4xl" />
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="brandName"
              label="Brand Name"
              type="text"
              fullWidth
              variant="outlined"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="brandTitle"
              label="Brand Title"
              type="text"
              fullWidth
              variant="outlined"
              value={brandTitle}
              onChange={(e) => setBrandTitle(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="justify-end pb-5 mr-5">
        <Button
          onClick={handleSaveBrand}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            marginRight: '10px',
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
        >
          Save
        </Button>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BrandForm;
