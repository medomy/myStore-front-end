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

interface props {

}

export const HomeAdminPage : React.FC<props>= ()=>{
    const [users,setUsers] = React.useState<User[]>([]);
    const [categories,setCategories] = React.useState<Category[]>([]);
    const [products,setProducts] = React.useState<Product[]>([]);
    const [orders,setOrders] = React.useState<Order[]>([]);
    const [approvedOrders,setApprovedOrders] = React.useState<Order[]>([]);
    const callAll = async()=>{
        const _users  = await getAllUsers();
        setUsers(_users);
        const _categories = await getAllCategories();
        setCategories(_categories);
        const _products = await getAllProducts();
        setProducts(_products);
        const _orders = await getAllOrders();
        setOrders(_orders);
        const _approvedOrders = _orders.filter((order : Order)=>{
            order.status === Status.approved;
        })
        setApprovedOrders(_approvedOrders);
    }

    React.useEffect(()=>{
        callAll();
    },[])
    return(
        <>
        <NavbarAdmin />
        <p> home Admin</p>
        </>
    )
} 
  //HomeAdminPage;