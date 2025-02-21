export default function PaperStatus({status}) {
    switch(status) {
        case "PENDING" : return <span className="badge rounded-pill bg-primary">รอดำเนินการ</span>
        case "REVIEW" : return <span className="badge rounded-pill bg-warning">อยู่ระหว่างการพิจารณา</span>
        case "SUCCESS" : return <span className="badge rounded-pill bg-success">พิจารณาแล้ว</span>
        case "PUBLIC" : return <span className="badge rounded-pill bg-info">เผยแพร่แล้ว</span>
        case "CANCEL" : return <span className="badge rounded-pill bg-danger">ยกเลิก</span>
        default: return <span className="badge bg-secondary">ไม่พบข้อมูล</span>
    }
}

export function PaperResult ({status}) {
    switch(status) {
        case "PENDING" : return <span className="badge rounded-pill text-bg-primary">อยู่ระหว่างการพิจารณา</span>
        case "ACCEPT" : return <span className="badge rounded-pill bg-success">ACCEPT</span>
        case "MAJOR" : return <span className="badge rounded-pill bg-warning">MAJOR REVISION</span>
        case "MINOR" : return <span className="badge rounded-pill bg-secondary">MINOR REVISION</span>
        case "REJECT" : return <span className="badge rounded-pill bg-danger">REJECT</span>
        default: return <span className="badge bg-dark">ไม่พบข้อมูล</span>
    }
}

export function ReviewStatus({status}) {
    switch(status) {
        case 'PENDING' : return <span className="badge rounded-pill bg-primary">อยู่ระหว่างการพิจารณา</span>
        case 'SUCCESS' : return <span className="badge rounded-pill bg-success">พิจารณาแล้ว</span>
        case 'CANCEL' : return <span className="badge rounded-pill bg-danger">ยกเลิก</span>
        default: return <span className="badge rounded-pill bg-secondary">ไม่ระบุ</span>
    }
}