import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function FilesTable({ files }) {
  // helper functions
  const getStatus = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Successfully processed";
      case -1:
        return "Failed to process";
      default:
        return "Unknown";
    }
  };

  // render functions
  const renderTableRow = (file, index) => {
    return (
      <TableRow key={file.name}>
        <TableCell align="center" component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="center">{file.filename}</TableCell>
        <TableCell
          className={`${
            file.status === 1
              ? "text-green-500"
              : file.status === -1
              ? "text-red-500"
              : "text-gray-500"
          }`}
          align="center"
        >
          {getStatus(file.status)}
        </TableCell>
      </TableRow>
    );
  };

  const renderTableData = () => {
    console.log(files);
    if (files.length > 0) {
      return (
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold" align="center">
                S.no
              </TableCell>
              <TableCell className="font-bold" align="center">
                File Name
              </TableCell>
              <TableCell className="font-bold" align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file, index) => {
              return renderTableRow(file, index);
            })}
          </TableBody>
        </Table>
      );
    }
    return <p className="p-5">No Data. Upload files to see Data.</p>;
  };

  return <TableContainer component={Paper}>{renderTableData()}</TableContainer>;
}
