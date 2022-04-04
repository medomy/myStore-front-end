import React from 'react';
import Category from '../../../models/category';
import { Status } from '../../../models/enums/status';
import { Order } from '../../../models/order';
import Product from '../../../models/product';
import User from '../../../models/user';
import { NavbarAdmin } from '../../components/navbar/navbar';
import { getAllCategories } from '../../services/apiCall/categories';
import { getAllOrders } from '../../services/apiCall/orders';
import { getAllProducts } from '../../services/apiCall/products';
import { getAllUsers } from '../../services/apiCall/users';
import { Grid, Box, Paper } from '@mui/material';
import './adminHome.css';
import { Link } from 'react-router-dom';
interface props {

}

export const HomeAdminPage: React.FC<props> = () => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [products, setProducts] = React.useState<Product[]>([]);
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [approvedOrders, setApprovedOrders] = React.useState<Order[]>([]);
    const callAll = async () => {
        const _users = await getAllUsers();
        setUsers(_users);
        const _categories = await getAllCategories();
        setCategories(_categories);
        const _products = await getAllProducts();
        setProducts(_products);
        const _orders = await getAllOrders();
        setOrders(_orders);
        const _approvedOrders = _orders.filter((order: Order) => {
            return order.status === Status.approved;
        })
        setApprovedOrders(_approvedOrders);
    }

    React.useEffect(() => {
        callAll();
    }, [])
    return (
        <>
            <NavbarAdmin />
            <Grid container marginY={5} justifyContent="center">
                <Grid item lg={3} md={6} sm={6} xs={12} className='trans-grid' marginX={6} marginY={4}>
                    <Link to={"/admin/users"}>
                        <div className='info'>
                            <h4>No. Users</h4>
                            <h5>{users.length ? users.length : 0}
                                <p>user(s)</p></h5>
                        </div>
                    </Link>
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={12} className='trans-grid' marginX={6} marginY={4}>
                    <Link to={"/admin/categories"}>
                        <div className='info'>
                            <h4>No. Categories</h4>
                            <h5>{categories.length ? categories.length : 0}
                                <p>category(ies)</p></h5>
                        </div>
                    </Link>
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={12} className='trans-grid' marginX={6} marginY={4}>
                    <Link to={"/admin/products"}>
                        <div className='info'>
                            <h4>No. Products</h4>
                            <h5>{products.length ? products.length : 0}
                                <p>product(s)</p></h5>
                        </div>
                    </Link>
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={12} className='trans-grid' marginX={6} marginY={4}>
                    <Link to={"/admin/orders"}>
                        <div className='info'>
                            <h4>No. Orders</h4>
                            <h5>{orders.length ? orders.length : 0}
                                <p>order(s)</p></h5>
                        </div>
                    </Link>
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={12} className='trans-grid' marginX={6} marginY={4}>
                    <Link to={"/admin/orders"}>
                        <div className='info'>
                            <h4>No. Approved orders</h4>
                            <h5>{approvedOrders.length ? approvedOrders.length : 0}
                                <p>Approved Order(s)</p></h5>
                        </div>
                    </Link>
                </Grid>
            </Grid>
        </>
    )
} 
