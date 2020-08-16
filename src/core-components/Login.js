import React, {useState, useEffect} from 'react';
import LoginRight from '../assets/login-right.jpg'
import {useHistory} from 'react-router-dom';
import apiCall from '../integration/apiCall';
import {ToastContainer, Slide, toast} from 'react-toastify';
import ErrorToast from '../reusable-components/toast/ToastError';
import SuccessToast from '../reusable-components/toast/ToastSuccess';
import { FaExclamation } from "react-icons/fa";
import Spinner from '../reusable-components/Spinner';
var md5 = require('md5');

const Login = () => {
    var regex = new RegExp("^[A-Za-z0-9? ,.]+$");
    const userlogin = (event, th) => {
        event.preventDefault();
        setLoginForm((previousState) => ({
            ...previousState,
            isSubmitting: true
        }))
        let data = {};
        data = th;
        data['password'] = md5(th.password);
        apiCall('loginuser', data, 'POST').then(response => {
            
            window.localStorage.setItem('userId', response.data.userData['id']);
            window.localStorage.setItem('userName', response.data.userData['name']);
            history.push('feeds');
        }, error => {
            toast.dismiss();
            ErrorToast('Error', error);
            setLoginForm((previousState) => ({
                ...previousState,
                isSubmitting: false
            }))
        })
    }

    const history = useHistory();
    
    const initialValue = {
        isSubmitting: false,
        values: {
            email: "",
            password: "",
        },
        errors: {
            email: true,
            password: true,
        },
        email: {
            value: "",
            isTouched: false,
            isError: false,
            isChanged:false,
            validations: {
                isRequired: true,
                type: "email",
            },
            showValidationErrorOn: "dirty",
        },
        password: {
            value: "",
            isTouched: false,
            isError: false,
            isChanged:false,
            validations: {
                isRequired: true,
                type: "password",
                minLength:8,
                maxLength:16
            },
            showValidationErrorOn: "dirty",
        },
        formName:'userLogin',
        isError: true,
        isChanged: false,
        isTouched: false,
        handleSubmit:userlogin
    }

    const goToCreateAccount = () => {
        history.push('create-account');
    }
    
    const [loginForm, setLoginForm] = useState(initialValue);
    
    const formBlur = (event) => {
        let fieldName = event.target.name
        if(initialValue[fieldName].showValidationErrorOn == "dirty") {
            if(
                (loginForm[fieldName].validations.isRequired == true && !event.target.value) || 
                (loginForm[fieldName].validations.type == 'email' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))) || 
                (loginForm[fieldName].validations.type == 'alphanumericwhitespacedotcomma' && !regex.test(event.target.value)) || 
                (loginForm[fieldName].validations.maxLength > 0 && (event.target.value.length > loginForm[fieldName].validations.maxLength)) || 
                (loginForm[fieldName].validations.minLength > 0 && (event.target.value.length < loginForm[fieldName].validations.minLength))
            ) {
                setLoginForm((previousState) => ({...previousState, [fieldName] : {
                    ...previousState[fieldName],
                    'isTouched' : true,
                    'isError': true
                    }, errors : {
                        ...previousState.errors,
                        [fieldName]: true
                    }
                }));
            } else {
                setLoginForm((previousState) => ({...previousState, [fieldName] : {
                    ...previousState[fieldName],
                    'isTouched' : true,
                    'isError': false
                    }, errors : {
                        ...previousState.errors,
                        [fieldName]: false
                    }
                }));
            }
        }
    }

    const formChange = (event) => {
        let fieldName = event.target.name
        setLoginForm({...loginForm, [fieldName] : {
            ...loginForm[fieldName],
            "value": event.target.value,
            }, values : {
                ...loginForm.values,
                [fieldName]: event.target.value,
            }
        });
        if(
            (loginForm[fieldName].validations.isRequired == true && !event.target.value) || 
            (loginForm[fieldName].validations.type == 'email' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))) || 
            (loginForm[fieldName].validations.type == 'alphanumericwhitespacedotcomma' && !regex.test(event.target.value)) || 
            (loginForm[fieldName].validations.maxLength > 0 && (event.target.value.length > loginForm[fieldName].validations.maxLength)) || 
            (loginForm[fieldName].validations.minLength > 0 && (event.target.value.length < loginForm[fieldName].validations.minLength))
        ) {
            setLoginForm((previousState) => ({...previousState, [fieldName] : {
                ...previousState[fieldName],
                isError: true,
                }, errors : {
                    ...previousState.errors,
                    [fieldName]: true
                }
            }));
        } else {
            setLoginForm((previousState) => ({...previousState, [fieldName] : {
                ...previousState[fieldName],
                isError: false,
                }, errors : {
                    ...previousState.errors,
                    [fieldName]: false
                }
            }));
        }
    }

    useEffect(() => {
        setLoginForm({...loginForm, isError: false});
        for(let key in loginForm.errors) {
            if(loginForm.errors[key] == true) {
                setLoginForm((previousState) => ({...previousState, isError: true}));
            }
        }
    }, [loginForm.values])
    
    return (
        <div className="d-flex vh-100">
            <ToastContainer transition={Slide} autoClose={3000} />
            <div className="col-sm-5 p-5">
                <p className="logo logo-md">TweetX</p>
                <button className="btn btn-outline-dark mb-5" onClick={goToCreateAccount}>Create Account</button>
                <h3 className="mb-4 font-weight-bold"> Login</h3>
                <form onSubmit={(event) => loginForm.handleSubmit(event, loginForm.values)} name="userLogin" >
                    <div className="form-group">
                        <input type="text" name="email" id="email" className={`form-control bg-light border-light ${loginForm.email.isTouched && loginForm.email.isError ? 'is-invalid' : ''}`} value={loginForm.email.value} onBlur={formBlur} onChange={formChange} size="30" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" id="password" className={`form-control bg-light border-light ${loginForm.password.isTouched && loginForm.password.isError ? 'is-invalid' : ''}`} value={loginForm.password.value} onBlur={formBlur} onChange={formChange} size="30" placeholder="Password" />
                    </div>
                    <div className="form-group d-flex justify-content-between align-items-center">
                        <a className="btn-link">Forgot Password?</a>
                        <button className={`btn btn-primary font-weight-bold btn-width-md ${loginForm.isError ? 'not-allowed' : ''}`} disabled={loginForm.isError || loginForm.isSubmitting}>{loginForm.isSubmitting ? <Spinner /> : 'Login'}</button>
                    </div>
                </form>
            </div>

            <div className="d-none d-md-block col-sm-7 pl-5 pr-0 align-self-end flex-grow-1">
                <img src={LoginRight} className="w-100"/>
            </div>
        </div>
        
    )
}
export default Login;