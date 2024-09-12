import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {FaRupeeSign} from "react-icons/fa";
import api from "../../config/axiosConfig";

const OrderedProductTable = ({orderData, updateOrderItemStatus}) => {



  const singleOrderStatus = [
    "Active",
    "Delivered",
    "Cancelled",
    "Return Requested",
    "Return Accepted",
    "Return Rejected",
    "Returned",
  ];


  // returnReason

const handleChangeStatus = (orderId, productId, status) => {
  updateOrderItemStatus(orderId, productId, status);
};
 
  return (
    <TableContainer component={Paper}>
      <Table aria-label="ordered products table">
        <TableHead> 
          <TableRow>
            <TableCell />
            <TableCell>Product Name</TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData?.items?.map((product) => (
            <TableRow key={product?._id}>
              <TableCell padding="checkbox">{/* <Checkbox /> */}</TableCell>
              <TableCell component="th" scope="row">
                <div className="flex items-center">
                  <img
                    src={product?.thumbnail}
                    alt="product"
                    className="w-10 h-10 mr-3 object-cover"
                  />
                  {product?.productBrand}
                </div>
              </TableCell>
              <TableCell>{orderData?._id}</TableCell>
              <TableCell>{product?.size}</TableCell>


            

              <TableCell>

              <Tooltip
                  title={
                    product?.status === "Return Requested"  && product?.returnReason
                      ? product?.returnReason
                      : ""
                  }
                  placement="top"
                >
                <Select
                 value={product?.status}
                  onChange={(e) => handleChangeStatus(orderData?._id, product?.product, e.target.value)}
                  displayEmpty
                  sx={{
                    padding: 0, 
                    minWidth: 120,
                    backgroundColor: "#F0F8FF", 
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none', 
                    },
                    '& .MuiSelect-select': {
                      padding: '4px 8px',
                    },
                  }}
                >
                  {singleOrderStatus.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status} 
                    </MenuItem>
                  ))}
                </Select>
                </Tooltip>
              </TableCell>

              <TableCell>{product?.quantity}</TableCell>
              <TableCell>
                <FaRupeeSign className="inline" /> {product?.price}
              </TableCell>
            </TableRow>
          ))}
 
          <TableRow>
            <TableCell colSpan={5} sx={{borderBottom: "none"}} />
            <TableCell sx={{borderBottom: "none"}}>MRP</TableCell>
            <TableCell sx={{borderBottom: "none"}}>
              <FaRupeeSign className="inline" /> {orderData?.totalPrice}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} sx={{borderBottom: "none"}} />
            <TableCell sx={{borderBottom: "none"}}>Deliver Fee</TableCell>
            <TableCell sx={{borderBottom: "none"}}>
              <FaRupeeSign className="inline" /> 0.00
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} sx={{borderBottom: "none"}} />
            <TableCell sx={{borderBottom: "none"}}>Coupon discount</TableCell>
            <TableCell sx={{borderBottom: "none"}}>
              <FaRupeeSign className="inline" /> {orderData?.couponDiscount}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} sx={{borderBottom: "none"}} />
            <TableCell sx={{borderBottom: "none"}}>Offer discount</TableCell>
            <TableCell sx={{borderBottom: "none"}}>
              <FaRupeeSign className="inline" /> {orderData?.savedTotal}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} sx={{borderBottom: "none"}} />
            <TableCell
              sx={{borderBottom: "none"}}
              className="font-bold text-lg"
            >
              Total
            </TableCell>
            <TableCell
              sx={{borderBottom: "none"}}
              className="font-bold text-lg"
            >
              <FaRupeeSign className="inline" />
              {orderData?.finalPrice}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderedProductTable;
