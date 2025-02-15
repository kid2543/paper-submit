
const PaymentStatus = ({status}) => {
    switch (status) {
        case 'NEW':
            return <span className='badge bg-secondary'>รอดำเนินการ</span>
        case 'PENDING':
            return <span className='badge bg-warning'>รอแนบหลักฐาน</span>
        case 'CHECKING':
            return <span className='badge bg-warning'>กำลังตรวจสอบความถูกต้อง</span>
        case 'ACCEPT':
            return <span className='badge bg-success'>ข้อมูลถูกต้อง</span>
        case 'REJECT':
            return <span className='badge bg-danger'>ข้อมูลไม่ถูกต้องแนบหลักฐานใหม่</span>
        default:
            return <span className='badge bg-dark'>ไม่ระบุ</span>
    }
}

export default PaymentStatus