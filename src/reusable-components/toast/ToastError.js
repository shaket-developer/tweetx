
import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastMsg from './ToastMsg';

const ErrorToast = (title, msg) => {
    toast.error(<ToastMsg title={title} msg={msg} />, {
        className: 'error-toast',
        autoClose: false,
        hideProgressBar: true
    });
}
export default ErrorToast;