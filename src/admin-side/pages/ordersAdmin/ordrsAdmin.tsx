import React from 'react';
import { NavbarAdmin } from '../../components/navbar/navbar';
interface props {

}

export const OrdersAdminPage : React.FC<props>= ()=>{
    return(
        <>
        <NavbarAdmin />
        <p> orders Admin</p>
        </>
    )
} 
//export default OrdersAdminPage;