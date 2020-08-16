import React, {useState} from 'react';
import ApiCall from '../integration/ApiCall';
import {ToastContainer, Slide} from 'react-toastify';
import ErrorToast from '../reusable-components/toast/ToastError';
import SuccessToast from '../reusable-components/toast/ToastSuccess';
import Spinner from '../reusable-components/Spinner';

const UsersList = ({reloadusers, ...props}) => {
    const { userId, name, following, follower_user_id, profile_image, id, isFollowing } = props.data;
    const [isFollowingSubmit, setIsFollowingSubmit] = useState(false); 
    const followUser = (id, name) => {
        setIsFollowingSubmit(true);
        ApiCall('followUser', {"userId": id, "userName": name}, 'POST').then(response => {
            SuccessToast('Success', response.data.message);
            setIsFollowingSubmit(false);
            reloadusers()
        }, error => {
            ErrorToast('Error', error.msg);
        })
    }
    const loadUsers = () => {
        reloadusers()
    }
    return (
        <>
            <div className="user-detail pb-4 pt-4">
                <div className="row align-items-center text-center text-md-left">
                    <div className="user-image col-md-auto">
                        <img src={profile_image} className="rounded-circle" />
                    </div>
                    <div className="user-description col-md-auto">
                        <h5>{name}</h5>
                        <small>Following {following}</small>
                    </div>
                    <div className="col-md-auto ml-auto">
                        {(isFollowing == undefined && follower_user_id == window.localStorage.getItem('userId')) ? 
                        <span className="text-secondary">Following</span> : 
                        isFollowing == undefined ? <button className="btn btn-width-md btn-primary" onClick={() => followUser(id, name)}>{isFollowingSubmit ? <Spinner /> : 'Follow'}</button> :
                        null }
                        {isFollowing == 1 ? 
                        <span className="text-secondary">Following</span> : 
                        isFollowing == 0 ? <button className="btn btn-width-md btn-primary" onClick={() => followUser(follower_user_id, name)}>{isFollowingSubmit ? <Spinner /> : 'Follow'}</button> :
                        null
                        }
                    </div>
                </div>
            </div>
            <hr/>
        </>
    )
}
export default UsersList;