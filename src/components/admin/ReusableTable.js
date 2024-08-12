import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";

const ReusableTable = ({
  columns,
  data,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  isPagination
}) => {
  const totalPage = Math.ceil(totalCount / rowsPerPage);
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{borderRadius: "8px", margin: "20px 0"}}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} sx={{fontWeight: "bold"}}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{row[column.field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isPagination && <Pagination
        count={totalPage}
        page={page}
        onChange={onPageChange}
        variant="outlined"
        shape="rounded"
        color={"primary"}
      />}
    </> 
  );
};

export default ReusableTable;
