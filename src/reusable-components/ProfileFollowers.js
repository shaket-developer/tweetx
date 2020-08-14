import React, {useEffect} from 'react';
import data from '../data/profileFollowers';
import UsersList from './UsersList';
const ProfileFollowers = () => {
    useEffect(() => {
        console.log('ProfileFollowers loaded')
    }, [])
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
export default ProfileFollowers;