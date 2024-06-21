import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./index.css";

export default function Compare(props) {

  function createData(name, data1, data2) {
    return {name, data1, data2};
  }

  const rows = [
    createData("N° de casos hoje", props.NumNovosCasos1, props.NumNovosCasos2),
    createData("N° de mortes hoje", props.NumNovasMortes1, props.NumNovasMortes2),
    createData("N° total de casos", props.NumCasos1, props.NumCasos2),
    createData("N° total de mortes", props.NumMortes1, props.NumMortes2)
  ];

  return (
    <div className="container">
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">{ props.NomePais1 }</TableCell>
              <TableCell align="center">{ props.NomePais2 }</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.data1}</TableCell>
                <TableCell align="center">{row.data2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}