import React, {useEffect, useState} from "react";
import {
  Modal,
  Box,
  Typography,
  Button, 
  Checkbox,
  IconButton,
} from "@mui/material";
import {FaTimes, FaCheckSquare, FaSquare} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";
import api from "../../config/axiosConfig";
import {applyCouponPricingDetails, fetchAvailableCoupons, getCheckoutDetials, selectCoupon} from "../../redux/couponSlice";
import {useDispatch, useSelector} from "react-redux";

const CouponModal = ({open, onClose, totalPrice}) => {
  const dispatch = useDispatch();
  const {coupons, selectedCoupon} = useSelector((state) => state.coupons);



  useEffect(() => {
    if (open) {
      dispatch(fetchAvailableCoupons(totalPrice));
    }
  }, [open, totalPrice]);


  const handleCouponSelect = (coupon) => {
    if (selectedCoupon?._id === coupon._id) {
      dispatch(selectCoupon(null)); 
    } else {
      dispatch(selectCoupon(coupon)); 
    }
  };



  // const handleApplyCoupon = () => {
  //   if (selectedCoupon) {
  //     dispatch(applyCouponPricingDetails(selectedCoupon._id))
  //     // dispatch(getCheckoutDetials())
  //     .then(() => {
  //       onClose(); 
  //     });
  //   }
  // };


  const handleApplyCoupon = () => {
    if (selectedCoupon) {
      dispatch(applyCouponPricingDetails(selectedCoupon._id))
        .then(() => {
          return dispatch(getCheckoutDetials());
        })
        .then(() => {
          onClose(); 
        });
    }
  };
  

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="apply-coupon-title"
      aria-describedby="apply-coupon-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {/* Modal Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          borderBottom={1}
          borderColor="divider"
        >
          <Typography>APPLY COUPON</Typography>
          <IconButton onClick={onClose}>
            <IoMdClose size={24} />
          </IconButton>
        </Box>

        {/* Coupon Card */}
        {coupons.map((coupon) => (
          <CouponCard
            key={coupon._id}
            coupon={coupon}
            isSelected={selectedCoupon?._id === coupon._id}
            onSelect={handleCouponSelect}
          />
        ))}

        {/* Footer */}
        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="grey.100"
        >
          <Typography variant="body2" color="textPrimary">
            Maximum savings:{" "}
            <Typography component="span" variant="body1" fontWeight="bold">
                00.00
            </Typography>
          </Typography>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
            onClick={handleApplyCoupon}
          
          >
            APPLY
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CouponModal;

const CouponCard = ({coupon, isSelected, onSelect}) => {
  return (
    <div className="flex items-start py-5 px-3">
      <input
        type="checkbox"
        className="form-checkbox text-primary-600 mt-2"
        checked={isSelected}
        onClick={() => onSelect(coupon)}
      />
      <div className="ml-2">
        <div className="flex items-center mb-2">
          <div className="bg-green-50 text-green-600 px-2 py-1 rounded-sm mr-2 text-sm">
            {coupon?.couponName}
          </div>
          <div className="bg-red-50 text-red-600 px-2 py-1 rounded-sm text-sm">
            CODE: {coupon?.couponCode}
          </div>
        </div>
        <p className="font-bold text-gray-900 text-sm">
          Save ₹{coupon?.maxDiscountAmount}
        </p>
        <p className="text-gray-700 text-sm">
          {coupon?.discount}% off up to Rs. {coupon?.maxDiscountAmount} on
          minimum purchase of Rs. {coupon?.minPurchaseAmount}.
        </p>
        <p className="text-gray-500 text-xs">
          Expires on: {new Date(coupon?.endDate).toLocaleDateString()} at 11:59
          PM
        </p>
      </div>
    </div>
  );
};
