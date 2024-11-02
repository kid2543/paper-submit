export default function PaperStatus({status}) {
    switch(status) {
        case 0 : return <span className="badge rounded-pill bg-primary">รอดำเนินการ</span>
        case 1 : return <span className="badge rounded-pill bg-primary">รออนุมัติ</span>
        case 2 : return <span className="badge rounded-pill bg-success">ตรวจเสร็จแล้ว</span>
        case 3 : return <span className="badge rounded-pill bg-success">ยกเลิก</span>
        default: return <span className="badge bg-secondary">ไม่พบข้อมูล</span>
    }
}

export function PaperResult ({status}) {
    switch(status) {
        case 0 : return <span className="badge rounded-pill bg-primary">รอดำเนินการ</span>
        case 1 : return <span className="badge rounded-pill bg-success">ผ่าน</span>
        case 2 : return <span className="badge rounded-pill bg-secondary">ผ่านแบบมีเงื่อนไข</span>
        case 3 : return <span className="badge rounded-pill bg-warning">ส่งใหม่อีกครั้ง</span>
        case 4 : return <span className="badge rounded-pill bg-danger">ไม่ผ่าน</span>
        default: return <span className="badge bg-secondary">ไม่พบข้อมูล</span>
    }
}