import React, { useState } from 'react';
import Header from '../reusable-components/Header';
import data from '../data/users.js';
import UsersList from '../reusable-components/UsersList';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import ProfilePost from '../reusable-components/ProfilePost';
import ProfileFollowers from '../reusable-components/ProfileFollowers';
import ProfileFollowing from '../reusable-components/ProfileFollowing';
import profileBasic from '../data/profileBasic';
const Profile = () => {
    const [key, setKey] = useState('post');
    return (
        <div>
            <Header />
            <div className="page-body">
                <div className="profile-info d-md-flex align-items-center">
                    <div className="col-md-auto">
                        <img src={profileBasic.data.image} class="rounded-circle" />
                    </div>
                    <div className="col-md-auto">
                        <h3>{profileBasic.data.name}</h3>
                        <span className="pr-4">
                            Posts {profileBasic.data.posts}
                        </span>
                        <span className="pl-4 pr-4">
                            Followers {profileBasic.data.followers}
                        </span>
                        <span className="pl-4 pr-4">
                            Following {profileBasic.data.following}
                        </span>
                    </div>
                    
                
                </div>
                <div class="main-section">
                    <Tabs id="controlled-tab-example" className="justify-content-around" activeKey={key} onSelect={(k) => setKey(k)} >
                        <Tab eventKey="post" title="Post">
                            <ProfilePost />
                        </Tab>
                        <Tab eventKey="followers" title="Followers">
                            <ProfileFollowers />
                        </Tab>
                        <Tab eventKey="following" title="Following">
                        <ProfileFollowing />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
export default Profile;