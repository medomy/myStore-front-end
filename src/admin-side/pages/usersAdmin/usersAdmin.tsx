import React from 'react';
import User from '../../../models/user';
import { Grid, Box, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { NavbarAdmin } from '../../components/navbar/navbar';
import { getAllUsers } from '../../services/apiCall/users';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FaceIcon from '@mui/icons-material/Face';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import './usersAdmin.css';
interface props {

}

export const UsersAdminPage: React.FC<props> = () => {
    const [users, setUsers] = React.useState<User[]>([]);
    React.useEffect(() => {
        getAllUsers()
            .then((us) => setUsers(us))
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <NavbarAdmin />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container className="myGrid">
                    <Grid item lg={9} sm={12} xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Grid4x4Icon></Grid4x4Icon>ID </TableCell>
                                        <TableCell align="center"><AccountCircleIcon></AccountCircleIcon>user name</TableCell>
                                        <TableCell align="center"><BadgeIcon></BadgeIcon>First name</TableCell>
                                        <TableCell align="center"><BadgeIcon></BadgeIcon>Last name</TableCell>
                                        <TableCell align="center"><AlternateEmailIcon></AlternateEmailIcon>Email</TableCell>
                                        <TableCell align="center"><FaceIcon></FaceIcon>Avatar</TableCell>
                                        <TableCell align="center"><ShoppingCartIcon></ShoppingCartIcon>Cart</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {user.id}
                                            </TableCell>
                                            <TableCell align="center">{user.username}</TableCell>
                                            <TableCell align="center">{user.first_name}</TableCell>
                                            <TableCell align="center">{user.last_name}</TableCell>
                                            <TableCell align="center">{user.email}</TableCell>
                                            <TableCell align="center"><img src={user.photourl} alt="user photo"/></TableCell>
                                            <TableCell align="center"><Link to={`/admin/users/cart/${user.id}`}>user's Cart</Link></TableCell>
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
//export default UsersAdminPage;