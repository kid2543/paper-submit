import {
  Container,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//icon
import EditIcon from '@mui/icons-material/Edit';

function HostUpdate() {
  const navigate = useNavigate();
  //เก็บข้อมูล บทความที่เลือกปัจจุบัน
  const [data, setData] = useState();
  //เก็บข้อมูลหัวข้อที่มี
  const [category, setCategory] = useState([]);
  //get id จาก url
  const { id } = useParams();

  function handleClick(link) {
    navigate("/host/"+ id + "/" + link)
  }

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await axios.get("/category-for-confr/" + id);
        setCategory(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      try {
        const data = await axios.get("/conferences-get/" + id);
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
    fetchData();
  },[id]);

  return (
    <Container>
      {data ? (<div>
        <p>
          Code งานประชุม : {data.confr_code}
        </p>
        <p>
          Owner : {data.owner}
        </p>
        <p>
          title : {data.title}
          <Button onClick={() => handleClick("title")}><EditIcon/></Button>
        </p>
        <p>
          Logo : <br/><img src={"/image/"+ data.logo} alt={data.logo} width="200px"/>
          <Button onClick={() => handleClick("logo")}><EditIcon/></Button>
        </p>
        <p>
          หัวข้อที่เกี่ยวข้องกับงานประชุม : <Button onClick={() => handleClick("category")}><EditIcon/></Button>
        </p>
        <ul>{category.map((item) => (<li key={item._id}>{item.name}</li>))}</ul>
        <p>
          วันสำคัญ : <Button onClick={() => handleClick("important-date")}><EditIcon/></Button>
        </p>
        <ul>{data.important_date.map((date) => (<li key={date.name}>ชื่อ: {date.name}<br/>วันที่: {date.date}</li>))}</ul>
        <h4>
          ข้อแนะนำการนำเสนอผลงาน : <Button onClick={() => handleClick("present")}><EditIcon/></Button>
        </h4>
        <p>
          หัวข้อ : {data.presentation_guide.header}
        </p>
        <p>
          รายละเอียด : 
        </p>
        <ul>{data.presentation_guide.detail.map((item,index) => (<li key={index}>{item}</li>))}</ul>
        <p>
          รายละเอียดเพิ่มเติม : {data.presentation_guide.remark}
        </p>
        <h4>
          การลงทะเบียน <Button onClick={() => handleClick("regis")}><EditIcon/></Button>
        </h4>
        <p>
          วันที่ลงทะเบียนแบบ Early Bird : {data.regis.early_bird_date}
        </p>
        <p>
          วันที่ลงทะเบียนแบบ Regular : {data.regis.regular_date}
        </p>
        <p>
          ประเภทการลงทะเบียน : 
        </p>
        <ul>{data.regis.regis_type.map((item,index) => (<li key={index}>ชื่อ: {item.name}<br/> Early Bird: {item.price_1}<br/> Regular: {item.price_2}</li>))}</ul>
        <p>
          ชื่อธนาคาร : {data.regis.bank_name}
        </p>
        <p>
          ชื่อบัญชี : {data.regis.ac_name}
        </p>
        <p>
          ประเภทบัญชี : {data.regis.ac_type}
        </p>
        <p>
          เลขบัญชี : {data.regis.ac_no}
        </p>
        <h4>พิธีกร</h4>
        <ul>{data.inv_speaker.map((item,index) => (<li key={index}>ชื่อ: {item.name}<br/> คำอธิบาย: {item.desc}<br/> keynote: {item.keynote} <br/> cv: <a href={"/"+item.cv_prof} download>Download CV</a><br/>รูปพิธีกร: <img src={item.img} alt="รูปพิธีกร"/></li>))}</ul>
        <p>
          สำนักพิมพ์
        </p>
        <ul>{data.publication.map((item, index) => <li key={index}>{item}</li>)}</ul>
        <h4>
          สถานที่จัดงานประชุม
        </h4>
        <p>
          ชื่อสถานที่ : {data.venue.name}<br/>
          รูปสถานที่ : <img src={data.venue.img} alt="รูปงานประชุมวิชาการ" /><br/>
          Link สถานที่ท่องเที่ยว : <a href={data.venue.travel}>{data.venue.travel}</a>
        </p>
        <p>
          schedule : <a href={"/" + data.schedule}>Download schedule</a>
        </p>
        <p>
          partner :
        </p>
        <ul>{data.partner.map((image,index) => (<li key={index}><img src={image} alt={image}/></li>))}</ul>
        <p>
          รูปสำหรับเชิญส่งบทความ: <img src={data.brochure} alt={data.brochure}/>
        </p>
      </div>
      ):(<h2>Loading.....</h2>)}
    </Container>
  );
}

export default HostUpdate;
