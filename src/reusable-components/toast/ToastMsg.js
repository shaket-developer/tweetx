import React from 'react';
const ToastMsg = ({closeToast, ...props}) => (
    <div>
     <h6 className="toast-title">{props.title}</h6>
     <a>{props.msg}</a>
    </div>
)
export default ToastMsg;