import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";

function createData(no, title, cat, code, status) {
  return { no, title, cat, code, status };
}

const rows = [
  createData(1, "หัวข้อที่ 1", ["BEEE", "ABCD"], "ART2023", 0),
  createData(2, "หัวข้อที่ 2", ["AFCE", "BECE"], "ART2023", 1),
  createData(3, "หัวข้อที่ 3", ["CCID", "BECE"], "ART2023", 1),
  createData(4, "หัวข้อที่ 4", ["BEEE", "KKCI"], "ART2023", 0),
  createData(5, "หัวข้อที่ 5", ["FFOI", "BECE"], "ART2023", 0),
];

function createStatus(n, text) {
  if (n === 0) {
    text = "รอดำเนินการ";
    return text;
  } else {
    text = "กำลังดำเนินการ";
    return text;
  }
}

function AuthorTable() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fethPaper = async () => {
      await axios
        .post("/paper-table", { owner: token })
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    };
    fethPaper();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">ชื่อบทความ</TableCell>
            <TableCell align="right">งานประชุม</TableCell>
            <TableCell align="right">สถานะล่าสุด</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? (
            <>
              {data.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item._id}
                  </TableCell>
                  <TableCell align="right">{item.title}</TableCell>
                  <TableCell align="right">{item.confr_code}</TableCell>
                  <TableCell align="right">
                    {createStatus(item.status)}
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <h2>Loading...</h2>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AuthorTable;
