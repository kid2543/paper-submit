import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Edit from '../components/HostEdit/Edit'
import EditDate from '../components/HostEdit/EditDate'
import EditPresentation from '../components/HostEdit/EditPresentation'
import EditPaperPresentation from '../components/HostEdit/EditPaperPresentation'
import EditRegis from '../components/HostEdit/EditRegis'
import EditRegisType from '../components/HostEdit/EditRegisType'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EditVenue from '../components/HostEdit/EditVenue'
import EditInv from '../components/HostEdit/EditInv'
import EditTemplate from '../components/HostEdit/EditTemplate'
import EditPartner from '../components/HostEdit/EditPartner'
import EditSubmitDetail from '../components/HostEdit/EditSubmitDetail'
import EditCommitteeList from '../components/HostEdit/EditCommitteeList'
import EditQuestion from '../components/HostEdit/EditQuestion'



function HostEdit() {

  const id = sessionStorage.getItem("confr")
  const api = process.env.REACT_APP_API_URL

  const [data, setData] = useState({})
  const [key, setKey] = useState('home');
  const [importantDate, setImportantDate] = useState({
    name: "",
    start_date: "",
    end_date: "",
  })
  const [guidePresenter, setGuidePresenter] = useState([])
  const [guideChair, setGuideChair] = useState([])
  const [guideAudience, setGuideAudience] = useState([])
  const [committee, setCommittee] = useState([{
    name: "",
    belong_to: "",
    position: ""
  }])
  const [presentation, setPresentation] = useState([])
  const [regisType, setRegisType] = useState([{
    name: "",
    price_1: "",
    price_2: "",
  }])
  const [venue, setVenue] = useState({
    name: "",
    desc: "",
    remark: "",
    travel: ""
  })

  const [submitDetail, setSubmitDetail] = useState([])
  const [venueImage, setVenueImage] = useState(null)
  const [uploadVenueImage, setUploadVenueImage] = useState(null)
  const [loading, setLoading] = useState(true)

  const fethData = async () => {
    try {
      const res = await axios.get(api + "/get/confr/" + id)
      setData(res.data)
      setCommittee(res.data.committees)
      setGuidePresenter(res.data.guide_for_presenter)
      setGuideChair(res.data.guide_for_chair)
      setGuideAudience(res.data.guide_for_audience)
      setPresentation(res.data.presentation_guideline)
      setRegisType(res.data.regis_type)
      setVenue(res.data.venue)
      setVenueImage(res.data.venue_image)
      setSubmitDetail(res.data.submit_detail)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fethData()
  }, [])


  //handleDate fn
  const handleAddDate = () => {
    const date = data.important_date
    date.push(importantDate)
    setData({ ...data, "important_date": date })
  }

  const changeDate = (e) => {
    const { name, value } = e.target
    setImportantDate({ ...importantDate, [name]: value })
  }

  const delDate = (invId) => {
    if (window.confirm("ต้องการจะลบหรือไม่")) {
      let copy = data.important_date
      copy = copy.filter((item) => item._id !== invId)
      setData({ ...data, "important_date": copy })
    }
  }

  const addGuide = (field) => {
    switch (field) {
      case 1:
        setGuidePresenter([...guidePresenter, []])
        break
      case 2:
        setGuideChair([...guideChair, []])
        break
      case 3:
        setGuideAudience([...guideAudience, []])
        break
    }
  }

  const ChangeGuide = (index, e, field) => {
    let guideData = []
    switch (field) {
      case 1:
        guideData = [...guidePresenter]
        guideData[index] = e.target.value
        setGuidePresenter(guideData)
        setData({ ...data, "guide_for_presenter": guideData })
        break
      case 2:
        guideData = [...guideChair]
        guideData[index] = e.target.value
        setGuideChair(guideData)
        setData({ ...data, "guide_for_chair": guideData })
        break
      case 3:
        guideData = [...guideAudience]
        guideData[index] = e.target.value
        setGuideAudience(guideData)
        setData({ ...data, "guide_for_audience": guideData })
        break
    }
  }

  const delGuide = (idx, field) => {
    let copyGuide = []
    switch (field) {
      case 1:
        copyGuide = [...guidePresenter]
        copyGuide = copyGuide.filter((item, index) => index !== idx)
        setGuidePresenter(copyGuide)
        setData({ ...data, "guide_for_presenter": copyGuide })
        break
      case 2:
        copyGuide = [...guideChair]
        copyGuide = copyGuide.filter((item, index) => index !== idx)
        setGuideChair(copyGuide)
        setData({ ...data, "guide_for_chair": copyGuide })
        break
      case 3:
        copyGuide = [...guideAudience]
        copyGuide = copyGuide.filter((item, index) => index !== idx)
        setGuideAudience(copyGuide)
        setData({ ...data, "guide_for_audience": copyGuide })
        break
    }
  }

  //handle Regis Type fn
  const addRegisType = () => setRegisType([...regisType, { name: "", price_1: "", price_2: "" }])

  const changeRegisType = (index, e) => {
    let regisData = [...regisType]
    regisData[index][e.target.name] = e.target.value
    setData({ ...data, "regis_type": regisData })
  }

  const delRegisType = (idx) => {
    let regisData = [...regisType]
    regisData = regisData.filter((item, index) => index !== idx)
    setRegisType(regisData)
    setData({ ...data, "regis_type": regisData })
  }


  //handle Presentation fn
  const addPresentation = () => setPresentation([...presentation, []])

  const ChangePresentation = (index, e) => {
    let newData = [...presentation]
    newData[index] = e.target.value
    setPresentation(newData)
    setData({ ...data, "presentation_guideline": newData })
  }

  const delPresentation = (idx) => {
    let delData = [...presentation]
    delData = delData.filter((item, index) => index !== idx)
    setPresentation(delData)
    setData({ ...data, "presentation_guideline": delData })
  }

  //handleChange normal text
  const handleAllChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleChangeVenue = (e) => {
    const { name, value } = e.target
    setVenue({ ...venue, [name]: value })
  }

  const handleChangeVenueImage = (e) => {
    setUploadVenueImage(e.target.files[0])
  }


  //submit detail
  const addSubmit = () => setSubmitDetail([...submitDetail, []])

  const changeSubmitDetail = (index, e) => {
    let newData = [...submitDetail]
    newData[index] = e.target.value
    setSubmitDetail(newData)
    setData({ ...data, "submit_detail": newData })
  }

  const delSubmitDetail = (idx) => {
    let newData = [...submitDetail]
    newData = newData.filter((item, index) => index !== idx)
    setSubmitDetail(newData)
    setData({ ...data, "submit_detail": newData })
  }

  if (loading) {
    <div className='container my-5 text-center'>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.patch(api + "/update/conferences/" + id, data)
      if (res.status === 200) {
        alert("อัพเดทข้อมูลสำเร็จ")
      } else {
        console.log(res)
      }
    } catch (error) {
      console.log(error)
      alert("เกิดข้อผิดพลาด: " + error.status)
    } finally {
      window.location.reload()
    }
  }

  const handleVenueSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.patch(api + "/update/conferences/" + id, {
        venue: venue,
      })
      alert("อัพเดทข้อมูลสำเร็จ: " + res.status)
    } catch (error) {
      console.log(error)
      alert("เกิดข้อผิดพลาด: " + error.status)
    }
  }

  const handleUploadVenueImage = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("image", uploadVenueImage)
    try {
      const res = await axios.patch(api + "/upload/venue/image/" + id, formData)
      alert("อัพโหลดรูปสำเร็จ: " + res.status)
      setVenueImage(res.data)
    } catch (error) {
      console.log(error)
      alert("เกิดข้อผิดพลาด: " + error.status)
    }
  }

  return (
    <div>
      <div className='container my-5 p-3'>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className='mb-5'
          variant='underline'
        >
          <Tab eventKey="home" title="รายละเอียดทั่วไป" tabClassName='text-start w-100'>
            <form onSubmit={handleSubmit}>
              <div>
                <section>
                  <Edit
                    data={data}
                    handleChange={handleAllChange} />
                </section>
              </div>
              <div className='mt-3'>
                <button type='submit' className='btn btn-success'>บันทึกข้อมูล</button>
              </div>
            </form>
          </Tab>
          <Tab eventKey="important_date" title="กำหนดการ" tabClassName='text-start w-100'>
            <form onSubmit={handleSubmit}>
              <EditDate
                data={data?.important_date}
                addDate={handleAddDate}
                handleChange={changeDate}
                handleDel={delDate}
              />
              <button className='btn btn-success' type='submit'>Save</button>
            </form>
          </Tab>
          <Tab eventKey="suggestion" title="ข้อแนะนำ" tabClassName='text-start w-100'>
            <form onSubmit={handleSubmit}>
              <section>
                <EditPresentation
                  addItem={addGuide}
                  handleChange={ChangeGuide}
                  handleDel={delGuide}
                  presenter={guidePresenter}
                  chair={guideChair}
                  audience={guideAudience}
                />
              </section>
              <button className='btn btn-success' type='submit'>Save</button>
            </form>
          </Tab>
          <Tab eventKey="presentation" title="การนำเสนอและการส่งบทความ" tabClassName='text-start w-100'>
            <form onSubmit={handleSubmit}>
              <section>
                <EditPaperPresentation
                  data={presentation}
                  remark={data?.presentation_remark}
                  handleChange={ChangePresentation}
                  addItem={addPresentation}
                  handleRemark={handleAllChange}
                  handleDel={delPresentation}
                />
              </section>
              <section>
                <EditSubmitDetail
                  submit={submitDetail}
                  handleChange={changeSubmitDetail}
                  addItem={addSubmit}
                  handleDel={delSubmitDetail}
                />
              </section>
              <button className='btn btn-success' type='submit'>Save</button>
            </form>
          </Tab>
          <Tab eventKey="committee" title="รายชื่อกรรมการ" tabClassName='text-start w-100'>
            <section>
              <EditCommitteeList
                data={committee}
                setData={setCommittee}
                id={id}
              />
            </section>
          </Tab>
          <Tab eventKey="venue" title="สถานที่จัดงาน" tabClassName='text-start w-100'>
            <section>
              <EditVenue
                data={venue}
                image={venueImage}
                handleChange={handleChangeVenue}
                handleImage={handleChangeVenueImage}
                handleUpload={handleUploadVenueImage}
                handleSubmit={handleVenueSubmit}
              />
            </section>
          </Tab>
          <Tab eventKey="regis" title="การลงทะเบียน" tabClassName='text-start w-100' >
            <form onSubmit={handleSubmit}>
              <section>
                <EditRegis
                  handleChange={handleAllChange}
                  data={data}
                />
              </section>
              <section>
                <EditRegisType
                  data={regisType}
                  handleChange={changeRegisType}
                  addItem={addRegisType}
                  handleDel={delRegisType}
                />
              </section>
              <button className='btn btn-success' type='submit'>Save</button>
            </form>
          </Tab>
          <Tab eventKey="inv" title="พิธีกรและไฟล์อัพโหลด" tabClassName='text-start w-100' >
            <section className='mb-5'>
              <EditInv id={id} />
            </section>
            <section>
              <EditTemplate id={id} />
            </section>
            <section>
              <EditPartner id={id} />
            </section>
          </Tab>
          <Tab eventKey="qna" title="แบบประเมิน" tabClassName='text-start w-100' >
            <section>
              <EditQuestion id={id} />
            </section>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default HostEdit