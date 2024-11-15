import axios, { AxiosHeaders } from 'axios'
import React from 'react'
import { useAuthContext } from '../hook/useAuthContext'

function PaperSubmitForm() {
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        formData.append('paper_code', `TSAE2022-TEST4567-`)
        const value = Object.fromEntries(formData.entries())
        console.log("form data", value)

        try {
            const res = await axios.post('/api/paper/create', value, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>ชื่อบทความ</label>
            <input type='text' name='title' required />
            <label>งานประชุม</label>
            <input type='text' name='confr_code' required />
            <label>หัวข้อ</label>
            <select name='cate_code' required>
                <option value=''>
                    --เลือกหัวข้อ
                </option>
                <option value='671cba071b724c34d65fc6d9'>
                    test 123457
                </option>
                <option value='672a6cee2f30cc17388b2ab7'>
                    test 4567
                </option>
            </select>
            <label>วารสาร</label>
            <select name='publication' required>
                <option value="">
                    --เลือกประเภท
                </option>
                <option value="66fb97736c89e4fd6adbf8c5">
                    Chaophraya
                </option>
                <option value="66fbf7842b4bf9adecd5d9bd">
                    Cosmetic Surgery and Medicine
                </option>
            </select>
            <label>ประเภทการลงทะเบียน</label>
            <select name='regis_type' required>
                <option value=''>
                    --เลือกประเภท
                </option>
                <option value={false}>
                    Regular
                </option>
                <option value={true}>
                    Earlybird
                </option>
            </select>
            <label>Abstract only ?</label>
            <input type='checkbox' name='abstract' />
            <button>Submit</button>
        </form>
    )
}

export default PaperSubmitForm