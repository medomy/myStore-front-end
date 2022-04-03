import React from 'react';
import Product from '../../../models/product';
import { NavbarAdmin } from '../../components/navbar/navbar';
import { callInstance } from '../../network/connection';
import { GridColDef } from '@mui/x-data-grid';
import './productsAdmin.css';
import AdminDataGrid from '../../components/adminDatagrid/adminData';
interface props {

}

export const ProductsAdminPage: React.FC<props> = () => {
    const [products, setProducts] = React.useState<Array<Product>>([]);
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'title', width: 150 },
        { field: 'price', headerName: 'price', width: 150, type: 'number' },
        {
            field: 'categoryid',
            headerName: 'category Id',
            description: 'This column indicates to category.',
            width: 170,
        },
        {
            field: 'company',
            headerName: 'company',
            description: 'This column indicates to company.',
            width: 170,
        }
    ];

    React.useEffect(() => {
        callInstance.get('products')
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));

    }, [])
    return (
        <>
            <NavbarAdmin />
            <AdminDataGrid rows={products} columns={columns} page={"products"} />
        </>
    )
}
