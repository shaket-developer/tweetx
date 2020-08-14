import React from 'react';
import data from '../data/profileFeeds';
import FeedsList from './FeedsList';
const ProfilePost = () => {
    return (
        <>
        <div class="main-section">
        {
            data['data'].map((value) => {
                return <FeedsList data={value} key={value.userId} />
            })
        }
        </div>
        </>
    )
}
export default ProfilePost;