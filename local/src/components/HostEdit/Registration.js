import dayjs from 'dayjs'
import React from 'react'

const list = [
    {
        id: 0,
        name: "นำเสนอผลงานระดับชาติ",
        eb: 3300,
        rl: 3600
    },
    {
        id: 1,
        name: "นำเสนอผลงานระดับนานาชาติ",
        eb: 4800,
        rl: 5500
    },
]

const paySchedule = {
    eb_start: new Date("2024-10-15"),
    eb_end: new Date("2024-10-20"),
    rl_start: new Date("2024-10-21"),
    rl_end: new Date("2024-11-16")
}

const bank = {
    bank_name: "Krung thai bank",
    ac_name: "Rajamangala University of Technology Lanna",
    ac_type: "Saving account",
    ac_no: "521-6-04676-3"
}

function Registration() {
    return (
        <div className='row gy-5'>
            <div className='col-12'>
                <div className='card'>
                    <div className='card-body'>
                        <div>
                            <h3>รายละเอียดบัญชี</h3>
                            <hr />
                        </div>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>ชื่อธนาคาร</td>
                                    <td>{bank.bank_name}</td>
                                </tr>
                                <tr>
                                    <td>ชื่อบัญชี</td>
                                    <td>{bank.ac_name}</td>
                                </tr>
                                <tr>
                                    <td>ประเภทบัญชี</td>
                                    <td>{bank.ac_type}</td>
                                </tr>
                                <tr>
                                    <td>เลขบัญชี</td>
                                    <td>{bank.ac_no}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='col-12'>
                <div className='card'>
                    <div className='card-body'>
                        <div>
                            <h3>อัตราค่าลงทะเบียน</h3>
                            <hr />
                        </div>
                        <div className='table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ประเภทผู้เข้าร่วม</th>
                                        <th colSpan={2}>อัตราค่าลงทะเบียน</th>
                                    </tr>
                                    <tr>
                                        <th>-</th>
                                        <th>Early bird</th>
                                        <th>Regular</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map((items) => (
                                        <tr key={items.id}>
                                            <td>{items.name}</td>
                                            <td>{new Intl.NumberFormat('en-US').format(items.eb)} บาท</td>
                                            <td>{new Intl.NumberFormat('en-US').format(items.rl)} บาท</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <p>ชำระเงินภายใน</p>
                            <p>Early bird registration : {dayjs(paySchedule.eb_start).format("DD MMM YYYY")} ถึง {dayjs(paySchedule.eb_end).format("DD MMM YYYY")}</p>
                            <p>Regular registration : {dayjs(paySchedule.rl_start).format("DD MMM YYYY")} ถึง {dayjs(paySchedule.rl_end).format("DD MMM YYYY")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration