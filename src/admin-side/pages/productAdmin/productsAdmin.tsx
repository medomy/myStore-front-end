import React from 'react';
import Product from '../../../models/product';
import { NavbarAdmin } from '../../components/navbar/navbar';
import { callInstance } from '../../network/connection';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AddIcon from '@mui/icons-material/Add';
import './productsAdmin.css';
import AdminDataGrid from '../../components/adminDatagrid/adminData';
interface props {

}

export const ProductsAdminPage: React.FC<props> = () => {
    const [products, setProducts] = React.useState<Array<Product>>([]);
    const [selectedProducts, setSelectedProducts] = React.useState<Array<number | string>>([]);
    const navigate = useNavigate();
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'title', width: 150 },
        { field: 'price', headerName: 'price', width: 150, type: 'number' },
        {
            field: 'categoryId',
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
    const addProduct = () => {
        navigate('/admin/products/add')

    }
    const deleteProduct = () => {

    }
    const editProduct = () => {

    }
    React.useEffect(() => {
        callInstance.get('products')
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));

    }, [])
    return (
        <>
            <NavbarAdmin />
            {/*<Box sx={{ flexGrow: 1 }}>
                <Grid container className="myGrid">
                    <Grid item lg={7} sm={12}>
                        <DataGrid
                            autoHeight
                            rows={products}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={(rows) => setSelectedProducts(rows)}
                        />
                    </Grid>
                </Grid>
                <Grid container className='btns-wrapper' justifyContent="space-evenly">
                    <Grid item lg={3} sm={6}>
                        <Button variant="contained"
                            color="success"
                            startIcon={<AddIcon />}
                            onClick={addProduct}
                        >
                            add product
                        </Button>
                    </Grid>
                    <Grid item lg={3} sm={6}>
                        <Button variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            disabled={selectedProducts.length !== 1}
                            onClick={deleteProduct}>
                            delete selected
                        </Button>
                    </Grid>
                    <Grid item lg={3} sm={6}>
                        <Button variant="contained"
                            color="success"
                            startIcon={<AssignmentTurnedInIcon />}
                            disabled={selectedProducts.length !== 1}
                            onClick={editProduct}
                        >
                            Edit selected
                        </Button>
                    </Grid>


                </Grid>
    </Box>*/}
    <AdminDataGrid rows={products} columns={columns} page={"products"} />
        </>
    )
}
//export default ProductsAdminPage;