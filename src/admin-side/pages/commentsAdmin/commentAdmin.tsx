import React from 'react';
import { NavbarAdmin } from '../../components/navbar/navbar';
interface props {

}

export const CommentAdminPage : React.FC<props>= ()=>{
    return(
        <>
        <NavbarAdmin />
        <p> comment Admin</p>
        </>
    )
} 
//export default CommentAdminPage;