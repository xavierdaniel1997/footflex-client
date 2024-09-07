import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {FaRupeeSign} from "react-icons/fa";
import React from "react";

const SalesReportTable = ({reportData}) => {
  console.log("this is from the the salesReprot table", reportData);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="ordered products table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{fontWeight: 'bold', fontSize: "1rem"}}>Dates</TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: "1rem"}}>Product Id</TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: "1rem"}}>Product Name</TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: "1rem"}}>Product Brand</TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: "1rem"}}>Quantity</TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: "1rem"}}>Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData?.topProducts?.map((report) => (
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>{report?.dates}</TableCell>
              <TableCell>{report?.productId}</TableCell>
              <TableCell component="th" scope="row">
                <div className="flex items-center">
                  <img
                    src={report?.thumbnail}
                    alt="product"
                    className="w-10 h-10 mr-3 object-cover"
                  />
                  {report?.productName}
                </div>
              </TableCell>
              <TableCell>{report?.productBrand}</TableCell>
              <TableCell>
                {report?.totalPrice} x {report?.totalQuantity}
              </TableCell>
              <TableCell>
                <FaRupeeSign className="inline" /> {report?.totalRevenue}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={5} sx={{borderBottom: "none"}} />
            <TableCell sx={{borderBottom: "none", whiteSpace: 'nowrap', fontSize: "1rem", fontWeight: "bold"}}>Total Quantity</TableCell>
            <TableCell sx={{borderBottom: "none", whiteSpace: 'nowrap', fontSize: "1rem", fontWeight: "bold"}}>Total Revenue</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} sx={{borderBottom: "none"}} />
            <TableCell sx={{borderBottom: "none", whiteSpace: 'nowrap', fontSize: "1rem", fontWeight: "bold"}}>
              {reportData?.topProductsSummary?.totalQuantity}
            </TableCell>
            <TableCell sx={{borderBottom: "none", whiteSpace: 'nowrap', fontSize: "1rem", fontWeight: "bold"}}> 
              <FaRupeeSign className="inline" />{" "}
              {reportData?.topProductsSummary?.totalRevenue}
            </TableCell>
          </TableRow>

          {/* <TableRow>
            <TableCell colSpan={5} sx={{borderBottom: "none"}} />
            <TableCell sx={{borderBottom: "none"}}>Coupon discount</TableCell>
            <TableCell sx={{borderBottom: "none"}}>
              <FaRupeeSign className="inline" /> orderData?.couponDiscount
            </TableCell>
          </TableRow> */}

          {/* <TableRow>
            <TableCell colSpan={5} sx={{borderBottom: "none"}} />
            <TableCell sx={{borderBottom: "none"}}>Offer discount</TableCell>
            <TableCell sx={{borderBottom: "none"}}>
              <FaRupeeSign className="inline" /> orderData?.savedTotal
            </TableCell>
          </TableRow> */}

          {/* <TableRow>
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
              orderData?.finalPrice
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalesReportTable;
