export default function PaperStatus({status}) {
    switch(status) {
        case "PENDING" : return <span className="badge rounded-pill bg-primary">รอดำเนินการ</span>
        case "REVIEW" : return <span className="badge rounded-pill bg-warning">กำลังตรวจสอบ</span>
        case "SUCCESS" : return <span className="badge rounded-pill bg-success">ตรวจเสร็จแล้ว</span>
        case "CANCEL" : return <span className="badge rounded-pill bg-danger">ยกเลิก</span>
        default: return <span className="badge bg-secondary">ไม่พบข้อมูล</span>
    }
}

export function PaperResult ({status}) {
    switch(status) {
        case "PENDING" : return <span className="badge rounded-pill bg-primary">รอดำเนินการ</span>
        case "ACCEPT" : return <span className="badge rounded-pill bg-success">ผ่าน</span>
        case "REVISE" : return <span className="badge rounded-pill bg-secondary">แก้ไข</span>
        case "REJECT" : return <span className="badge rounded-pill bg-danger">ไม่ผ่าน</span>
        default: return <span className="badge bg-dark">ไม่พบข้อมูล</span>
    }
}

export function ReviewStatus({status}) {
    switch(status) {
        case 'PENDING' : return <span className="badge rounded-pill bg-primary">กำลังดำเนินการ</span>
        case 'SUCCESS' : return <span className="badge rounded-pill bg-success">ตรวจแล้ว</span>
        case 'CANCEL' : return <span className="badge rounded-pill bg-danger">ยกเลิก</span>
        default: return <span className="badge rounded-pill bg-secondary">ไม่ระบุ</span>
    }
}