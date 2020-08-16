import React, { useEffect, useState } from 'react';
import data from '../data/profileFeeds';
import FeedsList from './FeedsList';
import apiCall from '../integration/apiCall';
import Spinner from './Spinner';
const ProfilePost = ({showErrorToast, showSuccessToast, profileData}) => {
    const {name, profile_image} = profileData;
    const [profileFeeds, setProfileFeeds] = useState([]);
    const [myPostsLoading, setMyPostsLoading] = useState(true);
    useEffect(()=> {
        setMyPostsLoading(true)
        apiCall('/getMyFeeds', {}, "GET").then(response => {
            setMyPostsLoading(false);
            setProfileFeeds(response.data)
        }, (e) => {
            setMyPostsLoading(false);
            showErrorToast(e);
        })
    }, [])
    return (
        <>
        <div className="main-section">
        { myPostsLoading && <Spinner color="bg-dark" /> }
        { !myPostsLoading && profileFeeds.length == 0 ? <h2 className="text-center text-light">No Feeds Found</h2> : null }
        {
            !myPostsLoading && profileFeeds.length > 0 && profileFeeds.map((value) => {
                value.profile_image = profile_image;
                console.log(value.profile_image);
                value.name = name;
                return <FeedsList data={value} key={value.id} />
            })
        }
        </div>
        </>
    )
}
export default ProfilePost;