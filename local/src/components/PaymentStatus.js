export default ({status}) => {
    switch (status) {
        case 0:
            return <span className='badge bg-secondary'>รอดำเนินการ</span>
        case 1:
            return <span className='badge bg-warning'>รอการตรวจสอบ</span>
        case 2:
            return <span className='badge bg-success'>ข้อมูลถูกต้อง</span>
        case 3:
            return <span className='badge bg-danger'>ข้อมูลไม่ถูกต้อง</span>
        default:
            return <span className='badge bg-dark'>ไม่ระบุ</span>
    }
}