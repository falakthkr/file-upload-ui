import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function FilesTable({ files }) {
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
  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">
            <b>S.no</b>
          </TableCell>
          <TableCell align="center">
            <b>File Name</b>
          </TableCell>
          <TableCell align="center">
            <b>Status</b>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {files.map((file, index) => (
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
        ))}
      </TableBody>
    </Table>
  );
}
