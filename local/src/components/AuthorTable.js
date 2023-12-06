import React from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'

function createData(no, title, cat, code, status) {
    return { no, title, cat, code, status };
  }

  const rows = [
    createData(1, 'หัวข้อที่ 1', ['BEEE','ABCD'], "ART2023", 0),
    createData(2, 'หัวข้อที่ 2', ['AFCE','BECE'], "ART2023", 1),
    createData(3, 'หัวข้อที่ 3', ['CCID','BECE'], "ART2023", 1),
    createData(4, 'หัวข้อที่ 4', ['BEEE','KKCI'], "ART2023", 0),
    createData(5, 'หัวข้อที่ 5', ['FFOI','BECE'], "ART2023", 0)
  ];

  function createStatus(n,text) {
    if(n === 0) {
        text = "รอดำเนินการ"
        return text;
    }else {
        text = "กำลังดำเนินการ"
        return text;
    }
  }

 


function AuthorTable() {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ลำดับ</TableCell>
            <TableCell align='right'>ชื่อบทความ</TableCell>
            <TableCell align="right">ประเภท</TableCell>
            <TableCell align="right">งานประชุม</TableCell>
            <TableCell align="right">สถานะล่าสุด</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.no}
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.cat[0]},{row.cat[1]}</TableCell>
              <TableCell align="right">{row.code}</TableCell>
              <TableCell align="right">{createStatus(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AuthorTable