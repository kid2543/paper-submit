import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';

function PartnerUpdate() {

    const {id} = useParams();
    const [partner, setPartner] = useState([]);
    const inputRef = useRef();
    const [state, setState] = useState(false);
    const [loading , setLoading] = useState(false);

    async function fethPartner() {
        try {
            const getPartner  = await axios.get("/conferences-get/" + id )
            setPartner(getPartner.data.partner)
            setState(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleFile = () =>  {
        console.log(inputRef.current.files)
    }

    useEffect(() => {
        fethPartner();
    },[])

    async function handleUpload() {
        try {
            setLoading(true)
            let formData = new FormData();
            if(inputRef.current.files.length > 0) {
                for (let i = 0; i < inputRef.current.files.length; i++){
                    formData.append("image", inputRef.current.files[i])
                }
                const updatePartner = await axios.put("/partner-upload/" + id,formData)
                console.log(updatePartner)
            }else {
                alert("ยังไม่ได้เลือกไฟล์")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleClearData() {
        try {
            setLoading(true)
            let formData = new FormData();
            formData.append("image", null)
            await axios.put("/partner-upload/" + id, formData)
            alert("Clear")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    console.log(partner.length)

  return (
    <div>
        <h2>Update Partner</h2>
        <div>
            <input accept='image/*' type="file" multiple ref={inputRef} onChange={handleFile} />
            <Button onClick={handleUpload}>Upload</Button>
            <Button onClick={handleClearData} color='error'>Delete All</Button>
            {loading ? (
                <CircularProgress />
            ):null}
        </div>
        {state ? (
            <div>
                {partner.map((item,index) => (
            <img width={100} src={"/image/" + item} alt={item} key={index}/>
        ))}
            </div>
        ):(
            <CircularProgress />
        )}
        
    </div>
  )
}

export default PartnerUpdate