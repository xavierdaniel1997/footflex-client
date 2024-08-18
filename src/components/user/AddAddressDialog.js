import React, {useEffect, useState} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Grid,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import {IoMdClose} from "react-icons/io";
import {validateAddressForm} from "../../utils/validateForms";
import {toast, Toaster} from "react-hot-toast";
import api from "../../config/axiosConfig";

const AddAddressDialog = ({open, onClose, addressData, editMode}) => {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    pinCode: "",
    typeofPlace: "home",
    isDefaultAddress: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editMode && addressData) {
      setFormData({
        customerName: addressData.customerName || "",
        phone: addressData.phone || "",
        address: addressData.address || "",
        locality: addressData.locality || "",
        city: addressData.city || "",
        state: addressData.state || "",
        pinCode: addressData.pinCode || "",
        typeofPlace: addressData.typeofPlace || "home",
        isDefaultAddress: addressData.isDefaultAddress || false,
      });
    } else {
      setFormData({
        customerName: "",
        phone: "",
        address: "",
        locality: "",
        city: "",
        state: "",
        pinCode: "",
        typeofPlace: "home",
        isDefaultAddress: false,
      });
    }
  }, [editMode, addressData, open]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRadioButton = (e) => {
    setFormData({
      ...formData,
      typeofPlace: e.target.value,
    });
  };
  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isDefaultAddress: e.target.checked,
    });
  };

  const handleSubmitForm = async () => {
    const validateForm = validateAddressForm(formData);
    setErrors(validateForm);
    if (Object.keys(validateForm).length === 0) {
      try {
        let response;
        if(editMode){
          response = await api.put(`/users/update-address/${addressData._id}`, formData)
        }else{
          response = await api.post("/users/add-new-address", formData);
        }
        // const response = await api.post("/users/add-new-address", formData);
        toast.success(response?.data?.message);
        onClose();
        setFormData({
          customerName: "",
          phone: "",
          address: "",
          locality: "",
          city: "",
          state: "",
          pinCode: "",
          typeofPlace: "home",
          isDefaultAddress: false,
        });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{fontWeight: "bold", fontSize: "1.2rem", textAlign: "center"}}
      >
        {editMode ? "EDIT ADDRESS" : "ADD NEW ADDRESS" }
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <IoMdClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Name*"
          variant="outlined"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChange}
          error={!!errors.customerName}
          helperText={errors.customerName}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mobile No*"
          variant="outlined"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Pin Code*"
          variant="outlined"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleInputChange}
          error={!!errors.pinCode}
          helperText={errors.pinCode}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address (House No, Building, Street, Area)*"
          variant="outlined"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          error={!!errors.address}
          helperText={errors.address}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Locality / Town*"
          variant="outlined"
          name="locality"
          value={formData.locality}
          onChange={handleInputChange}
          error={!!errors.locality}
          helperText={errors.locality}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="City / District*"
              variant="outlined"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="State*"
              variant="outlined"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid>
        </Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isDefaultAddress}
              onChange={handleCheckboxChange}
            />
          }
          label="Make this my default address"
          sx={{mt: 2}}
        />
        <FormLabel component="legend" sx={{mt: 2}}>
          Address Type*
        </FormLabel>
        <RadioGroup
          row
          aria-label="address-type"
          name="address-type"
          sx={{mt: 1}}
          value={formData.typeofPlace}
          onChange={handleRadioButton}
        >
          <FormControlLabel value="home" control={<Radio />} label="Home" />
          <FormControlLabel value="work" control={<Radio />} label="Work" />
        </RadioGroup>
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            textTransform: "uppercase",
            backgroundColor: "black",
            padding: "8px",
            "&:hover": {
              backgroundColor: "#1f1f1f",
            },
          }}
          onClick={handleSubmitForm}
        >
          {editMode ? "Update Address" : "Add Address"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressDialog;
