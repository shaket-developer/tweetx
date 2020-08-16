import React, {useEffect, useState} from 'react';
import Header from '../reusable-components/Header';
//import data from '../data/users.js';
import UsersList from '../reusable-components/UsersList';
import ApiCall from '../integration/ApiCall';
import {ToastContainer, Slide, toast} from 'react-toastify';
import ErrorToast from '../reusable-components/toast/ToastError'
import SuccessToast from '../reusable-components/toast/ToastSuccess';
import Spinner from '../reusable-components/Spinner';
import { useHistory } from 'react-router-dom';

const Users = () => {
    const [usersLoading, setUsersLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const history = useHistory()
    const getUsers = () => {
        setUsersLoading(true);
        ApiCall('users', {}, 'GET').then(response => {
            setUsers(() => response.data, setUsersLoading(false))
        }, error => {
            toast.dismiss();
            ErrorToast('Error', error.msg);
            if(error.code == 401) {
                history.push('login')
            }
        })
    }
    useEffect(() => {
        getUsers();
    }, [])
    
    return (
        <div>
            <Header />
            <ToastContainer transition={Slide} autoClose={3000} />
            <div className="page-body">
                <div className="main-section">
                {
                   usersLoading && <Spinner  color="bg-dark" />
                }
                {
                    !usersLoading && users.length == 0 ? <h3 className="text-center">No Users</h3> : users.map((value) => {
                        return <UsersList data={value} reloadusers = {getUsers} key={value.id}/>
                    })
                }
                </div>
            </div>
        </div>
    )
}
export default Users;