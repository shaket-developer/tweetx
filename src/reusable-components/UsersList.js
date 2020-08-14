import React, {useState} from 'react';
import apiCall from '../integration/apiCall';
import {ToastContainer, Slide} from 'react-toastify';
import ErrorToast from '../reusable-components/toast/ToastError';
import SuccessToast from '../reusable-components/toast/ToastSuccess';
import Spinner from '../reusable-components/Spinner';

const UsersList = ({reloadusers, ...props}) => {
    const { userId, name, following, follower_user_id, profile_image, id } = props.data;
    const [isFollowingSubmit, setIsFollowingSubmit] = useState(false); 
    const followUser = (id, name) => {
        setIsFollowingSubmit(true);
        apiCall('followUser', {"userId": id, "userName": name}, 'POST').then(response => {
            SuccessToast('Success', response.data.message);
            setIsFollowingSubmit(false);
            reloadusers()
        }, error => {
            ErrorToast('Error', error);
        })
    }
    const loadUsers = () => {
        reloadusers()
    }
    return (
        <>
            <div className="user-detail pb-4 pt-4">
                <div class="row align-items-center text-center text-md-left">
                    <div className="user-image col-md-auto">
                        <img src={profile_image} className="rounded-circle" />
                    </div>
                    <div className="user-description col-md-auto">
                        <h5>{name}</h5>
                        <small>Following {following}</small>
                    </div>
                    <div className="col-md-auto ml-auto">
                        {follower_user_id == window.localStorage.getItem('userId') ? <span class="text-secondary">Following</span> : <button class="btn btn-width-md btn-primary" onClick={() => followUser(id, name)}>{isFollowingSubmit ? <Spinner /> : 'Follow'}</button>}
                    </div>
                </div>
            </div>
            <hr/>
        </>
    )
}
export default UsersList;