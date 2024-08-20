import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import { FaRupeeSign } from 'react-icons/fa';

const OrderedProductTable = ({orderData}) => {
  const rows = [
    { id: 1, name: 'Adidas ultra boost', orderId: '#25421', quantity: 2, total: 800.40 },
    { id: 2, name: 'Adidas ultra boost', orderId: '#25421', quantity: 2, total: 800.40 },
    { id: 3, name: 'Adidas ultra boost', orderId: '#25421', quantity: 2, total: 800.40 },
    { id: 4, name: 'Adidas ultra boost', orderId: '#25421', quantity: 2, total: 800.40 },
  ];

  const subtotal = rows.reduce((sum, row) => sum + row.total, 0);
  const tax = subtotal * 0.2; // 20% tax
  const discount = 0;
  const total = subtotal + tax - discount;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="ordered products table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Product Name</TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData?.items?.map((product) => (
            <TableRow key={product?._id}>
              <TableCell padding="checkbox">
                {/* <Checkbox /> */}
              </TableCell>
              <TableCell component="th" scope="row">
                <div className="flex items-center">
                  <img src={product?.thumbnail} alt="product" className="w-10 h-10 mr-3 object-cover" />
                  {product?.productBrand}
                </div>
              </TableCell>
              <TableCell>{orderData?._id}</TableCell>
              <TableCell>{product?.quantity}</TableCell>
              <TableCell><FaRupeeSign className="inline" /> {product?.price}</TableCell>
            </TableRow>
          ))}
          {/* Subtotal, Tax, Discount, and Total without borders */}
          <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: 'none' }} />
            <TableCell sx={{ borderBottom: 'none' }}>Subtotal</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}><FaRupeeSign className="inline" /> {orderData?.totalPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: 'none' }} />
            <TableCell sx={{ borderBottom: 'none' }}>Deliver Fee</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}><FaRupeeSign className="inline" /> 0.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: 'none' }} />
            <TableCell sx={{ borderBottom: 'none' }}>Discount</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}><FaRupeeSign className="inline" /> {discount.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: 'none' }} />
            <TableCell sx={{ borderBottom: 'none' }} className="font-bold text-lg">Total</TableCell>
            <TableCell sx={{ borderBottom: 'none' }} className="font-bold text-lg"><FaRupeeSign className="inline" />{orderData?.totalPrice}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderedProductTable;
