import React from 'react';
import data from '../data/profileFollowing';
import UsersList from './UsersList';
const ProfileFollowing = () => {
    return (
        <>
        <div class="main-section">
        {
            data['data'].map((value) => {
                return <UsersList data={value} key={value.userId}/>
            })
        }
        </div>
        </>
    )
}
export default ProfileFollowing;