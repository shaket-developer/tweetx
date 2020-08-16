import React, {useEffect, useState} from 'react';
import Header from '../reusable-components/Header';
import data from '../data/feeds.js';
import FeedsList from '../reusable-components/FeedsList';
import apiCall from '../integration/apiCall';

import {ToastContainer, Slide, toast} from 'react-toastify';
import ErrorToast from '../reusable-components/toast/ToastError'
import SuccessToast from '../reusable-components/toast/ToastSuccess';
import Spinner from '../reusable-components/Spinner';

const Feeds = () => {
    var regex = new RegExp("^[A-Za-z0-9? ,.]+$");
    const [feedsLoading, setFeedsLoading] = useState(true);
    const [feeds, setFeeds] = useState([]);
    const [isFeeding, setIsFeeding] = useState(false);
    const [myFeed, setMyFeed] = useState("");

    useEffect(() => {
        setFeedsLoading(true)
        apiCall('feeduser', {}, 'GET').then(response => {
            setFeeds(() => response.data, setFeedsLoading(false))
        }, error => {
            toast.dismiss();
            ErrorToast('Error', error);
        })
    }, [])
    
    const startFeeding = () => {
        setIsFeeding(true);
    }

    const submitFeed = (event, values) => {
        event.preventDefault();
        setCreateFeedForm((previousState) => ({
            ...previousState,
            isSubmitting: true
        }))
        apiCall('createfeed', values, 'POST').then(response => {
            toast.dismiss();
            SuccessToast('Success', response.data.message);
            setIsFeeding(false);
            setCreateFeedForm((previousState) => ({
                ...previousState,
                isSubmitting: false
            }))
            setCreateFeedForm(initialValue)
        }, error => {
            toast.dismiss();
            ErrorToast('Error', error);
            setCreateFeedForm((previousState) => ({
                ...previousState,
                isSubmitting: false
            }))
        })
    }
    const cancelCreateMyFeed = () => {
        setIsFeeding(false);
        setCreateFeedForm(initialValue)
    }
    const initialValue = {
        isSubmitting: false,
        values: {
            feedTxt: "",
        },
        errors: {
            feedTxt: true,
        },
        feedTxt: {
            value: "",
            isTouched: false,
            isError: true,
            isChanged:false,
            validations: {
                isRequired: true,
                type: 'alphanumericwhitespacedotcomma',
            },
            showValidationErrorOn: "dirty",
        },
        formName:'myFeed',
        isError: true,
        isChanged: false,
        isTouched: false,
        handleSubmit:submitFeed
    }
    
    const [createFeedForm, setCreateFeedForm] = useState(initialValue);
    
    const formBlur = (event) => {
        let fieldName = event.target.name;
        
        if(initialValue[fieldName].showValidationErrorOn == "dirty") {
            if(
                (createFeedForm[fieldName].validations.isRequired == true && !event.target.value) || 
                (createFeedForm[fieldName].validations.type == 'email' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))) || 
                (createFeedForm[fieldName].validations.type == 'alphanumericwhitespacedotcomma' && !regex.test(event.target.value)) || 
                (createFeedForm[fieldName].validations.maxLength > 0 && (event.target.value.length > createFeedForm[fieldName].validations.maxLength)) || 
                (createFeedForm[fieldName].validations.minLength > 0 && (event.target.value.length < createFeedForm[fieldName].validations.minLength))
            ) {
                setCreateFeedForm((previousState) => ({...previousState, [fieldName] : {
                    ...previousState[fieldName],
                    'isTouched' : true,
                    'isError': true
                    }, errors : {
                        ...previousState.errors,
                        [fieldName]: true
                    }
                }));
            } else {
                setCreateFeedForm((previousState) => ({...previousState, [fieldName] : {
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
        
        let fieldName = event.target.name;
        setCreateFeedForm({...createFeedForm, [fieldName] : {
            ...createFeedForm[fieldName],
            "value": event.target.value,
            }, values : {
                ...createFeedForm.values,
                [fieldName]: event.target.value,
            }
        });
        
        if(
            (createFeedForm[fieldName].validations.isRequired == true && !event.target.value) || 
            (createFeedForm[fieldName].validations.type == 'email' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))) || 
            (createFeedForm[fieldName].validations.type == 'alphanumericwhitespacedotcomma' && !regex.test(event.target.value)) || 
            (createFeedForm[fieldName].validations.maxLength > 0 && (event.target.value.length > createFeedForm[fieldName].validations.maxLength)) || 
            (createFeedForm[fieldName].validations.minLength > 0 && (event.target.value.length < createFeedForm[fieldName].validations.minLength))
            
        ) {
            setCreateFeedForm((previousState) => ({...previousState, [fieldName] : {
                ...previousState[fieldName],
                'isError': true
                }, errors : {
                    ...previousState.errors,
                    [fieldName]: true
                }
            }));
        } else {
            setCreateFeedForm((previousState) => ({...previousState, [fieldName] : {
                ...previousState[fieldName],
                'isError': false
                }, errors : {
                    ...previousState.errors,
                    [fieldName]: false
                }
            }));
        }
    }

    const newFeedChange = (event) => {
        setMyFeed(event.target.value)
    }

    useEffect(() => {
        setCreateFeedForm({...createFeedForm, isError: false});
        for(let key in createFeedForm.errors) {
            if(createFeedForm.errors[key] == true) {
                setCreateFeedForm((previousState) => ({...previousState, isError: true}));
            }
        }
    }, [createFeedForm.values])

    return (
        <div>
            <Header />
            <ToastContainer transition={Slide} autoClose={3000} />
            <div className="page-body">
                {
                    !isFeeding ? 
                    (!feedsLoading && <button className="btn btn-primary btn-width-md" onClick={startFeeding}>Write</button>) :
                    (<div className="bg-light p-2 br-5">
                        <form onSubmit={(event) => createFeedForm.handleSubmit(event, createFeedForm.values)} name="myFeed">
                            <textarea className={`br-5 w-100 p-4 ${createFeedForm.feedTxt.isTouched && createFeedForm.feedTxt.isError ? 'is-invalid' : ''}`} placeholder="Write your Feed" name="feedTxt" id="feedTxt" value={createFeedForm.feedTxt.value} onBlur={formBlur} onChange={formChange} rows="4">
                            
                            </textarea>
                            <div className="d-flex">
                                <div className="ml-auto">
                                    <a className="btn btn-outline" onClick={cancelCreateMyFeed}>Cancel</a>
                                    <button type="submit" className={`btn btn-primary font-weight-bold btn-width-md ${createFeedForm.isError ? 'not-allowed' : ''}`} disabled={createFeedForm.isError || createFeedForm.isSubmitting}>{createFeedForm.isSubmitting ? <Spinner /> : 'Submit'}</button>
                                </div>
                            </div>
                        </form>
                        
                    </div>)
                }
                <div className="main-section">
                    
                    {
                      feedsLoading && <div className="text-center"><Spinner color="bg-dark" /></div>
                    }
                    {
                      !feedsLoading && feeds.length == 0 ? <h3 className="text-center">No Feeds</h3> : feeds.map((value) => {
                        return <FeedsList data={value} key={value.id} />
                      })
                    }
                </div>
            </div>
        </div>
    )
}
export default Feeds;