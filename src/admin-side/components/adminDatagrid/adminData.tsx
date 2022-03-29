import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import './adminData.css';
import { deleteCategory } from "../../services/apiCall/categories";
interface props {
    rows: any[],
    columns: GridColDef[],
    page: string

}

const AdminDataGrid: React.FC<props> = ({ rows, columns, page }) => {
    const [selectedIds , setSelectedIds] = React.useState<Array<number | string>>([]);
    const navigate = useNavigate()
    const add = ()=>{
        navigate(`/admin/${page}/add`);

    }

    const remove =async ()=>{
        if(page === "categories"){
            const deletedCategory = await deleteCategory(selectedIds[0]);
            console.log(deletedCategory);
        }

    }

    const edit = ()=>{
        navigate(`/admin/${page}/edit/${selectedIds[0]}`)
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container className="myGrid">
                    <Grid item lg={7} sm={12} xs={12}>
                        <DataGrid
                            autoHeight
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={(row) => setSelectedIds(row)}
                        />
                    </Grid>
                </Grid>
                <Grid container className='btns-wrapper' justifyContent="center" alignContent="center">
                    <Grid item lg={3} sm={6} xs={12} marginY={2} textAlign="center">
                        <Button variant="contained"
                            color="success"
                            startIcon={<AddIcon />}
                            onClick={add}
                        >
                            add item
                        </Button>
                    </Grid>
                    <Grid item lg={3} sm={6} xs={12} marginY={2} textAlign="center">
                        <Button variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            disabled={selectedIds.length !== 1}
                            onClick={remove}>
                            delete selected
                        </Button>
                    </Grid>
                    <Grid item lg={3} sm={6} xs={12} marginY={2} textAlign="center">
                        <Button variant="contained"
                            color="success"
                            startIcon={<AssignmentTurnedInIcon />}
                            disabled={selectedIds.length !== 1}
                            onClick={edit}
                        >
                            Edit selected
                        </Button>
                    </Grid>


                </Grid>
            </Box>
        </>
    )
}
export default AdminDataGrid;