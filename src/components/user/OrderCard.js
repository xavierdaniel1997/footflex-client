import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const returnReasons = [
  "Size does not fit",
  "Wrong product delivered",
  "Product damaged",
  "Quality not as expected",
  "Changed my mind",
];

const OrderCard = ({
  productName,
  size,
  quantity,
  totalPrice,
  status,
  thumbnail,
  deliveryStatus,
  paymentMethod,
  orderDate,
  productBrand,
  handleCancelOrder,
  handleReturnOrder,
  orderId,
  productId,
  itemStatus,
}) => {
  const [open, setOpen] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);
  const [reason, setReason] = useState("");

  const onClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(true);
  };
  const onConfirm = () => {
    handleCancelOrder(orderId, productId);
    onClose();
  };

  const onCloseReturn = () => {
    setOpenReturn(false);
  };
  const handleReturnItem = () => {
    setOpenReturn(true);
  };
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const onConfirmReturn = () => {
    handleReturnOrder(orderId, productId, reason);
    setReason("");
    setOpenReturn(false);
  };

  // const navigte = useNavigate()
  // const handleRetryPayment = () => {
  //   navigte("/payment")
  // }

  return (
    <div className="mt-2 border rounded-md flex items-center h-40">
      <div className="flex items-center space-x-4 flex-1 h-full">
        <div className="w-44 h-full bg-gray-100 flex-shrink-0">
          <img
            src={thumbnail}
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p
            className="text-gray-600 font-semibold"
            style={{textTransform: "uppercase"}}
          >
            {productBrand}
          </p>
          <h2 className="font-semibold text-md">{productName}</h2>
          <p className="text-gray-500 text-sm">
            Size: {size} &nbsp; | &nbsp; Quantity: {quantity}
          </p>
        </div>
      </div>

      <div className="text-lg font-semibold text-green-600 text-center w-56">
        ₹{totalPrice}
      </div>

      <div className="text-right space-y-2 flex-1 pr-4 h-full flex flex-col justify-center">
        <div className="flex items-center justify-end space-x-2">
          <span className="text-sm text-gray-700">
            {itemStatus === "Active" ? "Pending" : itemStatus}
          </span>
        </div>
        <div className="flex items-center justify-end space-x-1 text-blue-600 cursor-pointer">
          <span>{paymentMethod}</span>
        </div>
       
        {deliveryStatus === "Payment Failed"? (
          <button
    className="font-semibold text-blue-600 flex items-center justify-end"
  >
    PAYMENT FAILED
  </button>
        ) : (
          itemStatus === "Delivered" ? (
            <button
              className="font-semibold text-green-600 flex items-center justify-end"
              onClick={handleReturnItem}
            >
              RETURN
            </button>
          ) : itemStatus === "Active" ? (
            <button
              className="font-semibold text-red-600 flex items-center justify-end"
              onClick={handleCancel}
            >
              CANCEL
            </button>
          ) : itemStatus === "Cancelled" ? (
            <button className="font-semibold text-red-600 flex items-center justify-end">
              CANCELLED
            </button>
          ) : null
        )}

        {/* {itemStatus === "Delivered" ? (
          <button
            className="font-semibold text-green-600 flex items-center justify-end"
            onClick={handleReturnItem}
          >
            RETURN
          </button>
        ) : itemStatus === "Active" ? (
          <button
            className="font-semibold text-red-600 flex items-center justify-end"
            onClick={handleCancel}
          >
            CANCEL
          </button>
        ) : itemStatus === "Cancelled" ? (
          <button className="font-semibold text-red-600 flex items-center justify-end">
            CANCELLED
          </button>
        ) : null} */}
      </div>

      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{"Cancel Order"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this order?
          </DialogContentText>
          <DialogActions sx={{mt: 3}}>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog open={openReturn} onClose={onCloseReturn}>
        <DialogTitle>{"Return Order"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a reason for returning this order.
          </DialogContentText>

          {/* Dropdown for return reasons */}
          <FormControl fullWidth sx={{mt: 2}}>
            <InputLabel id="return-reason-label">Reason for Return</InputLabel>
            <Select
              labelId="return-reason-label"
              id="return-reason"
              value={reason}
              onChange={handleReasonChange}
              label="Reason for Return"
            >
              {returnReasons.map((reason, index) => (
                <MenuItem key={index} value={reason}>
                  {reason}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DialogActions sx={{mt: 3}}>
            <Button onClick={onCloseReturn}>Cancel</Button>
            <Button
              onClick={onConfirmReturn}
              color="primary"
              disabled={!reason}
            >
              Confirm
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderCard;
