import { Alert, Box, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function AmountPaperForCommittee(id) {

    const [amount, setAmount] = useState();

    const fethAmount = async () => {
        const getAmount = await axios.get("/amount/committees/" + id.id)
        setAmount(getAmount.data)
    }

    useEffect(() => {
        fethAmount();
    },[id])

  return (
    <>
        {amount ? (
            <>
                : {amount.length}
            </>
        ):(
            <>0</>
        )}
    </>
  )
}

function AddReviewer() {

    const {id,paperid} = useParams();
    const navigate = useNavigate();

    const [paper, setPaper] = useState();
    const [commit, setCommit] = useState();
    const [confr, setConfr] = useState();
    const [arrCommit, setArrCommit] = useState([]);
    const [check, setCheck] = useState([]);

    const fethPaper = async () => {
        try {
                const getPaper = await axios.get("/get/paper/" + paperid)
                setPaper(getPaper.data)
                const getCommit = await axios.get("/committee/paper/" + getPaper.data.submit_code)
                setCommit(getCommit.data)

        } catch (error) {
            console.log(error)
        }
    }

    const fethCommit = async () => {
        try {
            let res = await axios.get("/get/committees/" + paperid)
            setArrCommit(res.data.committees_list)
            setCheck(new Set(res.data.committees_list))
        } catch (error) {
            console.log(error)
        }
    }

    const fethConfr = async () => {
        try {
            const getConfr = await axios.get('/conferences-get/' + id)
            setConfr(getConfr.data.confr_code)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(arrCommit.length !== 0) {
                const submit = await axios.post(`/assign/${id}/${paperid}`,{
                    commit: arrCommit
                })
                alert("บันทึกสำเร็จ " + submit.status)
                navigate(-1)
            }else {
                alert("กรุณาเลือกกรรมการ")
            }
        } catch (error) {
            console.log("ล้มเหลว")
            console.log(error)
        }
    }

    const handleCheckbox = (e) => {
        const item = e.target.value
        const check = e.target.checked
        if(check) {
            setArrCommit([...arrCommit,item])
        }else {
          setArrCommit(arrCommit.filter(id => id !== item))
        }
        
    }

    useEffect(() => {
        fethPaper();
        fethConfr();
        fethCommit();
    },[])
    
  return (
    <div>
        <h3><u>รายละเอียดบทความ</u></h3>
        {paper ? (
            <div>
                <p>Code: <b>{paper.paper_code}</b></p>
                <p>Title: {paper.title}</p>
            </div>
        ):(null)}
        <h3><u>รายละเอียดกรรมการ</u></h3>
        {commit ? (
            <Box component="form" onSubmit={handleSubmit}>
                {commit.length === 0 ? (<>ไม่มีกรรมการของหัวข้อนี้</>):(null)}
                <FormGroup>
                {commit.map((item) => (
                    <div key={item._id}>
                        <FormControlLabel control={<Checkbox size='small' value={item._id} defaultChecked={check.has(item._id)} onChange={handleCheckbox}/>} label={`${item.fname} ${item.lname}`} />
                        <AmountPaperForCommittee id={item._id} />
                    </div>
                ))}
                </FormGroup>
                <Button variant='contained' type='submit' onSubmit={handleSubmit}>Submit</Button>
            </Box>
        ):(null)}
    </div>
  )
}

export default AddReviewer

