import React from 'react'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notification() {

    const x = 0

    const notify = () => {
        console.log("notification test")
        toast("Wow so easy!")
    };

    if(x === 1) {
        notify()
    } else {
        console.log("not notify")
    }

    return (
        <div>
            <button onClick={notify}>Notify!</button>
        </div>
    )
}

export default Notification