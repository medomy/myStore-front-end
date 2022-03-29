import React from 'react';
import { NavbarAdmin } from '../../components/navbar/navbar';

interface props {

}

export const UsersAdminPage : React.FC<props>= ()=>{
    return(
        <>
        <NavbarAdmin />
        <p> users Admin</p>
        </>
    )
} 
//export default UsersAdminPage;