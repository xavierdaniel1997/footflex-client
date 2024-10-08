import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper
} from '@mui/material';
import { FaBluetoothB } from 'react-icons/fa';
import { BsFillBoxFill, BsFillUsbDriveFill } from 'react-icons/bs';

const ViewOrderProductTable = ({orderDetails}) => {
  const products = [
    {
      name: 'boAt Airdopes 141 Bluetooth',
      size: '₹ 658',
      quantity: 'x1',
      rent: '₹ 658',
      icon: <FaBluetoothB style={{ color: '#2196f3' }} />,
    },
    {
      name: 'Cloth Organizer Unit',
      size: '₹ 108',
      quantity: 'x1',
      rent: '₹ 108',
      icon: <BsFillBoxFill style={{ color: '#9e9e9e' }} />,
    },
    {
      name: 'Braided Type C Cable',
      size: '₹ 108',
      quantity: 'x1',
      rent: '₹ 108',
      icon: <BsFillUsbDriveFill style={{ color: '#000000' }} />,
    },
  ];

  return (
    <div className="w-full max-w-4xl">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>PRODUCT NAME</TableCell>
              <TableCell>SIZE</TableCell>
              <TableCell>QUANTITY</TableCell>
              <TableCell>PRICE (INR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails?.items?.map((product, index) => (
              
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={product?.thumbnail} alt="" className='w-12 h-12 object-cover'/>
                    <span>{product?.productName}</span>
                  </div>
                </TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewOrderProductTable;
