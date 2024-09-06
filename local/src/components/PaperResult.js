export default function PaperResult({status}) {
    switch(status) {
        case 0 : return <span className="badge bg-primary">รอดำเนินการ</span>
        case 1 : return <span className="badge bg-success">ผ่าน</span>
        case 2 : return <span className="badge bg-success">ผ่าน (แบบมีเงื่อนไข)</span>
        case 3 : return <span className="badge bg-warning">ส่งใหม่เพื่อให้พิจารณาอีกครั้ง</span>
        case 4 : return <span className="badge bg-warning">ส่งใหม่ที่วารสารอื่น</span>
        case 5 : return <span className="badge bg-danger">ไม่ผ่าน</span>
        default: return <span className="badge bg-secondary">ไม่ระบุ</span>
    }
}