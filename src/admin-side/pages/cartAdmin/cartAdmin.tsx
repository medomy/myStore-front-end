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
    const [products, setProducts] = React.useState<Product[]>([{
        title : "title",
        categoryid : 1,
        photosrc : "",
        price : 0,
        description : "",
        company : ""
    }]);
    const id = useParams().id;

    const callAllApi = async () => {
        try {
            const currentUser = await getOneUser((Number(id)));
            setUser(currentUser);
            const items = await getuserCart(Number(id));
            setCart(items);
            let cartProducts: any[] = [];
            await items.forEach(async (item: CartItem, index: number) => {
                const product = await getOneProduct(item.productid);
                cartProducts.push(product);
                setProducts(cartProducts);
                //console.log("cartProducts", cartProducts[0]);
            });
        } catch (err) {
            console.log(err);
        }

    }

    React.useEffect(() => {
        callAllApi();
    }, [])
    //ctl + k +c or shift + alt + a 
    // console.log("cart", cart);
    // console.log("cart length", cart.length);
    // console.log("cart item", cart[0]);
    // console.log("products", products);
    // console.log("products length", products.length);
    // console.log("product", products[0]);
    return (
        <>
            <NavbarAdmin />
            <Box sx={{ flexGrow: 1 }}>
                <h2>Cart for user {user?.username}</h2>
                <Grid container className="myGrid">
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