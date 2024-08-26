import React, {useEffect, useState} from "react";
import BreadCrumbWithButton from "../../components/admin/BreadCrumbWithButton";
import {useLocation} from "react-router-dom";
import ReusableTable from "../../components/admin/ReusableTable";
import CouponModal from "../../components/admin/CouponModal";
import api from "../../config/axiosConfig";
import {MdDeleteOutline} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {fetchCoupons, removeCoupon} from "../../redux/couponSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const CouponsPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {coupons, loading, error} = useSelector((state) => state.coupons);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState(null);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleRemoveCoupon = (couponId) => {
    setSelectedCouponId(couponId);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeCoupon(selectedCouponId));
    setOpenConfirm(false);
    setSelectedCouponId(null);
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
    setSelectedCouponId(null);
  };

  const columns = [
    {label: "Coupon Name", field: "couponName"},
    {label: "Coupon Code", field: "couponCode"},
    {label: "Starting Date", field: "startDate"},
    {label: "Ending Date", field: "endDate"},
    {label: "Discount", field: "discount"},
    {label: "Min Purchase Amount", field: "minPurchaseAmount"},
    {label: "Max Purchase Amount", field: "maxPurchaseAmount"},
    {label: "Action", field: "action"},
  ];

  const couponData = coupons?.map((coupon) => ({
    couponName: coupon?.couponName,
    couponCode: coupon?.couponCode,
    startDate: new Date(coupon?.startDate).toLocaleDateString(),
    endDate: new Date(coupon?.endDate).toLocaleDateString(),
    discount: <div>{coupon?.discount} %</div>,
    minPurchaseAmount: coupon?.minPurchaseAmount,
    maxPurchaseAmount: coupon?.maxDiscountAmount,
    action: (
      <div>
        <MdDeleteOutline
          className="text-red-500 cursor-pointer text-xl"
          onClick={() => handleRemoveCoupon(coupon?._id)}
        />
      </div>
    ),
  }));

  return (
    <div className="flex flex-col">
      <BreadCrumbWithButton
        buttonName={"Add New Coupon"}
        noButton={true}
        componentLocation={"All Coupons"}
        location={location.pathname}
        onClick={() => setOpen(true)}
      />
      <div className="px-10">
        <ReusableTable
          columns={columns}
          data={couponData}
          //   page={page}
          //   rowsPerPage={limit}
          //   totalCount={totalCount}
          //   onPageChange={handlePageChange}
          //   isPagination={true}
        />
      </div>
      <CouponModal open={open} handleClose={() => setOpen(false)} />

      <Dialog open={openConfirm} onClose={handleCancelDelete}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this coupon?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CouponsPage;
