import React from 'react';
import { NavbarAdmin } from '../../components/navbar/navbar';

interface props {

}

export const HomeAdminPage : React.FC<props>= ()=>{
    return(
        <>
        <NavbarAdmin />
        <p> home Admin</p>
        </>
    )
} 
  //HomeAdminPage;