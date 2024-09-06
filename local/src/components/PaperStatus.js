export default function PaperStatus({status}) {
    switch(status) {
        case 0 : return <span className="badge rounded-pill bg-primary">รอดำเนินการ</span>
        case 1 : return <span className="badge rounded-pill bg-primary">รออนุมัติ</span>
        case 2 : return <span className="badge rounded-pill bg-success">ตรวจเสร็จแล้ว</span>
        default: return <span className="badge bg-secondary">ไม่พบข้อมูล</span>
    }
}