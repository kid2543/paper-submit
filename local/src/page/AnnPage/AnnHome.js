import { Container, Button, Link } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function AnnHome() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [user, setUser] = useState();

  useEffect(() => {
    const fethUser = async () => {
    await axios
        .post("/author-get-by-username", { username: token })
        .then((res) => {
          if(token) {
            setUser(res.data._id)
          }else{
            console.log('Not login')
          }
        })
        .catch((err) => console.log(err));
    };
    fethUser();
  },[]);

  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>Home</h2>
      <h3>Submission</h3>
      <Button variant="outlined">
        <Link href={"/author/dashboard/" + user}>Submission</Link>
      </Button>
    </Container>
  );
}

export default AnnHome;
