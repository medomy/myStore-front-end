import React from 'react';
import Category from '../../../models/category';
import { NavbarAdmin } from '../../components/navbar/navbar';
import { callInstance } from '../../network/connection';
import {GridColDef} from '@mui/x-data-grid';
import AdminDataGrid from '../../components/adminDatagrid/adminData';
import { getAllCategories } from '../../services/apiCall/categories';
interface props{

}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    {
        field: 'photourl',
        headerName: 'photoUrl',
        description: 'This column indicates to img src.',
        width: 170,
    }
];

export const CategoriesAdmin : React.FC<props> = ()=>{
    const [categories , setCategories] = React.useState<Category[]>([]);
    

    React.useEffect(()=>{
        /*callInstance.get('/categories')
        .then(res => setCategories(res.data))
        .catch(err => console.log(err))*/
        getAllCategories()
        .then(res => setCategories(res))
        .catch(err => console.log(err));
    },[])
    return(
        <>
        <NavbarAdmin />
        <AdminDataGrid rows={categories} columns={columns} page={'categories'} />
        </>
    )
}