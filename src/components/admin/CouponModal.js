import React, {useState} from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import {AiFillCloseCircle} from "react-icons/ai";
import {IoMdCalendar} from "react-icons/io";
import {validateCouponForm} from "../../utils/validateForms";
import toast from "react-hot-toast";
import api from "../../config/axiosConfig";
import {addCoupon, fetchCoupons} from "../../redux/couponSlice";
import {useDispatch} from "react-redux";

const CouponModal = ({open, handleClose, onAddCoupon}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    couponName: "",
    couponCode: "",
    startDate: "",
    endDate: "",
    discount: "",
    minPurchaseAmount: "",
    maxDiscountAmount: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const generateCouponCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 12; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleGenerateCode = () => {
    const newCode = generateCouponCode();
    setFormData({couponCode: newCode});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmint = async () => {
    const formErrors = validateCouponForm(formData);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      try {
        const resultAction = await dispatch(addCoupon(formData)).unwrap();
        dispatch(fetchCoupons())
        toast.success("Coupon added successfully");
        handleClose();
        setFormData({
          couponName: "",
          couponCode: "",
          startDate: "",
          endDate: "",
          discount: "",
          minPurchaseAmount: "",
          maxDiscountAmount: "",
          description: "",
        });
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="coupon-modal-title"
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{position: "absolute", right: 8, top: 8, color: "grey.500"}}
        >
          <AiFillCloseCircle size={30} />
        </IconButton>

        <Typography variant="h6" component="h2" sx={{mb: 2}}>
          Add Coupon
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{mt: 3}}>
          <Box sx={{display: "flex", alignItems: "center", mb: 2}}>
            <TextField
              label="Coupon Code"
              name="couponCode"
              value={formData.couponCode}
              onChange={handleChange}
              fullWidth
              sx={{mr: 2}}
              error={!!errors.couponCode}
              helperText={errors.couponCode}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{height: "56px"}}
              onClick={handleGenerateCode}
            >
              Generate Code
            </Button>
          </Box>
          <TextField
            label="Coupon Name"
            placeholder="Coupon Name"
            name="couponName"
            value={formData.couponName}
            onChange={handleChange}
            fullWidth
            sx={{mb: 2}}
            error={!!errors.couponName}
            helperText={errors.couponName}
          />
          <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
            <TextField
              label="Starting Date"
              type="date"
              //   defaultValue={currentDate}
              inputProps={{min: currentDate}}
              InputLabelProps={{shrink: true}}
              sx={{width: "48%", cursor: "pointer"}}
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              error={!!errors.startDate}
              helperText={errors.startDate}
            />
            <TextField
              label="Ending Date"
              type="date"
              //   defaultValue={currentDate}
              inputProps={{min: currentDate}}
              InputLabelProps={{shrink: true}}
              sx={{width: "48%", cursor: "pointer"}}
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              error={!!errors.endDate}
              helperText={errors.endDate}
            />
          </Box>
          <TextField
            label="Discount in Percentage"
            fullWidth
            sx={{mb: 2}}
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            error={!!errors.discount}
            helperText={errors.discount}
          ></TextField>
          <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
            <TextField
              label="Min Purchase Amount"
              placeholder="₹1000"
              fullWidth
              sx={{mr: 3}}
              name="minPurchaseAmount"
              value={formData.minPurchaseAmount}
              onChange={handleChange}
              error={!!errors.minPurchaseAmount}
              helperText={errors.minPurchaseAmount}
            />

            <TextField
              label="Max Discount Amount"
              placeholder="₹1000"
              fullWidth
              sx={{mb: 2}}
              name="maxDiscountAmount"
              value={formData.maxDiscountAmount}
              onChange={handleChange}
              error={!!errors.maxDiscountAmount}
              helperText={errors.maxDiscountAmount}
            />
          </Box>
          <TextField
            label="Description"
            multiline
            rows={3}
            placeholder="Description"
            fullWidth
            sx={{mb: 4}}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Box sx={{display: "flex", justifyContent: "end", gap: "1rem"}}>
            <Button
              variant="contained"
              color="primary"
              sx={{bgcolor: "black"}}
              onClick={handleSubmint}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{color: "black", borderColor: "black"}}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export default CouponModal;
