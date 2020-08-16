import React, {useEffect, useState} from 'react';
import UsersList from './UsersList';
import apiCall from '../integration/apiCall';
import Spinner from './Spinner';
const ProfileFollowers = ({showErrorToast, showSuccessToast}) => {
    const [profileFollowers, setProfileFollowers] = useState([]);
    const [myFollowersLoading, setMyFollowersLoading] = useState(true);
    useEffect(()=> {
        
        getFollowers();
    }, []);
    const getFollowers = () => {
        setMyFollowersLoading(true)
        apiCall('/getMyFollowers', {}, "GET").then(response => {
            setMyFollowersLoading(false);
            setProfileFollowers(response.data)
        }, (e) => {
            setMyFollowersLoading(false);
            showErrorToast(e);
        })
    }
    return (
        <>
        <div className="main-section">
        { myFollowersLoading && <Spinner color="bg-dark" /> }
        { !myFollowersLoading && profileFollowers.length == 0 ? <h2 className="text-center text-light">No Followers Found</h2> : null }
        {
            !myFollowersLoading && profileFollowers.length > 0 && profileFollowers.map((value) => {
                return <UsersList data={value} reloadusers = {getFollowers} key={value.userId}/>
            })
        }
        </div>
        
        </>
    )
}
export default ProfileFollowers;