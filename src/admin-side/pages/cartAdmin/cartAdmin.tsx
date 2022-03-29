import React from 'react';
import { NavbarAdmin } from '../../components/navbar/navbar';

interface props {

}

export const CartAdminPage : React.FC<props>= ()=>{
    return(
        <>
        <NavbarAdmin />
        <p> Cart Admin</p>
        </>
    )
} 
//export default CartAdminPage;