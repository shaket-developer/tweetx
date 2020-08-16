import React, {useEffect, useState} from 'react';
import LoginRight from '../assets/login-right.jpg'
import {useHistory} from 'react-router-dom';
import ApiCall from '../integration/ApiCall';

import {ToastContainer, Slide, toast} from 'react-toastify';
import ErrorToast from '../reusable-components/toast/ToastError';
import SuccessToast from '../reusable-components/toast/ToastSuccess';
import { FaExclamation } from "react-icons/fa";
import Spinner from '../reusable-components/Spinner';


var md5 = require('md5');

const CreateAccount = () => {
    var regex = new RegExp("^[A-Za-z0-9? ,.]+$");
    const history = useHistory();
    const goToLogin = () => {
        history.push('login');
    }
    const registerUser = (event, values) => {
        event.preventDefault();
        setCreateAccountForm((previousState) => ({
            ...previousState,
            isSubmitting: true
        }))
        
        let data = {};
        data = {...values};
        debugger
        data['password'] = md5(values.password);
        ApiCall('registeruser', data, 'POST').then((response) => {
            toast.dismiss()
            SuccessToast('Success', response.data.message);
            setCreateAccountForm((previousState) => ({
                ...previousState,
                isSubmitting: false
            }))
        }, error => {
            toast.dismiss();
            ErrorToast('Error', error.msg);
            
            setCreateAccountForm((previousState) => ({
                ...previousState,
                isSubmitting: false
            }))
        })
    }
    
    const initialValue = {
        isSubmitting: false,
        values: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        errors: {
            name: true,
            email: true,
            password: true,
            confirmPassword: true
        },
        name: {
            value: "",
            isTouched: false,
            isError: false,
            isChanged:false,
            validations: {
                isRequired: true,
            },
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
        },
        password: {
            value: "",
            isTouched: false,
            isError: false,
            isChanged:false,
            validations: {
                isRequired: true,
                type: "password",
                matchWithKey: 'confirmPassword'
            },
            showValidationErrorOn: "dirty",
        }, confirmPassword: {
            value: "",
            isTouched: false,
            isError: false,
            isChanged:false,
            validations: {
                isRequired: true,
                type: "password",
                matchWithKey: 'password'
            },
        },
        formName:'registerUser',
        isError: true,
        isChanged: false,
        isTouched: false,
        handleSubmit:registerUser
    }
    
    const [createAccountForm, setCreateAccountForm] = useState(initialValue);
    
    const formBlur = (event) => {
        let fieldName = event.target.name;
        
        if(
            (createAccountForm[fieldName].validations.isRequired == true && !event.target.value) || 
            (createAccountForm[fieldName].validations.type == 'email' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))) || 
            (createAccountForm[fieldName].validations.type == 'alphanumericwhitespacedotcomma' && !regex.test(event.target.value)) ||
            (createAccountForm[fieldName].validations.matchWithKey && createAccountForm['values'][createAccountForm[fieldName].validations.matchWithKey] != event.target.value) || 
            (createAccountForm[fieldName].validations.maxLength > 0 && (event.target.value.length > createAccountForm[fieldName].validations.maxLength)) || 
            (createAccountForm[fieldName].validations.minLength > 0 && (event.target.value.length < createAccountForm[fieldName].validations.minLength))
            ) {
            setCreateAccountForm((previousState) => ({...previousState, [fieldName] : {
                ...previousState[fieldName],
                'isTouched' : true,
                'isError': true
                }, errors : {
                    ...previousState.errors,
                    [fieldName]: true
                }
            }));
            
        } else if((createAccountForm[fieldName].validations.matchWithKey && createAccountForm['values'][createAccountForm[fieldName].validations.matchWithKey] == event.target.value)) {
            setCreateAccountForm((previousState) => ({...previousState, [fieldName] : {
                ...previousState[fieldName],
                'isTouched' : true,
                'isError': false
                }, [createAccountForm[fieldName].validations.matchWithKey] : {
                ...previousState[createAccountForm[fieldName].validations.matchWithKey],
                'isTouched' : true,
                'isError': false
                }, errors : {
                    ...previousState.errors,
                    [fieldName]: false,
                    [createAccountForm[fieldName].validations.matchWithKey]: false
                }
            }));
        } else {
            setCreateAccountForm((previousState) => ({...previousState, [fieldName] : {
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

    const formChange = (event) => {
        let fieldName = event.target.name;
        setCreateAccountForm(({...createAccountForm, [fieldName] : {
            ...createAccountForm[fieldName],
            "value": event.target.value,
            }, values : {
                ...createAccountForm.values,
                [fieldName]: event.target.value,
            }
        }));
        
        if(
            (createAccountForm[fieldName].validations.isRequired == true && !event.target.value) || 
            (createAccountForm[fieldName].validations.type == 'email' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))) || 
            (createAccountForm[fieldName].validations.type == 'alphanumericwhitespacedotcomma' && !regex.test(event.target.value)) || 
            (createAccountForm[fieldName].validations.matchWithKey && createAccountForm['values'][createAccountForm[fieldName].validations.matchWithKey] != event.target.value) || 
            (createAccountForm[fieldName].validations.maxLength > 0 && (event.target.value.length > createAccountForm[fieldName].validations.maxLength)) || 
            (createAccountForm[fieldName].validations.minLength > 0 && (event.target.value.length < createAccountForm[fieldName].validations.minLength))
            ) {
            setCreateAccountForm((previousState) => ({...previousState, [fieldName] : {
                ...previousState[fieldName],
                isError: true,
                }, errors : {
                    ...previousState.errors,
                    [fieldName]: true
                }
            }));
        }  else if((createAccountForm[fieldName].validations.matchWithKey && createAccountForm['values'][createAccountForm[fieldName].validations.matchWithKey] == event.target.value)) {
            setCreateAccountForm((previousState) => ({...previousState, [fieldName] : {
                ...previousState[fieldName],
                'isError': false
                }, [createAccountForm[fieldName].validations.matchWithKey] : {
                ...previousState[createAccountForm[fieldName].validations.matchWithKey],
                'isError': false
                }, errors : {
                    ...previousState.errors,
                    [fieldName]: false,
                    [createAccountForm[fieldName].validations.matchWithKey]: false
                }
            }));
        } else {
            setCreateAccountForm((previousState) => ({...previousState, [fieldName] : {
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
        
        setCreateAccountForm((previousState) => ({...previousState, isError: false}));
        for(let key in createAccountForm.errors) {
            if(createAccountForm.errors[key] == true) {
                setCreateAccountForm((previousState) => ({...previousState, isError: true}));
            }
        }
        
    }, [createAccountForm.values])


    return (
        <div className="d-flex vh-100 ">
            <ToastContainer transition={Slide} autoClose={3000} limit={1} />
            <div className="col-sm-5 p-5">
                <p className="logo logo-md">TweetX</p>
                <button className="btn btn-outline-dark mb-5" onClick={goToLogin}>Login</button>
                <h3 className="mb-4 font-weight-bold">Create Account</h3>
                <form onSubmit={(event) => createAccountForm.handleSubmit(event, createAccountForm.values)} name="registerUser">
                    <div className="form-group">
                        <input type="text" name="name" id="name" value={createAccountForm.values.name} className={`form-control bg-light border-light ${createAccountForm.name.isTouched && createAccountForm.name.isError ? 'is-invalid' : ''}`} onBlur={formBlur} onChange={formChange} size="30" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <input type="text" name="email" id="email" value={createAccountForm.values.email} className={`form-control bg-light border-light ${createAccountForm.email.isTouched && createAccountForm.email.isError ? 'is-invalid' : ''}`} onBlur={formBlur} onChange={formChange} size="30" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" id="password" value={createAccountForm.values.password} className={`form-control bg-light border-light ${createAccountForm.password.isTouched && createAccountForm.confirmPassword.isTouched && createAccountForm.password.isError ? 'is-invalid' : ''}`} onBlur={formBlur} onChange={formChange} size="30" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="confirmPassword" id="confirmPassword" value={createAccountForm.values.confirmPassword} className={`form-control bg-light border-light ${createAccountForm.confirmPassword.isTouched && createAccountForm.password.isTouched && createAccountForm.confirmPassword.isError ? 'is-invalid' : ''}`} onBlur={formBlur} onChange={formChange} size="30" placeholder="Confirm Password" />
                    </div>
                    <div className="form-group d-flex justify-content-between align-items-center">
                        <button className={`btn btn-primary font-weight-bold ml-auto btn-width-md ${createAccountForm.isError ? 'not-allowed' : ''}`} disabled={createAccountForm.isError || createAccountForm.isSubmitting}>{createAccountForm.isSubmitting ? <Spinner /> : 'Sign Up'}</button>
                    </div>
                </form>
            </div>

            <div className="d-none d-md-block col-sm-7 pl-5 pr-0 align-self-end flex-grow-1">
                <img src={LoginRight} className="w-100"/>
            </div>
        </div>
        
    )
}
export default CreateAccount;