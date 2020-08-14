import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastMsg from './ToastMsg';
const SuccessToast = (title, msg) => {
    toast.success(<ToastMsg title={title} msg={msg}/>, {
        className: 'success-toast',
        autoClose: false
    });
}

export default SuccessToast;