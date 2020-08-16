import React, {useEffect, useState} from 'react';
import UsersList from './UsersList';
import apiCall from '../integration/apiCall';
import Spinner from './Spinner';
const ProfileFollowing = ({showErrorToast, showSuccessToast}) => {
    const [profileFollowings, setProfileFollowings] = useState([]);
    const [myFollowingsLoading, setMyFollowingsLoading] = useState(true);
    useEffect(()=> {
        getFollowings();
    }, []);
    const getFollowings = () => {
        setMyFollowingsLoading(true);
        apiCall('/getMyFollowings', {}, "GET").then(response => {
            setProfileFollowings(response.data);
            setMyFollowingsLoading(false);
        }, (e) => {
            setMyFollowingsLoading(false);
            showErrorToast(e);
        })
    }
    return (
        <>
        <div className="main-section">
        { myFollowingsLoading && <Spinner color="bg-dark" /> }
        { !myFollowingsLoading && profileFollowings.length == 0 ? <h2 className="text-center text-light">No Followings Found</h2> : null }
        {
            !myFollowingsLoading && profileFollowings.length > 0 && profileFollowings.map((value) => {
                return <UsersList data={value} reloadusers = {getFollowings} key={value.userId}/>
            })
        }
        </div>
        
        </>
    )
}
export default ProfileFollowing;