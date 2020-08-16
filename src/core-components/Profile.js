import React, { useState, useEffect } from 'react';
import Header from '../reusable-components/Header';
import data from '../data/users.js';
import UsersList from '../reusable-components/UsersList';

import ProfilePost from '../reusable-components/ProfilePost';
import ProfileFollowers from '../reusable-components/ProfileFollowers';
import ProfileFollowing from '../reusable-components/ProfileFollowing';

import {ToastContainer, Slide, toast} from 'react-toastify';
import ErrorToast from '../reusable-components/toast/ToastError'
import SuccessToast from '../reusable-components/toast/ToastSuccess';

import Spinner from '../reusable-components/Spinner';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ApiCall from '../integration/ApiCall';
import { useHistory } from 'react-router-dom';


const Profile = () => {
    const [key, setKey] = useState('post');
    const [profileBasic, setProfileBasic] = useState({});
    const [myProfileLoading, setMyProfileLoading] = useState(true);
    const history = useHistory();
    useEffect(() => {
        ApiCall('/getMyProfile', {}, "GET").then(response => {
            setMyProfileLoading(false);
            setProfileBasic(response.data)
        }).catch(error => {
            showError(error);
            setMyProfileLoading(false);
            
        })
    }, []);
    const showError = (error) => {
        toast.dismiss();
        ErrorToast('Error', error.msg);
        if(error.code == 401) {
            history.push('login')
        }
    }
    const showSuccess = (msg) => {
        toast.dismiss();
        ErrorToast('Success', msg);
    }
    return (
        <div>
            <Header />
            <ToastContainer transition={Slide} autoClose={3000} />
            <div className="page-body">
                {!myProfileLoading && <div className="profile-info d-md-flex align-items-center">
                    <div className="col-md-auto text-center text-md-left">
                        <img src={profileBasic.profile_large_image} className="rounded-circle" />
                    </div>
                    <div className="col-md-auto text-center text-md-left">
                        <h3>{profileBasic.name}</h3>
                        <span className="pr-4">
                            Posts {profileBasic.posts}
                        </span>
                        <span className="pl-4 pr-4">
                            Followers {profileBasic.followers}
                        </span>
                        <span className="pl-4 pr-4">
                            Followings {profileBasic.following}
                        </span>
                    </div>
                </div>}
                <div className="main-section">
                    <Tabs>
                        <TabList>
                            <Tab>Post</Tab>
                            <Tab>Followers</Tab>
                            <Tab>Following</Tab>
                        </TabList>
                         <TabPanel>
                            <ProfilePost showErrorToast = {showError} showSuccessToast = {showSuccess} profileData = {profileBasic} />
                        </TabPanel>
                        <TabPanel>
                            <ProfileFollowers showErrorToast = {showError} showSuccessToast = {showSuccess} profileData = {profileBasic} />
                        </TabPanel>
                        <TabPanel>
                            <ProfileFollowing showErrorToast = {showError} showSuccessToast = {showSuccess} profileData = {profileBasic} />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
export default Profile;