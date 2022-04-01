import React from 'react';
import { NavbarAdmin } from '../../components/navbar/navbar';
import { Grid, Box, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import './cartAdmin.css'
import CartItem from '../../../models/cartItem';
import { getOneUser, getuserCart } from '../../services/apiCall/users';
import { useParams } from 'react-router-dom';
import User from '../../../models/user';
import Product from '../../../models/product';
import { getOneProduct } from '../../services/apiCall/products';
interface props {

}

export const CartAdminPage: React.FC<props> = () => {
    const [cart, setCart] = React.useState<CartItem[]>([]);
    const [user, setUser] = React.useState<User>();
    const [products, setProducts] = React.useState<Product[]>([]);
    const id = useParams().id;

    const callAllApi = async () => {
        const currentUser = await getOneUser((Number(id)));
        setUser(currentUser);
        const items = await getuserCart(Number(id));
        setCart(items);
        let cartProducts: Product[] = [];
        await items.forEach(async (item: CartItem) => {
            const product = await getOneProduct(item.productid);
            cartProducts.push(product);
        })
        setProducts(cartProducts);

    }
    React.useEffect(() => {
        callAllApi();
    }, [])
    return (
        <>
            <NavbarAdmin />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container className="myGrid">
                    <h2>Cart for user {user?.username}</h2>
                    <Grid item lg={9} sm={12} xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID </TableCell>
                                        <TableCell align="center">Product</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="center">product img</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.map((item, index) => (
                                        <TableRow
                                            key={item.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {item.id}
                                            </TableCell>
                                            <TableCell align="center">{products[index].title}</TableCell>
                                            <TableCell align="center">{item.quantity}</TableCell>
                                            <TableCell align="center"><img src={products[index].photosrc} alt='product photo' /></TableCell>
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
//export default CartAdminPage;