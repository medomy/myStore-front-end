import React from 'react';
import { Order, productsQuantities } from '../../../models/order';
import {
    Grid, Box, Table, TableBody, TableContainer,
    TableCell, TableHead, TableRow, Paper
    , Button, Backdrop, Modal, Typography, Fade
} from '@mui/material';
import { Status } from '../../../models/enums/status';
import { NavbarAdmin } from '../../components/navbar/navbar';
import { editOrder, getAllOrders } from '../../services/apiCall/orders';
import './ordersAdmin.css'
interface props {

}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const OrdersAdminPage: React.FC<props> = () => {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [productsIdsqtys, setProductsIdsqtys] = React.useState<productsQuantities[]>([]);
    // for modal
    const [open, setOpen] = React.useState<boolean>(false);
    // openning a modal
    const openModal = (i: number) => {
        showOrder(i);
        setOpen(true);
    }
    // closing modal
    const closeModal = () => {
        setOpen(false);
    }
    // changing order status
    const orderStatusApprove = async (id: number | string) => {
        const approvedOrderStatus = await editOrder(id, {
            status: Status.approved
        })
        console.log(approvedOrderStatus);
    }
    const orderStatusReject = async (id: number | string) => {
        const rejectedOrderStatus = await editOrder(id, {
            status: Status.rejected
        })
        console.log(rejectedOrderStatus);
    }
    const didmount = React.useRef<boolean>(false);
    const didmount2 = React.useRef<boolean>(false);
    const callAPI = async () => {
        const usersOrders = await getAllOrders();
        setOrders(usersOrders);
    }
    React.useEffect(() => {
        callAPI();
    }, []);
    const showOrder = (i: number) => {
        setProductsIdsqtys(orders[i].products_ids_qtys);
    }
    React.useEffect(() => {
        if (didmount.current) {
            console.log(orders);
            console.log(orders[0]);
        }
        else {
            didmount.current = true
        }
    }, [orders])
    React.useEffect(()=>{
        if (didmount2.current) {
            console.log(productsIdsqtys);
        }
        else {
            didmount2.current = true
        }
    },[productsIdsqtys])
    return (
        <>
            <NavbarAdmin />
            <Box sx={{ flexGrow: 1 }}>
                <h2>Orders</h2>
                <Grid container className="myGrid">
                    <Grid item lg={9} sm={12} xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID </TableCell>
                                        <TableCell align="center">User Id</TableCell>
                                        <TableCell align="center">Address</TableCell>
                                        <TableCell align="center">order details</TableCell>
                                        <TableCell align="center">order status</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {orders.map((order, index) => (
                                        <TableRow
                                            key={order.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {order.id}
                                            </TableCell>
                                            <TableCell align="center">{order.userid}</TableCell>
                                            <TableCell align="center">{order.address}</TableCell>
                                            <TableCell align="center">
                                                <Button onClick={() => openModal(index)}>Order details</Button>
                                                <Modal
                                                    aria-labelledby="transition-modal-title"
                                                    aria-describedby="transition-modal-description"
                                                    open={open}
                                                    onClose={closeModal}
                                                    closeAfterTransition
                                                    BackdropComponent={Backdrop}
                                                    BackdropProps={{
                                                        timeout: 500,
                                                    }}
                                                    
                                                >
                                                    <Fade in={open}>
                                                        <Box sx={style}>
                                                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                                                order details
                                                            </Typography>
                                                            <div id="transition-modal-description"  >
                                                                <TableContainer>
                                                                    <Table aria-label="simple table">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell>product id </TableCell>
                                                                                <TableCell align="center">quantity</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {productsIdsqtys.map((item, index) => (
                                                                                <TableRow key={item.productId}
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                                    <TableCell>{item.productId}</TableCell>
                                                                                    <TableCell>{item.qty}</TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                                <Grid container justifyContent="center">
                                                                    <Grid item lg={3} sm={5} xs={5}>
                                                                        <Button variant="contained" color="success" onClick={()=>orderStatusApprove(Number(order.id))}>
                                                                            Approve
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item lg={3} sm={5} xs={5}>
                                                                        <Button variant="contained" color="error" onClick={()=> orderStatusReject(Number(order.id))}>
                                                                            Reject
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </Box>
                                                    </Fade>
                                                </Modal>
                                            </TableCell>
                                            <TableCell align="center">{order.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>

                </Grid>
            </Box>
        </>
    )
}
//export default OrdersAdminPage;