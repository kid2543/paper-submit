import {
  Container,
  Button,
  Box
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//icon


function HostUpdate() {
  const navigate = useNavigate();
  //เก็บข้อมูล บทความที่เลือกปัจจุบัน
  const [data, setData] = useState([]);
  //get id จาก url
  const { id } = useParams();
  const [state, setState] = useState(false);

  function handleClick(link) {
    navigate("/host/" + id + "/" + link);
  }

  async function fetchData() {
    try {
      const getData = await axios.get("/conferences-get/" + id);
      const getInv = await axios.post("/inv-speaker-get", {
        confr_code: getData.data.confr_code,
      });
      const getCategory = await axios.get("/category-for-confr/" + id);
      setData([getData.data, getInv.data, getCategory.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setState(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
          
      {state ? (
        <div>
          <h2>รายละเอียดข้อมูลของงานประชุม {data[0].confr_code}</h2>
          <Box>
            <h5>หัวข้อ</h5>
            <p>{data[0].title}</p>
            <Button variant="outlined" onClick={() => handleClick("title")}>
              Edit
            </Button>
          </Box>
          <hr/>
          <Box>
            <h5>คำอธิบายเกี่ยวกับงานประชุม</h5>
            <p>{data[0].confr_desc}</p>
            <Button variant="outlined" onClick={() => handleClick("desc")}>
              Edit
            </Button>
          </Box>
          <hr />
          <Box>
            <h5>Presentation Guide</h5>
            <p>{data[0].presentation_guide.header}</p>
            <Button variant="outlined" onClick={() => handleClick("present")}>
              Edit
            </Button>
          </Box>
          <hr />
          <Box>
            <h5>Category code</h5>
            {data[2].map((item,index) => (
              <div key={item._id}>
                <h5>อันดับ: {index + 1}</h5>
                <p>ชื่อ: {item.name}</p>
                Code: {item.category_code}
              </div>
            ))}
            <Button variant="outlined" onClick={() => handleClick("category")}>
              Edit
            </Button>
          </Box>
          <hr />
          <Box>
            <h5>Important Date</h5>
            {data[0].important_date.map((item) => (
              <p key={item._id}>{item.name}</p>
            ))}
            <Button
              variant="outlined"
              onClick={() => handleClick("important-date")}
            >
              Edit
            </Button>
          </Box>
          <hr />
          <Box>
            <h5>Invite speaker</h5>
            {data[1].map((item) => (
              <p key={item._id}>ชื่อพิธีกร: {item.name}</p>
            ))}
            <Button
              variant="outlined"
              onClick={() => handleClick("inv-speaker")}
            >
              Edit
            </Button>
          </Box>
          <hr />
          <Box>
            <h5>Publication</h5>
            {data[0].publication.map((item, index) => (
              <p key={index}>ชื่อสำนักพิมพ์: {item}</p>
            ))}
            <Button variant="outlined" onClick={() => handleClick("public")}>
              Edit
            </Button>
          </Box>
          <hr />
          <Box>
            <h5>Partner</h5>
            {data[0].partner.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
            <Button variant="outlined" onClick={() => handleClick("partner")}>
              Edit
            </Button>
          </Box>
          <hr />
          <Box>
            <h5>Regis</h5>
            <p>ชื่อบัญชี: {data[0].regis.ac_name}</p>
            <Button variant="outlined" onClick={() => handleClick("regis")}>
              Edit
            </Button>
          </Box>
          <hr />
          <Box>
            <h5>Venue</h5>
            {data[0].venue ? (
              <div>
                <p>ชื่อสถานที่จัดงาน: {data[0].venue.name}</p>
                <p>รายละเอียดสถานที่จัดงาน: {data[0].venue.desc}</p>
                <p>รายละเอียดเพิ่มเติม: {data[0].venue.remark}</p>
                <p>Link สถานที่ท่องเที่ยว: {data[0].venue.travel}</p>
                <div>
                  <img
                    width={100}
                    src="https://res.cloudinary.com/dciv8zipz/image/upload/f_auto,q_auto/rw7bmnsf46borjmxozyk"
                    alt={data[0].venue.img}
                  />
                </div>
              </div>
            ) : (
              <p>Not have data</p>
            )}
            <Button variant="outlined" onClick={() => handleClick("venue")}>
              Edit
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleClick("venue-upload")}
            >
              Upload
            </Button>
          </Box>
          <hr />
          <Box>
            <h5>Schedule</h5>
            <div>
              <a href={"http://localhost:4000/pdf/" + data[0].schedule}>Pdf</a>
            </div>
            <Button variant="outlined" onClick={() => handleClick("schedule")}>
              Upload
            </Button>
          </Box>
          <hr />
          <Box>
            <h5>Logo</h5>
            <div>
              <img
                width={100}
                src={"/image/" + data[0].logo}
                alt={data[0].logo}
              />
            </div>
            <Button variant="outlined" onClick={() => handleClick("logo")}>
              Upload
            </Button>
          </Box>
          <hr />
          <Box>
            <h5>Brochure</h5>
            <div>
              <img
                width={100}
                src={"/image/" + data[0].brochure}
                alt={data[0].brochure}
              />
            </div>
            <Button variant="outlined" onClick={() => handleClick("brochure")}>
              Upload
            </Button>
          </Box>
          <hr />
          <Box>
            <h5>Owner</h5>
            <p>{data[0].owner}</p>
          </Box>
          <hr />
          <Box>
            <h5>Conferences code</h5>
            <p>{data[0].confr_code}</p>
          </Box>
        </div>
      ) : (
        <h2>Loading.....</h2>
      )}
    </Container>
  );
}

export default HostUpdate;
