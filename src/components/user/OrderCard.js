import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, {useState} from "react";

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
  orderId,
  productId,
  itemStatus,
}) => {
  const [open, setOpen] = useState(false);

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

  return (
    <div className="mt-4 border rounded-md flex items-center h-40">
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
          <span className="text-sm text-gray-700">{deliveryStatus}</span>
        </div>
        <p className="text-sm text-gray-500">
          {new Date(orderDate).toLocaleDateString()}
        </p>
        <div className="flex items-center justify-end space-x-1 text-blue-600 cursor-pointer">
          <span>{paymentMethod}</span>
        </div>
        {itemStatus === "Cancelled" ? (
          <button className="font-semibold text-red-600 flex items-center justify-end">
            Cancelled
          </button>
        ) : (
          <button
            className="font-semibold text-red-600 flex items-center justify-end"
            onClick={() => handleCancel(productId)}
          >
            Cancel
          </button>
        )}
        {/* <button className='font-semibold text-red-600 flex items-center justify-end' onClick={() => handleCancel(productId)}>Cancel</button> */}
      </div>

      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{"Confirm Default Address"}</DialogTitle>
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
    </div>
  );
};

export default OrderCard;
